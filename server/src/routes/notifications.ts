import { Router, Response } from 'express'
import { supabase } from '../index.js'
import { authenticateToken, AuthRequest } from '../middleware/auth.js'
import { v4 as uuidv4 } from 'uuid'

const router = Router()

// GET /api/notifications - Get user's notifications
router.get('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    const limit = parseInt(req.query.limit as string) || 20
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      res.status(500).json({ error: error.message })
      return
    }

    res.json(data || [])
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// PATCH /api/notifications/:id/read - Mark notification as read
router.patch('/:id/read', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    const { id } = req.params

    const { data, error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', id)
      .eq('user_id', req.user.id)
      .select()
      .single()

    if (error || !data) {
      res.status(404).json({ error: 'Notification not found' })
      return
    }

    res.json(data)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// PATCH /api/notifications/mark-read - Mark multiple notifications as read
router.patch('/mark-read-all', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    const { ids } = req.body

    if (!ids || !Array.isArray(ids)) {
      res.status(400).json({ error: 'ids array is required' })
      return
    }

    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .in('id', ids)
      .eq('user_id', req.user.id)

    if (error) {
      res.status(500).json({ error: error.message })
      return
    }

    res.json({ message: 'Notifications marked as read' })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// DELETE /api/notifications/:id - Delete notification
router.delete('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    const { id } = req.params

    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', id)
      .eq('user_id', req.user.id)

    if (error) {
      res.status(500).json({ error: error.message })
      return
    }

    res.json({ message: 'Notification deleted' })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

export default router
