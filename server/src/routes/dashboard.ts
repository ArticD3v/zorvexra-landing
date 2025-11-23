import { Router, Response } from 'express'
import { supabase } from '../index.js'
import { authenticateToken, AuthRequest } from '../middleware/auth.js'

const router = Router()

// GET /api/dashboard/overview
router.get('/overview', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    // Get user's submissions stats
    const { data: submissions } = await supabase
      .from('submissions')
      .select('*')
      .eq('user_id', req.user.id)

    const totalApproved = (submissions || []).filter(s => s.status === 'approved').length
    const totalPending = (submissions || []).filter(s => s.status === 'pending').length
    const totalRejected = (submissions || []).filter(s => s.status === 'rejected').length
    const totalTokens = (submissions || [])
      .filter(s => s.status === 'approved')
      .reduce((sum, s) => sum + (s.tokens_awarded || 0), 0)

    // Get recent submissions
    const { data: recentSubmissions } = await supabase
      .from('submissions')
      .select('*')
      .eq('user_id', req.user.id)
      .order('submitted_at', { ascending: false })
      .limit(5)

    // Calculate weekly deadline
    const now = new Date()
    const dayOfWeek = now.getDay()
    const daysUntilSunday = (7 - dayOfWeek) % 7 || 7
    const nextDeadline = new Date(now)
    nextDeadline.setDate(nextDeadline.getDate() + daysUntilSunday)

    // Check weekly status
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    const weeklySubmission = (submissions || []).find(
      s => new Date(s.submitted_at) > new Date(sevenDaysAgo)
    )
    const weeklyStatus = weeklySubmission ? 'On track' : 'Not submitted'

    // Get recent notifications
    const { data: notifications } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false })
      .limit(3)

    // Get user info
    const { data: userData } = await supabase
      .from('users')
      .select('*')
      .eq('id', req.user.id)
      .single()

    res.json({
      stats: {
        total_approved_projects: totalApproved,
        pending_reviews: totalPending,
        rejected_submissions: totalRejected,
        total_zorbits_earned: totalTokens,
      },
      recent_submissions: (recentSubmissions || []).map(s => ({
        id: s.id,
        project_name: s.repo_name,
        submission_date: s.submitted_at,
        status: s.status,
        tokens_earned: s.status === 'approved' ? s.tokens_awarded : 0,
      })),
      weekly_deadline: {
        next_deadline: nextDeadline.toISOString().split('T')[0],
        current_status: weeklyStatus,
      },
      notifications: (notifications || []).map(n => ({
        id: n.id,
        message: n.message,
        type: n.type,
        created_at: n.created_at,
        read: n.read,
      })),
      user: {
        username: userData?.username,
        name: userData?.name,
      },
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

export default router
