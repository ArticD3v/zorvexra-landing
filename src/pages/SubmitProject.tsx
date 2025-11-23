import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { DarkVeil } from '@/components/dark-veil'
import { FloatingNavbar } from '@/components/floating-navbar'
import { motion } from 'framer-motion'
import { Upload, Github, AlertCircle, CheckCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function SubmitProject() {
  const navigate = useNavigate()
  const { user, loading } = useAuth()
  const [githubUrl, setGithubUrl] = useState('')
  const [projectName, setProjectName] = useState('')
  const [description, setDescription] = useState('')
  const [isValidating, setIsValidating] = useState(false)
  const [validationStatus, setValidationStatus] = useState<'idle' | 'validating' | 'valid' | 'invalid'>('idle')
  const [validationError, setValidationError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login')
    }
  }, [user, loading, navigate])

  const validateGithubUrl = async (url: string) => {
    setValidationStatus('validating')
    setValidationError('')

    try {
      const match = url.match(/github\.com\/([^/]+)\/([^/]+)/)
      if (!match) {
        setValidationStatus('invalid')
        setValidationError('Please enter a valid GitHub repository URL')
        return false
      }

      const owner = match[1]
      const repo = match[2].replace('.git', '')

      setProjectName(repo.replace(/-/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2').split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '))

      setValidationStatus('valid')
      return true
    } catch (error) {
      setValidationStatus('invalid')
      setValidationError('Failed to validate repository')
      return false
    }
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setGithubUrl(url)
    setValidationStatus('idle')
  }

  const handleValidate = async () => {
    await validateGithubUrl(githubUrl)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validationStatus !== 'valid') {
      setValidationError('Please validate your GitHub repository first')
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate submission
      setTimeout(() => {
        setIsSubmitting(false)
        // Navigate to submissions page and show success message
        navigate('/dashboard/submissions')
      }, 1500)
    } catch (error) {
      setIsSubmitting(false)
      setValidationError('Failed to submit project. Please try again.')
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
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <motion.div
            className="mb-12 text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-4 flex items-center justify-center gap-2">
              <Upload size={24} className="text-purple-300" />
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-4xl font-bold text-white drop-shadow-lg font-open-sans-custom mb-2"
            >
              Submit Your Project
            </motion.h1>
            <motion.p variants={itemVariants} className="text-gray-300 text-base font-open-sans-custom">
              Share your work with the Zorvexra community
            </motion.p>
          </motion.div>

          {/* Main Form */}
          <motion.div
            className="rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-md"
            variants={itemVariants}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* GitHub URL */}
              <div className="space-y-3">
                <Label className="text-white font-open-sans-custom flex items-center gap-2">
                  <Github size={16} />
                  GitHub Repository URL
                </Label>
                <div className="flex gap-2">
                  <Input
                    type="url"
                    placeholder="https://github.com/username/repository"
                    value={githubUrl}
                    onChange={handleUrlChange}
                    className="flex-1 border-white/20 bg-white/5 text-white placeholder:text-gray-500 focus:border-purple-400/50 focus:bg-white/10"
                    required
                  />
                  <Button
                    type="button"
                    onClick={handleValidate}
                    disabled={!githubUrl || validationStatus === 'validating'}
                    className="bg-white/10 text-white hover:bg-white/20 border border-white/20 font-open-sans-custom"
                  >
                    {validationStatus === 'validating' ? 'Validating...' : 'Validate'}
                  </Button>
                </div>

                {validationStatus === 'valid' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-green-400 text-sm font-open-sans-custom">
                    <CheckCircle size={16} />
                    Repository validated successfully
                  </motion.div>
                )}

                {validationStatus === 'invalid' && validationError && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-red-400 text-sm font-open-sans-custom">
                    <AlertCircle size={16} />
                    {validationError}
                  </motion.div>
                )}
              </div>

              {/* Project Name */}
              <div className="space-y-3">
                <Label className="text-white font-open-sans-custom">Project Name</Label>
                <Input
                  type="text"
                  placeholder="Auto-filled from GitHub"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="border-white/20 bg-white/5 text-white placeholder:text-gray-500 focus:border-purple-400/50 focus:bg-white/10"
                  required
                />
                <p className="text-xs text-gray-400 font-open-sans-custom">This will be auto-filled after validating your repository.</p>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <Label className="text-white font-open-sans-custom">Description (Optional)</Label>
                <textarea
                  placeholder="Describe your project, its features, and what makes it special..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-white/20 rounded-lg bg-white/5 text-white placeholder:text-gray-500 focus:border-purple-400/50 focus:bg-white/10 p-3 font-open-sans-custom resize-none"
                  rows={5}
                />
              </div>

              {/* Submission Rules */}
              <div className="rounded-lg bg-white/5 border border-white/10 p-4">
                <h3 className="text-white font-semibold font-open-sans-custom mb-3 flex items-center gap-2">
                  <AlertCircle size={16} className="text-purple-300" />
                  Submission Rules
                </h3>
                <ul className="space-y-2 text-sm text-gray-300 font-open-sans-custom">
                  <li className="flex gap-2">
                    <span className="text-purple-300 font-bold">✓</span>
                    Must be a public repository
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-300 font-bold">✓</span>
                    Must be your original work or properly credited
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-300 font-bold">✓</span>
                    One submission per week (rolling)
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-300 font-bold">✓</span>
                    Submissions are reviewed within 24-48 hours
                  </li>
                </ul>
              </div>

              {/* Error Message */}
              {isSubmitting === false && validationError && validationStatus !== 'valid' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-lg bg-red-500/10 border border-red-500/30 p-4 flex items-center gap-3 text-red-300 text-sm font-open-sans-custom"
                >
                  <AlertCircle size={18} />
                  {validationError}
                </motion.div>
              )}

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="flex-1 bg-white/10 text-white hover:bg-white/20 border border-white/20 font-open-sans-custom"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={validationStatus !== 'valid' || isSubmitting}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed font-open-sans-custom"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Project'}
                </Button>
              </div>
            </form>
          </motion.div>

          {/* Info Box */}
          <motion.div
            variants={itemVariants}
            className="mt-8 rounded-lg bg-white/5 border border-white/10 p-6 text-center"
          >
            <p className="text-gray-300 font-open-sans-custom text-sm mb-2">
              ✨ Your project must be public and original to be approved
            </p>
            <p className="text-gray-400 font-open-sans-custom text-xs">
              Approved projects earn ZorBits tokens that can be used in the Showcase marketplace
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
