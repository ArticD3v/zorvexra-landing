# Zorvexra Backend API

Complete Node.js + Express backend for the Zorvexra.xod3 platform with Supabase integration.

## Setup Instructions

### 1. Prerequisites
- Node.js 18+
- Supabase account
- Git

### 2. Installation

```bash
cd server
npm install
```

### 3. Database Setup

1. Go to your Supabase project dashboard
2. Open the SQL Editor
3. Copy all content from `db/schema.sql`
4. Paste and execute in the SQL Editor
5. This will create all necessary tables and RLS policies

### 4. Environment Configuration

```bash
cp .env.example .env
```

Then update `.env` with your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key
```

Get these from your Supabase project:
- Go to Settings → API
- Copy the Project URL and Anon Key
- For Service Key, use the service_role key (keep this secret!)

### 5. Run Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3000`

### 6. Build for Production

```bash
npm run build
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Submissions
- `POST /api/submissions` - Create submission
- `GET /api/submissions/me` - Get user submissions
- `GET /api/submissions/:id` - Get submission details

### Portfolio
- `GET /api/portfolio/projects` - Get user's projects
- `PATCH /api/portfolio/visibility` - Update visibility
- `PATCH /api/portfolio/template` - Change template
- `GET /api/portfolio/public/:username` - Get public portfolio

### Showcase (Marketplace)
- `GET /api/showcase` - Get all approved projects
- `POST /api/showcase/buy` - Purchase project
- `GET /api/showcase/purchases/me` - Get user purchases

### Dashboard
- `GET /api/dashboard/overview` - Get dashboard data

### Settings
- `GET /api/settings` - Get user settings
- `PATCH /api/settings/profile` - Update profile
- `PATCH /api/settings/password` - Change password
- `PATCH /api/settings/avatar` - Update avatar
- `PATCH /api/settings/notifications` - Update notifications
- `DELETE /api/settings/account` - Delete account

### Notifications
- `GET /api/notifications` - Get notifications
- `PATCH /api/notifications/:id/read` - Mark as read
- `DELETE /api/notifications/:id` - Delete notification

### Tokens
- `GET /api/tokens/balance` - Get token balance
- `GET /api/tokens/history` - Get token history

### Admin
- `GET /api/admin/submissions` - List submissions for review
- `GET /api/admin/submissions/:id` - Get submission details
- `PATCH /api/admin/submissions/:id/status` - Update status and award tokens

## Database Schema

### Tables
- **users** - User accounts with profile info
- **submissions** - GitHub project submissions
- **portfolio_visibility** - Project visibility settings
- **portfolio_templates** - Portfolio layout options
- **purchases** - Marketplace purchases
- **token_history** - Token transaction log
- **notifications** - User notifications
- **portfolio_templates** - Template definitions

## Authentication Flow

1. User registers/logs in via Supabase Auth
2. Frontend receives `access_token` from auth
3. Frontend sends token in `Authorization: Bearer {token}` header
4. Backend verifies token with Supabase
5. Backend creates user record in database on first registration

## Token System

- Tokens awarded on submission approval
- Users can spend tokens to purchase projects
- Token balance tracked in real-time
- Full history available in token_history table

## Error Handling

All errors return consistent JSON format:
```json
{
  "error": "Error message here"
}
```

HTTP Status Codes:
- 200 - OK
- 201 - Created
- 400 - Bad Request
- 401 - Unauthorized
- 403 - Forbidden
- 404 - Not Found
- 500 - Server Error

## Security

- Row Level Security (RLS) enabled on all tables
- JWT token validation on protected routes
- Admin-only endpoints require admin flag
- Password changes via Supabase Auth
- No secrets exposed in code

## Frontend Integration

The frontend should:
1. Send token in Authorization header: `Authorization: Bearer {token}`
2. Handle 401 responses by redirecting to login
3. Store token in memory (not localStorage for security)
4. Use `/api/auth/me` to verify logged-in state

## Support

For issues:
1. Check Supabase logs
2. Verify environment variables
3. Ensure database schema is up to date
4. Check network tab for API errors
