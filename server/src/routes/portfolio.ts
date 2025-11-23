import { Router, Response } from 'express'
import { supabase } from '../index.js'
import { authenticateToken, AuthRequest, optionalAuth } from '../middleware/auth.js'
import { v4 as uuidv4 } from 'uuid'

const router = Router()

// GET /api/portfolio/projects - Get user's projects for portfolio
router.get('/projects', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    // Get approved submissions (projects)
    const { data: submissions, error: submissionsError } = await supabase
      .from('submissions')
      .select('*')
      .eq('user_id', req.user.id)
      .eq('status', 'approved')

    if (submissionsError) {
      res.status(500).json({ error: submissionsError.message })
      return
    }

    // Get visibility settings
    const { data: visibility } = await supabase
      .from('portfolio_visibility')
      .select('*')
      .eq('user_id', req.user.id)

    const visibilityMap = new Map(
      (visibility || []).map((v: any) => [v.submission_id, v.visible])
    )

    const projects = (submissions || []).map((sub: any) => ({
      id: sub.id,
      name: sub.repo_name,
      description: sub.description,
      repo_url: sub.repo_url,
      tokens_awarded: sub.tokens_awarded,
      visible: visibilityMap.get(sub.id) ?? true,
      approved_at: sub.approved_at,
    }))

    res.json(projects)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// PATCH /api/portfolio/visibility - Update project visibility
router.patch('/visibility', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    const { submission_id, visible } = req.body

    if (!submission_id || visible === undefined) {
      res.status(400).json({ error: 'submission_id and visible are required' })
      return
    }

    // Check if submission belongs to user
    const { data: submission } = await supabase
      .from('submissions')
      .select('id')
      .eq('id', submission_id)
      .eq('user_id', req.user.id)
      .single()

    if (!submission) {
      res.status(403).json({ error: 'Submission not found or does not belong to you' })
      return
    }

    // Upsert visibility
    const { data, error } = await supabase
      .from('portfolio_visibility')
      .upsert({
        id: uuidv4(),
        user_id: req.user.id,
        submission_id,
        visible,
      }, {
        onConflict: 'user_id,submission_id'
      })
      .select()
      .single()

    if (error) {
      res.status(500).json({ error: error.message })
      return
    }

    res.json(data)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// PATCH /api/portfolio/template - Update selected template
router.patch('/template', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    const { template_id } = req.body

    if (!template_id) {
      res.status(400).json({ error: 'template_id is required' })
      return
    }

    const { data, error } = await supabase
      .from('users')
      .update({ selected_template: template_id })
      .eq('id', req.user.id)
      .select()
      .single()

    if (error) {
      res.status(500).json({ error: error.message })
      return
    }

    res.json({ selected_template: data.selected_template })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// GET /api/portfolio/public/:username - Get public portfolio
router.get('/public/:username', optionalAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { username } = req.params
    const template = (req.query.template as string) || 'minimal'

    // Get user
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single()

    if (userError || !user) {
      res.status(404).json({ error: 'Portfolio not found' })
      return
    }

    // Get approved projects
    const { data: submissions } = await supabase
      .from('submissions')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'approved')

    // Get visibility settings
    const { data: visibility } = await supabase
      .from('portfolio_visibility')
      .select('*')
      .eq('user_id', user.id)

    const visibilityMap = new Map(
      (visibility || []).map((v: any) => [v.submission_id, v.visible])
    )

    const visibleProjects = (submissions || [])
      .filter((sub: any) => visibilityMap.get(sub.id) !== false)
      .map((sub: any) => ({
        id: sub.id,
        name: sub.repo_name,
        description: sub.description,
        repo_url: sub.repo_url,
        tokens_awarded: sub.tokens_awarded,
      }))

    // Get template config
    const { data: templateData } = await supabase
      .from('portfolio_templates')
      .select('*')
      .eq('template_key', template)
      .single()

    res.json({
      user: {
        username: user.username,
        name: user.name,
        avatar_url: user.avatar_url,
      },
      projects: visibleProjects,
      template: templateData || {
        id: template,
        name: template.charAt(0).toUpperCase() + template.slice(1),
        config: { layout: template },
      },
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

export default router
