import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { DarkVeil } from '@/components/dark-veil'
import { FloatingNavbar } from '@/components/floating-navbar'
import { motion } from 'framer-motion'
import { FileText, ArrowUpDown, CheckCircle, Clock, XCircle, Zap, Eye, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

interface Submission {
  id: string
  projectName: string
  githubUrl: string
  date: string
  status: 'Approved' | 'Pending' | 'Rejected'
  tokens: number
}

export default function MySubmissions() {
  const navigate = useNavigate()
  const { user, loading } = useAuth()
  const [filter, setFilter] = useState<'All' | 'Approved' | 'Pending' | 'Rejected'>('All')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest')

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login')
    }
  }, [user, loading, navigate])

  const submissions: Submission[] = [
    { 
      id: '1',
      projectName: 'E-Commerce Platform', 
      githubUrl: 'https://github.com/user/ecommerce',
      date: '2024-01-15',
      status: 'Approved',
      tokens: 250,
    },
    { 
      id: '2',
      projectName: 'Social Media Dashboard', 
      githubUrl: 'https://github.com/user/social-dashboard',
      date: '2024-01-10',
      status: 'Pending',
      tokens: 0,
    },
    { 
      id: '3',
      projectName: 'Weather App', 
      githubUrl: 'https://github.com/user/weather-app',
      date: '2024-01-05',
      status: 'Approved',
      tokens: 180,
    },
    { 
      id: '4',
      projectName: 'Task Management System', 
      githubUrl: 'https://github.com/user/task-manager',
      date: '2024-01-01',
      status: 'Rejected',
      tokens: 0,
    },
    { 
      id: '5',
      projectName: 'Portfolio Website', 
      githubUrl: 'https://github.com/user/portfolio',
      date: '2023-12-28',
      status: 'Approved',
      tokens: 200,
    },
  ]

  const filteredSubmissions = submissions.filter(sub => {
    if (filter === 'All') return true
    return sub.status === filter
  }).sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return sortBy === 'newest' ? dateB - dateA : dateA - dateB
  })

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Approved':
        return <CheckCircle size={18} className="text-green-400" />
      case 'Pending':
        return <Clock size={18} className="text-yellow-400" />
      case 'Rejected':
        return <XCircle size={18} className="text-red-400" />
      default:
        return null
    }
  }

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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <motion.div
            className="mb-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-2 flex items-center gap-2">
              <FileText size={20} className="text-purple-300" />
              <span className="text-gray-400 text-sm font-open-sans-custom">My Projects</span>
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-5xl font-bold text-white drop-shadow-lg font-open-sans-custom"
            >
              My Submissions
            </motion.h1>
            <motion.p variants={itemVariants} className="mt-2 text-gray-300 text-base font-open-sans-custom">
              Manage and track all your project submissions
            </motion.p>
          </motion.div>

          {/* Controls */}
          <motion.div
            className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center"
            variants={itemVariants}
          >
            <div className="flex gap-2 flex-wrap">
              {(['All', 'Approved', 'Pending', 'Rejected'] as const).map((filterOption) => (
                <button
                  key={filterOption}
                  onClick={() => setFilter(filterOption)}
                  className={`px-4 py-2 rounded-lg text-sm font-open-sans-custom transition-all ${
                    filter === filterOption
                      ? 'bg-purple-500/30 text-purple-300 border border-purple-400'
                      : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {filterOption}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <ArrowUpDown size={18} className="text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest')}
                className="bg-white/5 border border-white/10 text-white rounded-lg px-3 py-2 text-sm font-open-sans-custom hover:bg-white/10 transition-colors focus:outline-none focus:border-purple-400"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
            </div>
          </motion.div>

          {/* Submissions List */}
          <motion.div
            className="space-y-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredSubmissions.length > 0 ? (
              filteredSubmissions.map((submission, index) => (
                <motion.div
                  key={submission.id}
                  variants={itemVariants}
                  className="rounded-lg border border-white/10 bg-white/5 p-6 hover:border-white/20 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 flex gap-4">
                      <div className="hidden sm:flex items-center">
                        <FileText size={24} className="text-purple-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-white font-open-sans-custom truncate">
                          {submission.projectName}
                        </h3>
                        <p className="text-sm text-gray-400 font-open-sans-custom mt-1">
                          Submitted {new Date(submission.date).toLocaleDateString()}
                        </p>
                        <a
                          href={submission.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-purple-300 hover:text-purple-200 font-open-sans-custom mt-2 inline-flex items-center gap-1"
                        >
                          View Repository
                          <ChevronRight size={12} />
                        </a>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(submission.status)}
                        <span className={`text-sm font-semibold px-3 py-1 rounded-full ${getStatusColor(submission.status)} font-open-sans-custom`}>
                          {submission.status}
                        </span>
                      </div>

                      {submission.tokens > 0 && (
                        <div className="flex items-center gap-2 text-purple-300 font-open-sans-custom">
                          <Zap size={16} />
                          <span className="text-sm font-semibold whitespace-nowrap">{submission.tokens}</span>
                        </div>
                      )}

                      <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-gray-300 hover:text-white group-hover:scale-110">
                        <Eye size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                variants={itemVariants}
                className="text-center py-12 rounded-lg border border-white/10 bg-white/5"
              >
                <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-300 font-open-sans-custom">No submissions found</p>
                <Button
                  onClick={() => navigate('/dashboard/submit')}
                  className="mt-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700"
                >
                  Submit Your First Project
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  )
}
