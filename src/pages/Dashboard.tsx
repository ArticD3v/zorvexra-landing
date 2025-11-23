import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { DarkVeil } from '@/components/dark-veil'
import { FloatingNavbar } from '@/components/floating-navbar'
import { motion } from 'framer-motion'
import { User, CheckCircle, Clock, XCircle, Zap, ArrowRight, FileText } from 'lucide-react'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, loading, signOutUser } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login')
    }
  }, [user, loading, navigate])

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

  const statCards = [
    { label: 'Total Approved Projects', value: '8', icon: CheckCircle, color: 'text-green-400' },
    { label: 'Pending Reviews', value: '3', icon: Clock, color: 'text-yellow-400' },
    { label: 'Rejected Submissions', value: '1', icon: XCircle, color: 'text-red-400' },
    { label: 'Total ZorBits Earned', value: '2,450', icon: Zap, color: 'text-purple-400' },
  ]

  const recentSubmissions = [
    { 
      projectName: 'E-Commerce Platform', 
      date: '2024-01-15',
      status: 'Approved',
      tokens: 250,
    },
    { 
      projectName: 'Social Media Dashboard', 
      date: '2024-01-10',
      status: 'Pending',
      tokens: 0,
    },
    { 
      projectName: 'Weather App', 
      date: '2024-01-05',
      status: 'Approved',
      tokens: 180,
    },
    { 
      projectName: 'Task Management System', 
      date: '2024-01-01',
      status: 'Rejected',
      tokens: 0,
    },
    { 
      projectName: 'Portfolio Website', 
      date: '2023-12-28',
      status: 'Approved',
      tokens: 200,
    },
  ]

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Approved':
        return 'text-green-400 bg-green-400/10'
      case 'Pending':
        return 'text-yellow-400 bg-yellow-400/10'
      case 'Rejected':
        return 'text-red-400 bg-red-400/10'
      default:
        return 'text-gray-400 bg-gray-400/10'
    }
  }

  const getDeadlineStatus = () => {
    const now = new Date()
    const daysUntilDeadline = Math.random() > 0.5 ? 3 : -2
    
    if (daysUntilDeadline > 0) {
      return { status: 'On track', color: 'text-green-400', bgColor: 'bg-green-400/10' }
    } else if (daysUntilDeadline === 0) {
      return { status: 'Today!', color: 'text-yellow-400', bgColor: 'bg-yellow-400/10' }
    } else {
      return { status: 'Late', color: 'text-red-400', bgColor: 'bg-red-400/10' }
    }
  }

  const deadlineInfo = getDeadlineStatus()
  const nextDeadline = new Date()
  nextDeadline.setDate(nextDeadline.getDate() + 7)

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <DarkVeil />
      </div>

      <div className="fixed inset-0 z-0 bg-black/40" />

      <FloatingNavbar />

      <div className="relative z-10 min-h-screen pt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Welcome Header */}
          <motion.div
            className="mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-2 flex items-center gap-2">
              <User size={20} className="text-purple-300" />
              <span className="text-gray-400 text-sm font-open-sans-custom">Welcome back</span>
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-5xl font-bold text-white drop-shadow-lg font-open-sans-custom"
            >
              {user?.user_metadata?.name || user?.email?.split('@')[0]}
            </motion.h1>
            <motion.p 
              variants={itemVariants} 
              className="mt-2 text-gray-300 text-base font-open-sans-custom"
            >
              Here&apos;s an overview of your activity.
            </motion.p>
          </motion.div>

          {/* Stats Summary Row */}
          <motion.div
            className="mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {statCards.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md hover:border-white/20 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-gray-400 font-open-sans-custom mb-2">{stat.label}</p>
                      <p className="text-3xl font-bold text-white font-open-sans-custom">{stat.value}</p>
                    </div>
                    <Icon size={24} className={`${stat.color} opacity-70`} />
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Recent Submissions List */}
          <motion.div
            className="mb-12 rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-md"
            variants={itemVariants}
          >
            <h2 className="mb-6 text-2xl font-bold text-white font-open-sans-custom drop-shadow-lg">
              Recent Submissions
            </h2>
            <div className="space-y-3">
              {recentSubmissions.map((submission, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  onClick={() => navigate('/dashboard')}
                  className="rounded-lg border border-white/10 bg-white/5 p-4 hover:border-white/20 hover:bg-white/10 transition-all duration-300 cursor-pointer flex items-center justify-between"
                >
                  <div className="flex-1 flex items-center gap-4">
                    <FileText size={20} className="text-purple-300 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-semibold text-white font-open-sans-custom">{submission.projectName}</p>
                      <p className="text-xs text-gray-400 font-open-sans-custom">
                        Submitted {new Date(submission.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(submission.status)} font-open-sans-custom`}>
                      {submission.status}
                    </span>
                    {submission.tokens > 0 && (
                      <div className="flex items-center gap-1 text-purple-300 font-open-sans-custom">
                        <Zap size={16} />
                        <span className="text-sm font-semibold">{submission.tokens}</span>
                      </div>
                    )}
                    <ArrowRight size={16} className="text-gray-400 flex-shrink-0" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Weekly Submission Deadline */}
          <motion.div
            className="mb-12 rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-md"
            variants={itemVariants}
          >
            <h2 className="mb-4 text-2xl font-bold text-white font-open-sans-custom drop-shadow-lg">
              Weekly Submission Deadline
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-400 font-open-sans-custom mb-2">Next Deadline</p>
                <p className="text-3xl font-bold text-white font-open-sans-custom">
                  {nextDeadline.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400 font-open-sans-custom mb-2">Current Status</p>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${deadlineInfo.bgColor}`}>
                  <div className={`w-2 h-2 rounded-full ${deadlineInfo.color}`} />
                  <span className={`font-semibold font-open-sans-custom ${deadlineInfo.color}`}>
                    {deadlineInfo.status}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Action Buttons */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Button
                onClick={() => navigate('/dashboard')}
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] font-open-sans-custom border border-white/20 font-semibold"
              >
                Submit New Project
              </Button>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Button
                onClick={() => navigate('/dashboard')}
                className="w-full bg-white/10 text-white hover:bg-white/20 border border-white/20 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] font-open-sans-custom font-semibold"
              >
                View My Submissions
              </Button>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Button
                onClick={() => navigate('/dashboard')}
                className="w-full bg-white/10 text-white hover:bg-white/20 border border-white/20 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] font-open-sans-custom font-semibold"
              >
                View Portfolio
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
