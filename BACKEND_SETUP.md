# Zorvexra Backend Setup Guide

## Quick Start

Follow these steps to set up the entire Zorvexra backend system.

### Step 1: Install Backend Dependencies

```bash
cd server
npm install
```

### Step 2: Configure Supabase

1. **Create/Open Supabase Project**
   - Go to https://supabase.com
   - Create a new project or open existing one
   - Note the Project URL and API keys

2. **Set Up Environment Variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_KEY=your-service-key-here
   FRONTEND_URL=http://localhost:5173
   ```

3. **Get Your Credentials**
   - In Supabase Dashboard: Settings → API
   - Copy "Project URL"
   - Copy "anon public" key
   - Copy "service_role" key (keep this secret!)

### Step 3: Initialize Database

1. **Open Supabase SQL Editor**
   - In Supabase Dashboard: SQL Editor → New Query

2. **Copy and Run Schema**
   - Copy all content from `server/db/schema.sql`
   - Paste into SQL Editor
   - Click "Run"
   - Wait for success message

3. **Verify Tables Created**
   - Go to Table Editor
   - You should see these tables:
     - users
     - submissions
     - portfolio_visibility
     - portfolio_templates
     - purchases
     - token_history
     - notifications

### Step 4: Start Backend Server

```bash
# From server directory
npm run dev
```

You should see:
```
🚀 Server running on http://localhost:3000
```

### Step 5: Start Frontend

```bash
# From root directory (in another terminal)
npm run dev
```

Frontend will be at: http://localhost:5173

## Complete Architecture

### Directory Structure

```
project-root/
├── src/                          # Frontend React code
│   ├── context/AuthContext.tsx   # Auth management
│   ├── lib/
│   │   ├── api.ts               # API client (NEW)
│   │   └── supabaseClient.ts    # Supabase setup
│   ├── pages/
│   │   ├��─ Dashboard.tsx        # Overview
│   │   ├── MySubmissions.tsx    # Submissions list
│   │   ├── SubmitProject.tsx    # GitHub form
│   │   ├── Portfolio.tsx        # Portfolio manager
│   │   ├── Showcase.tsx         # Marketplace
│   │   └── Settings.tsx         # User settings
│   └── components/floating-navbar.tsx # Navigation
│
├── server/                       # Backend Node.js/Express
│   ├── src/
│   │   ├── index.ts            # Main server file
│   │   ├── middleware/auth.ts  # JWT verification
│   │   └── routes/
│   │       ├── auth.ts         # Register, Login, Logout
│   │       ├── submissions.ts  # GitHub submissions
│   │       ├── portfolio.ts    # Portfolio management
│   │       ├── showcase.ts     # Marketplace
│   │       ├── dashboard.ts    # Overview stats
│   │       ├── settings.ts     # User settings
│   │       ├── notifications.ts # Notifications
│   │       ├── tokens.ts       # Token system
│   │       └── admin.ts        # Admin review
│   ├── db/schema.sql           # Database tables & RLS
│   ├── .env                    # Supabase credentials
│   └── package.json
│
└── package.json                # Frontend
```

### Data Flow

```
Frontend (React/Vite)
    ↓
    ↓ HTTP requests with Bearer token
    ↓
Express API (Node.js)
    ↓
    ↓ SQL queries with RLS
    ↓
Supabase PostgreSQL
```

## Features Implemented

### ✅ Authentication
- User registration
- Email/password login
- Logout
- JWT token management
- Session persistence

### ✅ Submissions System
- Submit GitHub repository
- Weekly submission limit (1 per week)
- Status: pending/approved/rejected
- Token awards on approval

### ✅ Portfolio System
- Choose visible projects
- Select portfolio template
- Public portfolio URL
- Template configuration

### ✅ Showcase Marketplace
- Browse approved projects
- Token-based purchases
- Purchase history
- Affordability checks

### ✅ Token System
- Token balance tracking
- Transaction history
- Awards on approval
- Spent on purchases

### ✅ Notifications
- Submission status updates
- Purchase notifications
- Mark as read
- Delete notifications

### ✅ Settings
- Update profile information
- Change password
- GitHub account linking
- Notification preferences
- Delete account

### ✅ Dashboard
- Overview statistics
- Recent submissions
- Weekly deadline
- Notifications
- Token balance

### ✅ Admin Panel
- Review pending submissions
- Approve/reject submissions
- Award tokens
- Adjust token amounts

## API Endpoints Reference

### Authentication
```
POST   /api/auth/register          # Register user
POST   /api/auth/login             # Login user
POST   /api/auth/logout            # Logout
GET    /api/auth/me                # Get current user
```

### Submissions
```
POST   /api/submissions            # Submit project
GET    /api/submissions/me         # Get my submissions
GET    /api/submissions/:id        # Get submission details
```

### Portfolio
```
GET    /api/portfolio/projects     # Get my projects
PATCH  /api/portfolio/visibility   # Update visibility
PATCH  /api/portfolio/template     # Change template
GET    /api/portfolio/public/:username  # Public portfolio
```

### Showcase
```
GET    /api/showcase               # Get all projects
POST   /api/showcase/buy           # Purchase project
GET    /api/showcase/purchases/me  # Get my purchases
```

### Dashboard
```
GET    /api/dashboard/overview     # Get overview data
```

### Settings
```
GET    /api/settings               # Get settings
PATCH  /api/settings/profile       # Update profile
PATCH  /api/settings/password      # Change password
PATCH  /api/settings/avatar        # Update avatar
PATCH  /api/settings/notifications # Update notifications
DELETE /api/settings/account       # Delete account
```

### Notifications
```
GET    /api/notifications          # Get notifications
PATCH  /api/notifications/:id/read # Mark as read
DELETE /api/notifications/:id      # Delete notification
```

### Tokens
```
GET    /api/tokens/balance         # Get balance
GET    /api/tokens/history         # Get history
```

### Admin
```
GET    /api/admin/submissions      # List submissions
GET    /api/admin/submissions/:id  # Get submission
PATCH  /api/admin/submissions/:id/status  # Update status
```

## Authentication Flow

1. **User Registers**
   ```
   Frontend → POST /auth/register → Supabase Auth → Create User → Database
   ```

2. **User Logs In**
   ```
   Frontend → POST /auth/login → Supabase Auth → Return Token
   Frontend stores token in memory
   ```

3. **Authenticated Request**
   ```
   Frontend → GET /api/some-endpoint
   Headers: Authorization: Bearer {token}
   Backend verifies with Supabase → Returns data
   ```

## Token Award Rules

- **Approved within 7 days**: +1 token
- **Approved after 7 days**: +0.5 tokens
- **Rejected**: No tokens
- **Purchase**: Deduct tokens from buyer

## Security Features

- ✅ Row Level Security (RLS) on all tables
- ✅ JWT token verification
- ✅ Admin-only endpoints
- ✅ No password hashing needed (Supabase handles it)
- ✅ Secure session management
- ✅ CORS protection

## Troubleshooting

### Server won't start
```bash
# Check Node version
node --version  # Should be 18+

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Database connection error
- Verify SUPABASE_URL and SUPABASE_SERVICE_KEY in .env
- Check Supabase project is active
- Verify credentials are copied correctly

### Auth failing
- Clear browser cache/cookies
- Check token in browser Network tab
- Verify CORS settings in server/index.ts

### API returns 401
- Token might be expired → Have user log in again
- Check Authorization header format: `Bearer {token}`

## Deployment

### Deploy to Vercel (Frontend)
```bash
vercel --prod
```

### Deploy to Render/Railway (Backend)
```bash
# Push to GitHub
git push

# Connect repository to Render/Railway
# Set environment variables in dashboard
# Auto-deploy on push
```

## Next Steps

1. ✅ Backend is ready
2. ✅ Database is set up
3. ✅ API client is ready (`src/lib/api.ts`)
4. **Connect frontend pages** to API (see frontend-api-integration.md)
5. **Test all flows** end-to-end
6. **Deploy** to production

## Support

For issues:
1. Check `.env` file exists and has correct values
2. Verify database schema in Supabase SQL Editor
3. Check server logs for error messages
4. Check browser console for frontend errors
5. Verify network requests in browser DevTools
