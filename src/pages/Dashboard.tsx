import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { DarkVeil } from '@/components/dark-veil'
import { FloatingNavbar } from '@/components/floating-navbar'
import { motion } from 'framer-motion'
import { User, BarChart3, Settings, FileText } from 'lucide-react'
import { useEffect } from 'react'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, loading, signOutUser } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login')
    }
  }, [user, loading, navigate])

  const handleLogout = () => {
    signOutUser()
    navigate('/login')
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

  const dashboardItems = [
    { icon: BarChart3, label: 'Analytics', description: 'View your performance metrics' },
    { icon: FileText, label: 'Projects', description: 'Manage your projects' },
    { icon: Settings, label: 'Settings', description: 'Configure your preferences' },
  ]

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <DarkVeil />
      </div>

      <div className="fixed inset-0 z-0 bg-black/40" />

      <FloatingNavbar />

      <div className="relative z-10 min-h-screen pt-24">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
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
              {user?.user_metadata?.name || user?.email?.split('@')[0]}, let&apos;s build something amazing!
            </motion.h1>
            <motion.p variants={itemVariants} className="mt-2 text-gray-300 text-lg font-open-sans-custom">
              You&apos;re logged in as <span className="font-semibold text-purple-300">{user?.email}</span>
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {dashboardItems.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md hover:border-white/20 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                >
                  <div className="mb-4 inline-flex rounded-lg bg-purple-500/20 p-3 group-hover:bg-purple-500/30 transition-colors">
                    <Icon size={24} className="text-purple-300" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-white font-open-sans-custom drop-shadow-sm">
                    {item.label}
                  </h3>
                  <p className="text-sm text-gray-400">{item.description}</p>
                </motion.div>
              )
            })}
          </motion.div>

          <motion.div
            className="mt-12 rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-md"
            variants={itemVariants}
          >
            <h2 className="mb-6 text-2xl font-bold text-white font-open-sans-custom drop-shadow-lg">
              Quick Stats
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Projects', value: '12' },
                { label: 'Team Members', value: '5' },
                { label: 'Deployments', value: '48' },
                { label: 'Active Users', value: '2.4K' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="rounded-lg bg-white/5 p-4 text-center border border-white/5"
                >
                  <p className="text-2xl font-bold text-purple-300 font-open-sans-custom">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-gray-400 font-open-sans-custom">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
