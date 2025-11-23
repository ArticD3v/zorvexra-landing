import { Router, Response } from 'express'
import { supabase } from '../index.js'
import { authenticateToken, AuthRequest, optionalAuth } from '../middleware/auth.js'
import { v4 as uuidv4 } from 'uuid'

const router = Router()

// GET /api/showcase - Get all approved projects
router.get('/', optionalAuth, async (req: AuthRequest, res: Response) => {
  try {
    // Get all approved submissions with user info
    const { data: submissions, error: submissionsError } = await supabase
      .from('submissions')
      .select('*, users:user_id(username, name, avatar_url)')
      .eq('status', 'approved')
      .order('approved_at', { ascending: false })

    if (submissionsError) {
      res.status(500).json({ error: submissionsError.message })
      return
    }

    let userPurchases: any[] = []
    if (req.user?.id) {
      const { data: purchases } = await supabase
        .from('purchases')
        .select('submission_id')
        .eq('buyer_id', req.user.id)

      userPurchases = purchases || []
    }

    const purchaseIds = new Set(userPurchases.map((p: any) => p.submission_id))

    const projects = (submissions || []).map((sub: any) => ({
      id: sub.id,
      title: sub.repo_name,
      description: sub.description,
      contributor: sub.users?.name || sub.users?.username || 'Unknown',
      tags: sub.description ? sub.description.split(',').slice(0, 3) : [],
      tokens: Math.floor(Math.random() * 200) + 100, // Dynamic token pricing
      github_url: sub.repo_url,
      purchased: purchaseIds.has(sub.id),
      owned: sub.user_id === req.user?.id,
    }))

    res.json(projects)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// POST /api/showcase/buy - Purchase a project
router.post('/buy', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    const { submission_id, tokens_spent } = req.body

    if (!submission_id || !tokens_spent) {
      res.status(400).json({ error: 'submission_id and tokens_spent are required' })
      return
    }

    // Get user's current balance
    const { data: userData } = await supabase
      .from('users')
      .select('token_balance')
      .eq('id', req.user.id)
      .single()

    if (!userData || userData.token_balance < tokens_spent) {
      res.status(400).json({ error: 'Insufficient tokens' })
      return
    }

    // Check if already purchased
    const { data: existingPurchase } = await supabase
      .from('purchases')
      .select('id')
      .eq('buyer_id', req.user.id)
      .eq('submission_id', submission_id)
      .single()

    if (existingPurchase) {
      res.status(400).json({ error: 'You have already purchased this project' })
      return
    }

    // Start transaction simulation
    const purchaseId = uuidv4()

    // Create purchase record
    const { error: purchaseError } = await supabase
      .from('purchases')
      .insert({
        id: purchaseId,
        buyer_id: req.user.id,
        submission_id,
        tokens_spent,
        created_at: new Date().toISOString(),
      })

    if (purchaseError) {
      res.status(500).json({ error: purchaseError.message })
      return
    }

    // Deduct tokens from user
    const newBalance = userData.token_balance - tokens_spent
    const { error: balanceError } = await supabase
      .from('users')
      .update({ token_balance: newBalance })
      .eq('id', req.user.id)

    if (balanceError) {
      res.status(500).json({ error: balanceError.message })
      return
    }

    // Record token transaction
    await supabase.from('token_history').insert({
      id: uuidv4(),
      user_id: req.user.id,
      amount: -tokens_spent,
      action_type: 'purchase',
      related_id: submission_id,
      created_at: new Date().toISOString(),
    })

    // Notify project owner
    const { data: submission } = await supabase
      .from('submissions')
      .select('user_id')
      .eq('id', submission_id)
      .single()

    if (submission) {
      await supabase.from('notifications').insert({
        id: uuidv4(),
        user_id: submission.user_id,
        message: `Your project was purchased! You earned ${tokens_spent} tokens`,
        type: 'purchase',
        created_at: new Date().toISOString(),
        read: false,
      })
    }

    res.json({
      message: 'Purchase successful',
      purchase_id: purchaseId,
      new_balance: newBalance,
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// GET /api/showcase/purchases/me - Get user's purchases
router.get('/purchases/me', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    const { data, error } = await supabase
      .from('purchases')
      .select('*, submissions:submission_id(*)')
      .eq('buyer_id', req.user.id)
      .order('created_at', { ascending: false })

    if (error) {
      res.status(500).json({ error: error.message })
      return
    }

    const purchases = (data || []).map((purchase: any) => ({
      id: purchase.id,
      submission_id: purchase.submission_id,
      project_name: purchase.submissions?.repo_name,
      tokens_spent: purchase.tokens_spent,
      purchased_at: purchase.created_at,
    }))

    res.json(purchases)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

export default router
