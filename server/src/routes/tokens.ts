import { Router, Response } from 'express'
import { supabase } from '../index.js'
import { authenticateToken, AuthRequest } from '../middleware/auth.js'

const router = Router()

// GET /api/tokens/balance - Get user's token balance
router.get('/balance', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    const { data, error } = await supabase
      .from('users')
      .select('token_balance')
      .eq('id', req.user.id)
      .single()

    if (error || !data) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    res.json({
      balance: data.token_balance,
      currency: 'ZorBits',
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// GET /api/tokens/history - Get token transaction history
router.get('/history', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    const limit = parseInt(req.query.limit as string) || 50
    const { data, error } = await supabase
      .from('token_history')
      .select('*')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      res.status(500).json({ error: error.message })
      return
    }

    // Enrich with action descriptions
    const enrichedHistory = (data || []).map((record: any) => ({
      id: record.id,
      amount: record.amount,
      action_type: record.action_type,
      description: getActionDescription(record.action_type, record.amount),
      created_at: record.created_at,
      related_id: record.related_id,
    }))

    res.json(enrichedHistory)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Helper function to get action description
function getActionDescription(action: string, amount: number): string {
  const sign = amount >= 0 ? '+' : ''
  const actionMap: Record<string, string> = {
    approval: `Submission approved: ${sign}${amount} ZorBits`,
    purchase: `Project purchased: ${sign}${amount} ZorBits`,
    reject: `Submission rejected`,
    award: `Tokens awarded: ${sign}${amount} ZorBits`,
  }
  return actionMap[action] || `${action}: ${sign}${amount} ZorBits`
}

export default router
