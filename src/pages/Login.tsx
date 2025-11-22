import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { DarkVeil } from '@/components/dark-veil'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { motion } from 'framer-motion'
import { Mail, Lock, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { QuoteDisplay } from '@/components/ui/quote-display'
import { HeroHighlight } from '@/components/ui/hero-highlight'

export default function Login() {
  const navigate = useNavigate()
  const { signInWithGoogle, signInWithGithub, login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      // Navigation will happen automatically via onAuthStateChange
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google sign-in failed')
    }
  }

  const handleGithubSignIn = async () => {
    try {
      await signInWithGithub()
      // Navigation will happen automatically via onAuthStateChange
    } catch (err) {
      setError(err instanceof Error ? err.message : 'GitHub sign-in failed')
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  const formVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, delay: 0.2 },
    },
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Unified Background */}
      <div className="absolute inset-0 -z-10">
        <DarkVeil />
      </div>

      {/* Dot pattern overlay removed - replaced by HeroHighlight */}

      <HeroHighlight containerClassName="absolute inset-0 z-10 h-full w-full block">
        <div className="absolute top-6 left-6 z-50">
          <Link
            to="/"
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors font-open-sans-custom text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Back to Home
          </Link>
        </div>

        {/* Main Layout Container */}
        <motion.div
          className="relative z-10 flex min-h-screen flex-col lg:flex-row"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column - Form */}
          <motion.div
            className="flex w-full lg:w-1/2 items-center justify-center px-6 py-24 lg:px-12"
            variants={formVariants}
          >
            <div className="w-full max-w-md">
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-white [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)] font-open-sans-custom mb-2">
                  Welcome back
                </h1>
                <p className="text-gray-300 text-sm font-open-sans-custom [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)]">
                  Sign in to continue to Zorvexra
                </p>
              </div>

              {/* OAuth Buttons */}
              <div className="space-y-3 mb-6">
                <Button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full bg-white text-black hover:bg-gray-100 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] font-open-sans-custom border border-white/20"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </Button>

                <Button
                  type="button"
                  onClick={handleGithubSignIn}
                  className="w-full bg-white/10 text-white hover:bg-white/20 border border-white/20 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] font-open-sans-custom"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  Continue with GitHub
                </Button>
              </div>

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-transparent text-gray-400 font-open-sans-custom">OR</span>
                </div>
              </div>

              {/* Form */}
              <div className="rounded-2xl border-2 border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                {error && (
                  <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-white [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)] font-open-sans-custom flex items-center gap-2">
                      <Mail size={16} />
                      Email
                    </Label>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-white/20 bg-white/5 text-white placeholder:text-gray-500 focus:border-purple-400/50 focus:bg-white/10 [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)]"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)] font-open-sans-custom flex items-center gap-2">
                      <Lock size={16} />
                      Password
                    </Label>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-white/20 bg-white/5 text-white placeholder:text-gray-500 focus:border-purple-400/50 focus:bg-white/10 [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)]"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] font-open-sans-custom border border-white/20 font-semibold"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin mr-2" />
                        Signing in...
                      </>
                    ) : (
                      'Log in'
                    )}
                  </Button>
                </form>
              </div>

              <p className="mt-6 text-center text-sm text-gray-300 font-open-sans-custom">
                Don't have an account?{' '}
                <Link to="/signup" className="font-semibold text-purple-300 hover:text-purple-200 transition-colors">
                  Sign up
                </Link>
              </p>
            </div>
          </motion.div>

          {/* Right Column - Animated Quote */}
          <div className="hidden flex-1 items-center justify-center lg:flex">
            <div className="relative h-full w-full">
              <QuoteDisplay disableBackground={true} />
            </div>
          </div>
        </motion.div>
      </HeroHighlight>
    </main>
  )
}
