import { supabase } from './supabaseClient'

const API_BASE = '/api'

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT'
  body?: any
  requiresAuth?: boolean
}

export async function apiCall(endpoint: string, options: ApiOptions = {}) {
  const { method = 'GET', body, requiresAuth = true } = options

  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    // Add auth token if required
    if (requiresAuth) {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.access_token) {
        throw new Error('No authentication token found')
      }
      headers['Authorization'] = `Bearer ${session.access_token}`
    }

    const response = await fetch(`${API_BASE}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'API request failed')
    }

    return await response.json()
  } catch (error) {
    console.error(`API Error [${method} ${endpoint}]:`, error)
    throw error
  }
}

// Auth endpoints
export const authAPI = {
  register: (email: string, password: string, name: string) =>
    apiCall('/auth/register', {
      method: 'POST',
      body: { email, password, name },
      requiresAuth: false,
    }),

  login: (email: string, password: string) =>
    apiCall('/auth/login', {
      method: 'POST',
      body: { email, password },
      requiresAuth: false,
    }),

  logout: () =>
    apiCall('/auth/logout', { method: 'POST' }),

  getMe: () =>
    apiCall('/auth/me', { method: 'GET' }),
}

// Submissions endpoints
export const submissionsAPI = {
  create: (repo_url: string, description: string) =>
    apiCall('/submissions', {
      method: 'POST',
      body: { repo_url, description },
    }),

  getMySubmissions: () =>
    apiCall('/submissions/me', { method: 'GET' }),

  getSubmission: (id: string) =>
    apiCall(`/submissions/${id}`, { method: 'GET' }),
}

// Portfolio endpoints
export const portfolioAPI = {
  getProjects: () =>
    apiCall('/portfolio/projects', { method: 'GET' }),

  updateVisibility: (submission_id: string, visible: boolean) =>
    apiCall('/portfolio/visibility', {
      method: 'PATCH',
      body: { submission_id, visible },
    }),

  updateTemplate: (template_id: string) =>
    apiCall('/portfolio/template', {
      method: 'PATCH',
      body: { template_id },
    }),

  getPublicPortfolio: (username: string, template?: string) =>
    apiCall(`/portfolio/public/${username}?template=${template || 'minimal'}`, {
      method: 'GET',
      requiresAuth: false,
    }),
}

// Showcase endpoints
export const showcaseAPI = {
  getAll: () =>
    apiCall('/showcase', { method: 'GET', requiresAuth: false }),

  buy: (submission_id: string, tokens_spent: number) =>
    apiCall('/showcase/buy', {
      method: 'POST',
      body: { submission_id, tokens_spent },
    }),

  getMyPurchases: () =>
    apiCall('/showcase/purchases/me', { method: 'GET' }),
}

// Dashboard endpoints
export const dashboardAPI = {
  getOverview: () =>
    apiCall('/dashboard/overview', { method: 'GET' }),
}

// Settings endpoints
export const settingsAPI = {
  getSettings: () =>
    apiCall('/settings', { method: 'GET' }),

  updateProfile: (name?: string, github_username?: string, avatar_url?: string) =>
    apiCall('/settings/profile', {
      method: 'PATCH',
      body: {
        ...(name !== undefined && { name }),
        ...(github_username !== undefined && { github_username }),
        ...(avatar_url !== undefined && { avatar_url }),
      },
    }),

  updatePassword: (current_password: string, new_password: string) =>
    apiCall('/settings/password', {
      method: 'PATCH',
      body: { current_password, new_password },
    }),

  updateAvatar: (avatar_url: string) =>
    apiCall('/settings/avatar', {
      method: 'PATCH',
      body: { avatar_url },
    }),

  updateNotifications: (email_notifications?: boolean, project_notifications?: boolean) =>
    apiCall('/settings/notifications', {
      method: 'PATCH',
      body: {
        ...(email_notifications !== undefined && { email_notifications }),
        ...(project_notifications !== undefined && { project_notifications }),
      },
    }),

  deleteAccount: () =>
    apiCall('/settings/account', { method: 'DELETE' }),
}

// Notifications endpoints
export const notificationsAPI = {
  getNotifications: (limit = 20) =>
    apiCall(`/notifications?limit=${limit}`, { method: 'GET' }),

  markAsRead: (id: string) =>
    apiCall(`/notifications/${id}/read`, { method: 'PATCH' }),

  markMultipleAsRead: (ids: string[]) =>
    apiCall('/notifications/mark-read-all', {
      method: 'PATCH',
      body: { ids },
    }),

  deleteNotification: (id: string) =>
    apiCall(`/notifications/${id}`, { method: 'DELETE' }),
}

// Tokens endpoints
export const tokensAPI = {
  getBalance: () =>
    apiCall('/tokens/balance', { method: 'GET' }),

  getHistory: (limit = 50) =>
    apiCall(`/tokens/history?limit=${limit}`, { method: 'GET' }),
}

// Admin endpoints
export const adminAPI = {
  getSubmissions: (status?: string) =>
    apiCall(`/admin/submissions${status ? `?status=${status}` : ''}`, { method: 'GET' }),

  getSubmission: (id: string) =>
    apiCall(`/admin/submissions/${id}`, { method: 'GET' }),

  updateSubmissionStatus: (id: string, status: 'approved' | 'rejected' | 'pending', tokens_awarded?: number) =>
    apiCall(`/admin/submissions/${id}/status`, {
      method: 'PATCH',
      body: { status, ...(tokens_awarded !== undefined && { tokens_awarded }) },
    }),
}
