import { Router, Response } from 'express'
import { supabase } from '../index.js'
import { authenticateToken, AuthRequest } from '../middleware/auth.js'
import { v4 as uuidv4 } from 'uuid'

const router = Router()

// POST /api/submissions - Submit a project
router.post('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    const { repo_url, description } = req.body

    if (!repo_url) {
      res.status(400).json({ error: 'Repository URL is required' })
      return
    }

    // Parse GitHub URL
    const match = repo_url.match(/github\.com\/([^/]+)\/([^/]+)/)
    if (!match) {
      res.status(400).json({ error: 'Invalid GitHub repository URL' })
      return
    }

    const [, owner, repo] = match
    const repoName = repo.replace('.git', '')

    // Check weekly submission limit
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    const { data: recentSubmissions } = await supabase
      .from('submissions')
      .select('id')
      .eq('user_id', req.user.id)
      .gte('submitted_at', sevenDaysAgo)

    if ((recentSubmissions || []).length >= 1) {
      res.status(400).json({ error: 'You can only submit one project per week' })
      return
    }

    // Create submission
    const submissionId = uuidv4()
    const { data, error } = await supabase
      .from('submissions')
      .insert({
        id: submissionId,
        user_id: req.user.id,
        repo_url,
        repo_name: repoName,
        description: description || '',
        status: 'pending',
        tokens_awarded: 0,
        submitted_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      res.status(500).json({ error: error.message })
      return
    }

    // Create notification
    await supabase.from('notifications').insert({
      id: uuidv4(),
      user_id: req.user.id,
      message: `Your submission "${repoName}" is pending review`,
      type: 'submission',
      created_at: new Date().toISOString(),
      read: false,
    })

    res.status(201).json({
      id: data.id,
      repo_url: data.repo_url,
      repo_name: data.repo_name,
      status: data.status,
      submitted_at: data.submitted_at,
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// GET /api/submissions/me - Get user's submissions
router.get('/me', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    const { data, error } = await supabase
      .from('submissions')
      .select('*')
      .eq('user_id', req.user.id)
      .order('submitted_at', { ascending: false })

    if (error) {
      res.status(500).json({ error: error.message })
      return
    }

    res.json(data || [])
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// GET /api/submissions/:id - Get submission details
router.get('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params

    const { data, error } = await supabase
      .from('submissions')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      res.status(404).json({ error: 'Submission not found' })
      return
    }

    // Check if user owns this submission or is admin
    if (data.user_id !== req.user?.id) {
      const { data: userData } = await supabase
        .from('users')
        .select('is_admin')
        .eq('id', req.user?.id)
        .single()

      if (!userData?.is_admin) {
        res.status(403).json({ error: 'Forbidden' })
        return
      }
    }

    res.json(data)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

export default router
