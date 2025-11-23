import { Router, Response } from 'express'
import { supabase } from '../index.js'
import { authenticateToken, AuthRequest } from '../middleware/auth.js'
import { v4 as uuidv4 } from 'uuid'

const router = Router()

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body

    if (!email || !password || !name) {
      res.status(400).json({ error: 'Email, password, and name are required' })
      return
    }

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    })

    if (authError) {
      res.status(400).json({ error: authError.message })
      return
    }

    if (!authData.user) {
      res.status(400).json({ error: 'Failed to create user' })
      return
    }

    // Create user record in database
    const { error: dbError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email,
        name,
        username: email.split('@')[0],
        token_balance: 0,
        selected_template: 'minimal',
        is_admin: false,
        created_at: new Date().toISOString(),
      })

    if (dbError) {
      res.status(500).json({ error: 'Failed to create user record' })
      return
    }

    res.status(201).json({
      message: 'User registered successfully. Please check your email for verification.',
      user: {
        id: authData.user.id,
        email: authData.user.email,
      },
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' })
      return
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      res.status(401).json({ error: error.message })
      return
    }

    if (!data.session) {
      res.status(401).json({ error: 'Failed to create session' })
      return
    }

    // Get user details
    const { data: userData } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single()

    res.json({
      session: {
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
        expires_in: data.session.expires_in,
        token_type: 'Bearer',
      },
      user: {
        id: data.user.id,
        email: data.user.email,
        name: userData?.name,
        username: userData?.username,
        avatar_url: userData?.avatar_url,
        token_balance: userData?.token_balance || 0,
      },
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// POST /api/auth/logout
router.post('/logout', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    if (token) {
      await supabase.auth.signOut()
    }

    res.json({ message: 'Logged out successfully' })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// GET /api/auth/me
router.get('/me', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    const { data: userData, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', req.user.id)
      .single()

    if (error || !userData) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    res.json({
      id: userData.id,
      email: userData.email,
      name: userData.name,
      username: userData.username,
      avatar_url: userData.avatar_url,
      github_username: userData.github_username,
      token_balance: userData.token_balance,
      selected_template: userData.selected_template,
      created_at: userData.created_at,
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

export default router
