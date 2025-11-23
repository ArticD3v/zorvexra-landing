# Frontend API Integration Guide

This guide shows how to connect the frontend pages to the backend API.

## Overview

All API calls are handled through `src/lib/api.ts`. This file provides functions for all backend endpoints with automatic authentication header management.

## Example: Dashboard Overview

### Current Code (Static Data)
```typescript
// src/pages/Dashboard.tsx
const statCards = [
  { label: 'Total Approved Projects', value: '8', ... },
  { label: 'Pending Reviews', value: '3', ... },
  ...
]
```

### Integrated Code (Dynamic Data)
```typescript
import { dashboardAPI } from '@/lib/api'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dashboardAPI.getOverview()
      .then(data => {
        setStats(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Failed to load overview:', error)
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Loading...</div>
  if (!stats) return <div>Error loading data</div>

  const statCards = [
    { 
      label: 'Total Approved Projects', 
      value: stats.stats.total_approved_projects, 
      ... 
    },
    { 
      label: 'Pending Reviews', 
      value: stats.stats.pending_reviews, 
      ... 
    },
    ...
  ]
  
  // Rest of component...
}
```

## All Pages - Integration Examples

### 1. Dashboard Overview (`src/pages/Dashboard.tsx`)

```typescript
import { dashboardAPI } from '@/lib/api'
import { useEffect, useState } from 'react'

const [dashboardData, setDashboardData] = useState(null)

useEffect(() => {
  dashboardAPI.getOverview()
    .then(data => setDashboardData(data))
    .catch(error => console.error('Failed:', error))
}, [])
```

### 2. My Submissions (`src/pages/MySubmissions.tsx`)

```typescript
import { submissionsAPI } from '@/lib/api'

const [submissions, setSubmissions] = useState([])

useEffect(() => {
  submissionsAPI.getMySubmissions()
    .then(data => setSubmissions(data))
    .catch(error => console.error('Failed:', error))
}, [])
```

### 3. Submit Project (`src/pages/SubmitProject.tsx`)

```typescript
import { submissionsAPI } from '@/lib/api'

const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    const result = await submissionsAPI.create(
      githubUrl,
      description
    )
    navigate('/dashboard/submissions')
  } catch (error) {
    setError(error.message)
  }
}
```

### 4. Portfolio (`src/pages/Portfolio.tsx`)

```typescript
import { portfolioAPI } from '@/lib/api'

const [projects, setProjects] = useState([])

useEffect(() => {
  portfolioAPI.getProjects()
    .then(data => setProjects(data))
    .catch(error => console.error('Failed:', error))
}, [])

const handleToggleVisibility = async (id) => {
  try {
    await portfolioAPI.updateVisibility(
      id, 
      !projects.find(p => p.id === id).visible
    )
    // Refresh list
  } catch (error) {
    console.error('Failed:', error)
  }
}

const handleSelectTemplate = async (templateId) => {
  try {
    await portfolioAPI.updateTemplate(templateId)
    setSelectedTemplate(templateId)
  } catch (error) {
    console.error('Failed:', error)
  }
}
```

### 5. Showcase (`src/pages/Showcase.tsx`)

```typescript
import { showcaseAPI } from '@/lib/api'

const [projects, setProjects] = useState([])

useEffect(() => {
  showcaseAPI.getAll()
    .then(data => setProjects(data))
    .catch(error => console.error('Failed:', error))
}, [])

const handlePurchase = async (projectId, tokens) => {
  try {
    const result = await showcaseAPI.buy(projectId, tokens)
    setUserTokens(result.new_balance)
    // Update project status to purchased
  } catch (error) {
    console.error('Purchase failed:', error)
  }
}
```

### 6. Settings (`src/pages/Settings.tsx`)

```typescript
import { settingsAPI } from '@/lib/api'

const [userData, setUserData] = useState(null)

useEffect(() => {
  settingsAPI.getSettings()
    .then(data => setUserData(data))
    .catch(error => console.error('Failed:', error))
}, [])

const handleSaveProfile = async () => {
  try {
    const result = await settingsAPI.updateProfile(
      displayName,
      githubUser,
      avatarUrl
    )
    setUserData(result.user)
  } catch (error) {
    console.error('Update failed:', error)
  }
}

const handleChangePassword = async () => {
  try {
    await settingsAPI.updatePassword(
      currentPassword,
      newPassword
    )
  } catch (error) {
    console.error('Password change failed:', error)
  }
}
```

## Common Patterns

### Loading State
```typescript
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)

useEffect(() => {
  setLoading(true)
  someAPI.getData()
    .then(data => {
      setData(data)
      setError(null)
    })
    .catch(err => {
      setError(err.message)
    })
    .finally(() => setLoading(false))
}, [])

if (loading) return <LoadingSpinner />
if (error) return <ErrorAlert message={error} />
```

### Form Submission
```typescript
const handleSubmit = async (e) => {
  e.preventDefault()
  setLoading(true)
  try {
    await someAPI.create(data)
    showSuccessMessage('Created successfully')
    navigate('/next-page')
  } catch (error) {
    showErrorMessage(error.message)
  } finally {
    setLoading(false)
  }
}
```

### List Operations
```typescript
// Load list
useEffect(() => {
  someAPI.getList()
    .then(setItems)
}, [])

// Delete item
const handleDelete = async (id) => {
  await someAPI.delete(id)
  setItems(items.filter(i => i.id !== id))
}

// Update item
const handleUpdate = async (id, newData) => {
  const updated = await someAPI.update(id, newData)
  setItems(items.map(i => i.id === id ? updated : i))
}
```

## API Client Functions

### Available Functions

```typescript
// Authentication
authAPI.register(email, password, name)
authAPI.login(email, password)
authAPI.logout()
authAPI.getMe()

// Submissions
submissionsAPI.create(repo_url, description)
submissionsAPI.getMySubmissions()
submissionsAPI.getSubmission(id)

// Portfolio
portfolioAPI.getProjects()
portfolioAPI.updateVisibility(submission_id, visible)
portfolioAPI.updateTemplate(template_id)
portfolioAPI.getPublicPortfolio(username, template)

// Showcase
showcaseAPI.getAll()
showcaseAPI.buy(submission_id, tokens_spent)
showcaseAPI.getMyPurchases()

// Dashboard
dashboardAPI.getOverview()

// Settings
settingsAPI.getSettings()
settingsAPI.updateProfile(name, github_username, avatar_url)
settingsAPI.updatePassword(current_password, new_password)
settingsAPI.updateAvatar(avatar_url)
settingsAPI.updateNotifications(email, project)
settingsAPI.deleteAccount()

// Notifications
notificationsAPI.getNotifications(limit)
notificationsAPI.markAsRead(id)
notificationsAPI.markMultipleAsRead(ids)
notificationsAPI.deleteNotification(id)

// Tokens
tokensAPI.getBalance()
tokensAPI.getHistory(limit)

// Admin
adminAPI.getSubmissions(status)
adminAPI.getSubmission(id)
adminAPI.updateSubmissionStatus(id, status, tokens_awarded)
```

## Error Handling

All API functions will throw an error if the request fails. Handle them consistently:

```typescript
try {
  const data = await someAPI.getSomething()
  // Success
} catch (error) {
  if (error.message.includes('401') || error.message.includes('Unauthorized')) {
    // Redirect to login
    navigate('/login')
  } else if (error.message.includes('404')) {
    // Show not found
    showErrorMessage('Item not found')
  } else {
    // Show generic error
    showErrorMessage(error.message || 'Something went wrong')
  }
}
```

## Token Management

The API client automatically:
- Gets the token from Supabase
- Adds it to the Authorization header
- Handles token refresh if needed

You don't need to do anything special for authentication!

## CORS & Proxy

The frontend proxy in `vite.config.ts` forwards:
```
/api/* → http://localhost:3000/api/*
```

So you can use relative paths like `/api/endpoint` in production too.

## Testing Endpoints

You can test endpoints directly with curl or Postman:

```bash
# Get dashboard data (requires valid token)
curl -X GET http://localhost:3000/api/dashboard/overview \
  -H "Authorization: Bearer {your-token}"

# Get all showcase projects (no auth required)
curl -X GET http://localhost:3000/api/showcase

# Submit project (requires auth)
curl -X POST http://localhost:3000/api/submissions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {your-token}" \
  -d '{"repo_url":"https://github.com/user/project","description":"..."}'
```

## Next Steps

1. Use this guide to integrate each page
2. Test each endpoint as you integrate
3. Handle loading and error states
4. Add success/error messages for user feedback
5. Deploy when everything works!

## Need Help?

- Check `src/lib/api.ts` for all available functions
- Check `server/README.md` for API documentation
- Check `BACKEND_SETUP.md` for setup issues
