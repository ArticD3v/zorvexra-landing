import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { supabase } from '../index.js'

export interface AuthRequest extends Request {
  user?: {
    id: string
    email: string
    user_metadata?: Record<string, any>
  }
}

export const authenticateToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
      throw new Error('No token provided')
    }

    // Verify with Supabase
    const { data, error } = await supabase.auth.getUser(token)

    if (error || !data.user) {
      throw new Error('Invalid token')
    }

    req.user = {
      id: data.user.id,
      email: data.user.email || '',
      user_metadata: data.user.user_metadata,
    }

    next()
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' })
  }
}

export const optionalAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    if (token) {
      const { data } = await supabase.auth.getUser(token)
      if (data.user) {
        req.user = {
          id: data.user.id,
          email: data.user.email || '',
          user_metadata: data.user.user_metadata,
        }
      }
    }
  } catch (error) {
    // Continue without user
  }

  next()
}

export const requireAdmin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    const { data: userData } = await supabase
      .from('users')
      .select('is_admin')
      .eq('id', req.user.id)
      .single()

    if (!userData || !userData.is_admin) {
      res.status(403).json({ error: 'Forbidden: Admin access required' })
      return
    }

    next()
  } catch (error) {
    res.status(403).json({ error: 'Forbidden' })
  }
}
