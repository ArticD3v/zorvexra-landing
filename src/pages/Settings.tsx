import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { DarkVeil } from '@/components/dark-veil'
import { FloatingNavbar } from '@/components/floating-navbar'
import { motion } from 'framer-motion'
import { Settings as SettingsIcon, User, Mail, Github, Lock, Bell, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function Settings() {
  const navigate = useNavigate()
  const { user, loading, signOutUser } = useAuth()
  const [username, setUsername] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [githubUser, setGithubUser] = useState('')
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [projectNotifications, setProjectNotifications] = useState(true)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login')
    }
    if (user?.email) {
      setUsername(user.email.split('@')[0])
      setDisplayName(user.user_metadata?.name || user.email.split('@')[0])
    }
  }, [user, loading, navigate])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Simulate saving settings
      setTimeout(() => {
        setIsSaving(false)
        setMessage({ type: 'success', text: 'Settings saved successfully!' })
        setTimeout(() => setMessage(null), 3000)
      }, 1000)
    } catch (error) {
      setIsSaving(false)
      setMessage({ type: 'error', text: 'Failed to save settings. Please try again.' })
    }
  }

  const handleDeleteAccount = async () => {
    try {
      await signOutUser()
      navigate('/')
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete account.' })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <DarkVeil />
      </div>

      <div className="fixed inset-0 z-0 bg-black/40" />

      <FloatingNavbar />

      <div className="relative z-10 min-h-screen pt-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <motion.div
            className="mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-2 flex items-center gap-2">
              <SettingsIcon size={20} className="text-purple-300" />
              <span className="text-gray-400 text-sm font-open-sans-custom">Account</span>
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-5xl font-bold text-white drop-shadow-lg font-open-sans-custom"
            >
              Settings
            </motion.h1>
            <motion.p variants={itemVariants} className="mt-2 text-gray-300 text-base font-open-sans-custom">
              Manage your account and preferences
            </motion.p>
          </motion.div>

          {/* Messages */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 rounded-lg border ${
                message.type === 'success'
                  ? 'bg-green-500/10 border-green-500/30 text-green-300'
                  : 'bg-red-500/10 border-red-500/30 text-red-300'
              } font-open-sans-custom text-sm`}
            >
              {message.text}
            </motion.div>
          )}

          <div className="space-y-8">
            {/* Profile Section */}
            <motion.div
              className="rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-md"
              variants={itemVariants}
            >
              <h2 className="text-2xl font-bold text-white font-open-sans-custom drop-shadow-lg mb-6 flex items-center gap-2">
                <User size={24} className="text-purple-300" />
                Profile Information
              </h2>

              <div className="space-y-6">
                {/* Username (Read-only) */}
                <div className="space-y-3">
                  <Label className="text-white font-open-sans-custom">Username</Label>
                  <Input
                    type="text"
                    value={username}
                    disabled
                    className="border-white/20 bg-white/5 text-gray-300 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-400 font-open-sans-custom">Username cannot be changed</p>
                </div>

                {/* Display Name */}
                <div className="space-y-3">
                  <Label className="text-white font-open-sans-custom">Display Name</Label>
                  <Input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Your display name"
                    className="border-white/20 bg-white/5 text-white placeholder:text-gray-500 focus:border-purple-400/50 focus:bg-white/10"
                  />
                </div>

                {/* Email (Read-only) */}
                <div className="space-y-3">
                  <Label className="text-white font-open-sans-custom flex items-center gap-2">
                    <Mail size={16} />
                    Email Address
                  </Label>
                  <Input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="border-white/20 bg-white/5 text-gray-300 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-400 font-open-sans-custom">Email verified</p>
                </div>
              </div>
            </motion.div>

            {/* Integrations Section */}
            <motion.div
              className="rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-md"
              variants={itemVariants}
            >
              <h2 className="text-2xl font-bold text-white font-open-sans-custom drop-shadow-lg mb-6 flex items-center gap-2">
                <Github size={24} className="text-purple-300" />
                Connected Accounts
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <Github size={20} className="text-purple-300" />
                    <div>
                      <p className="font-semibold text-white font-open-sans-custom">GitHub</p>
                      <p className="text-sm text-gray-400 font-open-sans-custom">
                        {githubUser ? `Connected as @${githubUser}` : 'Not connected'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setGithubUser(githubUser ? '' : 'github-username')}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold font-open-sans-custom transition-all ${
                      githubUser
                        ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30 border border-red-500'
                        : 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 border border-purple-400'
                    }`}
                  >
                    {githubUser ? 'Disconnect' : 'Connect'}
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Security Section */}
            <motion.div
              className="rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-md"
              variants={itemVariants}
            >
              <h2 className="text-2xl font-bold text-white font-open-sans-custom drop-shadow-lg mb-6 flex items-center gap-2">
                <Lock size={24} className="text-purple-300" />
                Security
              </h2>

              <div className="space-y-3">
                <button className="w-full p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left font-open-sans-custom">
                  <p className="font-semibold text-white">Change Password</p>
                  <p className="text-sm text-gray-400">Update your password regularly for security</p>
                </button>
              </div>
            </motion.div>

            {/* Notifications Section */}
            <motion.div
              className="rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-md"
              variants={itemVariants}
            >
              <h2 className="text-2xl font-bold text-white font-open-sans-custom drop-shadow-lg mb-6 flex items-center gap-2">
                <Bell size={24} className="text-purple-300" />
                Notifications
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                  <div>
                    <p className="font-semibold text-white font-open-sans-custom">Email Notifications</p>
                    <p className="text-sm text-gray-400 font-open-sans-custom">Receive email updates</p>
                  </div>
                  <button
                    onClick={() => setEmailNotifications(!emailNotifications)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      emailNotifications ? 'bg-purple-500' : 'bg-gray-700'
                    }`}
                  >
                    <div
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        emailNotifications ? 'translate-x-6' : ''
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                  <div>
                    <p className="font-semibold text-white font-open-sans-custom">Project Updates</p>
                    <p className="text-sm text-gray-400 font-open-sans-custom">Get notified about project reviews</p>
                  </div>
                  <button
                    onClick={() => setProjectNotifications(!projectNotifications)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      projectNotifications ? 'bg-purple-500' : 'bg-gray-700'
                    }`}
                  >
                    <div
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        projectNotifications ? 'translate-x-6' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Save Button */}
            <motion.div
              className="flex gap-3"
              variants={itemVariants}
            >
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 font-open-sans-custom"
              >
                {isSaving ? 'Saving...' : 'Save Settings'}
              </Button>
              <Button
                onClick={() => navigate('/dashboard')}
                className="flex-1 bg-white/10 text-white hover:bg-white/20 border border-white/20 font-open-sans-custom"
              >
                Cancel
              </Button>
            </motion.div>

            {/* Danger Zone */}
            <motion.div
              className="rounded-xl border border-red-500/30 bg-red-500/10 p-8 backdrop-blur-md"
              variants={itemVariants}
            >
              <h2 className="text-2xl font-bold text-red-300 font-open-sans-custom drop-shadow-lg mb-2 flex items-center gap-2">
                <Trash2 size={24} />
                Danger Zone
              </h2>
              <p className="text-red-300/70 font-open-sans-custom text-sm mb-6">
                These actions are permanent and cannot be undone.
              </p>

              <button
                onClick={() => setShowDeleteModal(true)}
                className="px-4 py-3 rounded-lg bg-red-500/20 text-red-300 border border-red-500 hover:bg-red-500/30 font-open-sans-custom font-semibold transition-all"
              >
                Delete Account
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="rounded-lg bg-gray-900 border border-red-500/30 p-6 max-w-sm mx-4"
          >
            <h3 className="text-xl font-bold text-white font-open-sans-custom mb-2">Delete Account?</h3>
            <p className="text-gray-300 font-open-sans-custom text-sm mb-6">
              This action is permanent. All your data will be deleted and cannot be recovered.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 font-open-sans-custom font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 px-4 py-2 rounded-lg bg-red-500/20 text-red-300 border border-red-500 hover:bg-red-500/30 font-open-sans-custom font-semibold"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </main>
  )
}
