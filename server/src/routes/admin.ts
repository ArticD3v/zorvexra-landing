import { Router, Response } from 'express'
import { supabase } from '../index.js'
import { authenticateToken, requireAdmin, AuthRequest } from '../middleware/auth.js'
import { v4 as uuidv4 } from 'uuid'

const router = Router()

// GET /api/admin/submissions - Get all submissions for review
router.get('/submissions', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const status = req.query.status as string
    let query = supabase.from('submissions').select('*, users:user_id(name, email, username)')

    if (status) {
      query = query.eq('status', status)
    }

    const { data, error } = await query.order('submitted_at', { ascending: false })

    if (error) {
      res.status(500).json({ error: error.message })
      return
    }

    const submissions = (data || []).map((sub: any) => ({
      id: sub.id,
      user_id: sub.user_id,
      user: sub.users,
      repo_name: sub.repo_name,
      repo_url: sub.repo_url,
      description: sub.description,
      status: sub.status,
      submitted_at: sub.submitted_at,
      approved_at: sub.approved_at,
    }))

    res.json(submissions)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// GET /api/admin/submissions/:id - Get submission details for review
router.get('/submissions/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params

    const { data, error } = await supabase
      .from('submissions')
      .select('*, users:user_id(*)')
      .eq('id', id)
      .single()

    if (error || !data) {
      res.status(404).json({ error: 'Submission not found' })
      return
    }

    res.json({
      id: data.id,
      user_id: data.user_id,
      user: data.users,
      repo_name: data.repo_name,
      repo_url: data.repo_url,
      description: data.description,
      status: data.status,
      submitted_at: data.submitted_at,
      approved_at: data.approved_at,
      tokens_awarded: data.tokens_awarded,
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// PATCH /api/admin/submissions/:id/status - Update submission status and award tokens
router.patch('/submissions/:id/status', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const { status, tokens_awarded } = req.body

    if (!status || !['approved', 'rejected', 'pending'].includes(status)) {
      res.status(400).json({ error: 'Invalid status. Must be approved, rejected, or pending' })
      return
    }

    // Get submission
    const { data: submission } = await supabase
      .from('submissions')
      .select('*')
      .eq('id', id)
      .single()

    if (!submission) {
      res.status(404).json({ error: 'Submission not found' })
      return
    }

    // Calculate tokens to award
    let tokensToAward = tokens_awarded || 0
    if (status === 'approved' && tokensToAward === 0) {
      // Default token award based on timing
      const submittedDate = new Date(submission.submitted_at)
      const reviewDate = new Date()
      const daysDiff = Math.floor((reviewDate.getTime() - submittedDate.getTime()) / (1000 * 60 * 60 * 24))

      // Approved within 7 days = +1 token, later = +0.5 token
      tokensToAward = daysDiff <= 7 ? 1 : 0.5
    }

    // Update submission
    const updateData: any = {
      status,
      tokens_awarded: tokensToAward,
    }

    if (status === 'approved') {
      updateData.approved_at = new Date().toISOString()
    }

    const { data: updated, error: updateError } = await supabase
      .from('submissions')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (updateError) {
      res.status(500).json({ error: updateError.message })
      return
    }

    // If approved, update user's token balance
    if (status === 'approved' && tokensToAward > 0) {
      const { data: userData } = await supabase
        .from('users')
        .select('token_balance')
        .eq('id', submission.user_id)
        .single()

      const newBalance = (userData?.token_balance || 0) + tokensToAward

      await supabase
        .from('users')
        .update({ token_balance: newBalance })
        .eq('id', submission.user_id)

      // Record token transaction
      await supabase.from('token_history').insert({
        id: uuidv4(),
        user_id: submission.user_id,
        amount: tokensToAward,
        action_type: 'approval',
        related_id: id,
        created_at: new Date().toISOString(),
      })
    }

    // Create notification for user
    const notificationMessages: Record<string, string> = {
      approved: `Your project "${submission.repo_name}" was approved! You earned ${tokensToAward} ZorBits.`,
      rejected: `Your project "${submission.repo_name}" was rejected. Please review the feedback and try again.`,
      pending: `Your project "${submission.repo_name}" is under review.`,
    }

    await supabase.from('notifications').insert({
      id: uuidv4(),
      user_id: submission.user_id,
      message: notificationMessages[status],
      type: 'submission',
      created_at: new Date().toISOString(),
      read: false,
    })

    res.json({
      message: `Submission ${status}`,
      submission: updated,
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

export default router
