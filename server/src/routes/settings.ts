import { Router, Response } from 'express'
import { supabase } from '../index.js'
import { authenticateToken, AuthRequest } from '../middleware/auth.js'
import bcrypt from 'bcryptjs'

const router = Router()

// GET /api/settings - Get user settings
router.get('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', req.user.id)
      .single()

    if (error || !data) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    res.json({
      id: data.id,
      username: data.username,
      name: data.name,
      email: data.email,
      avatar_url: data.avatar_url,
      github_username: data.github_username,
      email_notifications: data.email_notifications !== false,
      project_notifications: data.project_notifications !== false,
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// PATCH /api/settings/profile - Update profile information
router.patch('/profile', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    const { name, github_username, avatar_url } = req.body

    const updateData: any = {}
    if (name !== undefined) updateData.name = name
    if (github_username !== undefined) updateData.github_username = github_username
    if (avatar_url !== undefined) updateData.avatar_url = avatar_url

    if (Object.keys(updateData).length === 0) {
      res.status(400).json({ error: 'No fields to update' })
      return
    }

    const { data, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', req.user.id)
      .select()
      .single()

    if (error) {
      res.status(500).json({ error: error.message })
      return
    }

    res.json({
      message: 'Profile updated successfully',
      user: {
        name: data.name,
        github_username: data.github_username,
        avatar_url: data.avatar_url,
      },
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// PATCH /api/settings/password - Change password
router.patch('/password', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    const { current_password, new_password } = req.body

    if (!current_password || !new_password) {
      res.status(400).json({ error: 'Current and new password are required' })
      return
    }

    // Update password via Supabase Auth
    const { error } = await supabase.auth.updateUser({
      password: new_password,
    })

    if (error) {
      res.status(400).json({ error: error.message })
      return
    }

    res.json({ message: 'Password updated successfully' })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// PATCH /api/settings/avatar - Upload avatar
router.patch('/avatar', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    const { avatar_url } = req.body

    if (!avatar_url) {
      res.status(400).json({ error: 'avatar_url is required' })
      return
    }

    const { data, error } = await supabase
      .from('users')
      .update({ avatar_url })
      .eq('id', req.user.id)
      .select()
      .single()

    if (error) {
      res.status(500).json({ error: error.message })
      return
    }

    res.json({
      message: 'Avatar updated successfully',
      avatar_url: data.avatar_url,
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// PATCH /api/settings/notifications - Update notification preferences
router.patch('/notifications', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    const { email_notifications, project_notifications } = req.body

    const updateData: any = {}
    if (email_notifications !== undefined) updateData.email_notifications = email_notifications
    if (project_notifications !== undefined) updateData.project_notifications = project_notifications

    const { data, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', req.user.id)
      .select()
      .single()

    if (error) {
      res.status(500).json({ error: error.message })
      return
    }

    res.json({
      message: 'Notification preferences updated',
      preferences: {
        email_notifications: data.email_notifications,
        project_notifications: data.project_notifications,
      },
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// DELETE /api/settings/account - Delete account
router.delete('/account', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    // Delete user data
    await supabase.from('users').delete().eq('id', req.user.id)
    
    // Delete auth user
    await supabase.auth.admin.deleteUser(req.user.id)

    res.json({ message: 'Account deleted successfully' })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

export default router
