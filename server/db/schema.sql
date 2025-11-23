-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  avatar_url TEXT,
  github_username VARCHAR(255),
  token_balance INTEGER DEFAULT 0,
  selected_template VARCHAR(50) DEFAULT 'minimal',
  email_notifications BOOLEAN DEFAULT true,
  project_notifications BOOLEAN DEFAULT true,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Submissions table
CREATE TABLE IF NOT EXISTS submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  repo_url VARCHAR(500) NOT NULL,
  repo_name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  tokens_awarded FLOAT DEFAULT 0,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  approved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'approved', 'rejected'))
);

-- Portfolio visibility table
CREATE TABLE IF NOT EXISTS portfolio_visibility (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  submission_id UUID NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, submission_id)
);

-- Portfolio templates table
CREATE TABLE IF NOT EXISTS portfolio_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_key VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  config JSONB,
  preview_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Purchases table (for marketplace)
CREATE TABLE IF NOT EXISTS purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  submission_id UUID NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
  tokens_spent INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(buyer_id, submission_id)
);

-- Token history table
CREATE TABLE IF NOT EXISTS token_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount FLOAT NOT NULL,
  action_type VARCHAR(50) NOT NULL,
  related_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  type VARCHAR(50),
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default portfolio templates
INSERT INTO portfolio_templates (template_key, name, config) VALUES
  ('minimal', 'Minimal', '{"layout": "list", "accent": "purple", "cardShape": "rounded"}'),
  ('grid', 'Grid Gallery', '{"layout": "grid", "accent": "purple", "cardShape": "rounded"}'),
  ('showcase', 'Showcase', '{"layout": "showcase", "accent": "purple", "cardShape": "rounded"}'),
  ('timeline', 'Timeline', '{"layout": "timeline", "accent": "purple", "cardShape": "rounded"}')
ON CONFLICT (template_key) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_submissions_user_id ON submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);
CREATE INDEX IF NOT EXISTS idx_portfolio_visibility_user_id ON portfolio_visibility(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_buyer_id ON purchases(buyer_id);
CREATE INDEX IF NOT EXISTS idx_token_history_user_id ON token_history(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);

-- Set up RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_visibility ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE token_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Users RLS Policies
CREATE POLICY "Users can read their own data" ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON users FOR UPDATE
  USING (auth.uid() = id);

-- Submissions RLS Policies
CREATE POLICY "Users can read their own submissions" ON submissions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can read all submissions" ON submissions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() AND users.is_admin = true
    )
  );

CREATE POLICY "Users can create submissions" ON submissions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Portfolio visibility RLS Policies
CREATE POLICY "Users can read their own portfolio visibility" ON portfolio_visibility FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own portfolio visibility" ON portfolio_visibility FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert portfolio visibility" ON portfolio_visibility FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Purchases RLS Policies
CREATE POLICY "Users can read their own purchases" ON purchases FOR SELECT
  USING (auth.uid() = buyer_id);

CREATE POLICY "Users can create purchases" ON purchases FOR INSERT
  WITH CHECK (auth.uid() = buyer_id);

-- Token history RLS Policies
CREATE POLICY "Users can read their own token history" ON token_history FOR SELECT
  USING (auth.uid() = user_id);

-- Notifications RLS Policies
CREATE POLICY "Users can read their own notifications" ON notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" ON notifications FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notifications" ON notifications FOR DELETE
  USING (auth.uid() = user_id);
