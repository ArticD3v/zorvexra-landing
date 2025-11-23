import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { DarkVeil } from '@/components/dark-veil'
import { FloatingNavbar } from '@/components/floating-navbar'
import { motion } from 'framer-motion'
import { Zap, Github, Check, ShoppingCart } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

interface Project {
  id: string
  title: string
  contributor: string
  description: string
  tags: string[]
  tokens: number
  githubUrl: string
  image?: string
}

export default function Showcase() {
  const navigate = useNavigate()
  const { user, loading } = useAuth()
  const [userTokens, setUserTokens] = useState(2450)
  const [purchasedProjects, setPurchasedProjects] = useState<string[]>([])
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login')
    }
  }, [user, loading, navigate])

  const projects: Project[] = [
    {
      id: '1',
      title: 'AI Chat Interface',
      contributor: 'Dev Studio',
      description: 'Production-ready chat interface with real-time messaging and user presence detection.',
      tags: ['React', 'TypeScript', 'WebSocket'],
      tokens: 150,
      githubUrl: 'https://github.com/example/ai-chat',
    },
    {
      id: '2',
      title: 'E-Commerce Dashboard',
      contributor: 'Code Masters',
      description: 'Complete dashboard for managing products, orders, and analytics with advanced filtering.',
      tags: ['Next.js', 'Tailwind', 'PostgreSQL'],
      tokens: 200,
      githubUrl: 'https://github.com/example/ecom-dashboard',
    },
    {
      id: '3',
      title: 'Mobile App Toolkit',
      contributor: 'Mobile Dev Co',
      description: 'React Native component library with 50+ pre-built components for faster mobile development.',
      tags: ['React Native', 'TypeScript', 'Animation'],
      tokens: 300,
      githubUrl: 'https://github.com/example/mobile-kit',
    },
    {
      id: '4',
      title: 'Data Visualization Suite',
      contributor: 'Analytics Pro',
      description: 'Advanced charting and visualization library with interactive dashboards and real-time data.',
      tags: ['D3.js', 'React', 'Charts'],
      tokens: 250,
      githubUrl: 'https://github.com/example/viz-suite',
    },
    {
      id: '5',
      title: 'Authentication System',
      contributor: 'Security Team',
      description: 'Complete auth system with OAuth, 2FA, and JWT token management for modern applications.',
      tags: ['Node.js', 'JWT', 'OAuth2'],
      tokens: 180,
      githubUrl: 'https://github.com/example/auth-system',
    },
    {
      id: '6',
      title: 'Performance Monitor',
      contributor: 'DevOps Plus',
      description: 'Real-time application performance monitoring with alerts and detailed metrics dashboard.',
      tags: ['Monitoring', 'Node.js', 'WebSocket'],
      tokens: 220,
      githubUrl: 'https://github.com/example/perf-monitor',
    },
  ]

  const handlePurchase = (projectId: string, tokenCost: number) => {
    if (userTokens >= tokenCost) {
      setUserTokens(userTokens - tokenCost)
      setPurchasedProjects([...purchasedProjects, projectId])
    }
  }

  const uniqueTags = Array.from(new Set(projects.flatMap(p => p.tags)))
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.tags.includes(filter))

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
            className="mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-4 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <ShoppingCart size={24} className="text-purple-300" />
                <div>
                  <span className="text-gray-400 text-sm font-open-sans-custom block">Project</span>
                  <h1 className="text-4xl font-bold text-white font-open-sans-custom">Marketplace</h1>
                </div>
              </div>
              <motion.div
                className="flex items-center gap-3 px-4 py-2 rounded-lg bg-purple-500/20 border border-purple-400"
                variants={itemVariants}
              >
                <Zap size={20} className="text-purple-300" />
                <span className="text-lg font-bold text-white font-open-sans-custom">{userTokens}</span>
                <span className="text-xs text-purple-300 font-open-sans-custom">ZorBits</span>
              </motion.div>
            </motion.div>
            <motion.p variants={itemVariants} className="text-gray-300 text-base font-open-sans-custom">
              Browse and purchase projects from the community using your ZorBits
            </motion.p>
          </motion.div>

          {/* Filters */}
          <motion.div
            className="mb-8 flex gap-2 flex-wrap"
            variants={itemVariants}
          >
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-open-sans-custom transition-all ${
                filter === 'all'
                  ? 'bg-purple-500/30 text-purple-300 border border-purple-400'
                  : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10'
              }`}
            >
              All Projects
            </button>
            {uniqueTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className={`px-4 py-2 rounded-lg text-sm font-open-sans-custom transition-all ${
                  filter === tag
                    ? 'bg-purple-500/30 text-purple-300 border border-purple-400'
                    : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10'
                }`}
              >
                {tag}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProjects.map((project) => {
              const isPurchased = purchasedProjects.includes(project.id)
              const canAfford = userTokens >= project.tokens

              return (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md hover:border-white/20 hover:bg-white/10 transition-all duration-300 flex flex-col"
                >
                  {/* Header */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white font-open-sans-custom mb-1">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-400 font-open-sans-custom">
                      by {project.contributor}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-sm font-open-sans-custom mb-4 flex-1">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex gap-2 flex-wrap mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded text-xs bg-white/10 text-gray-300 font-open-sans-custom"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2">
                      <Zap size={18} className="text-purple-300" />
                      <span className="text-lg font-bold text-white font-open-sans-custom">
                        {project.tokens}
                      </span>
                    </div>

                    {isPurchased ? (
                      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/20 text-green-300 border border-green-400 text-sm font-semibold font-open-sans-custom cursor-default">
                        <Check size={16} />
                        Purchased
                      </button>
                    ) : (
                      <button
                        onClick={() => handlePurchase(project.id, project.tokens)}
                        disabled={!canAfford}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold font-open-sans-custom transition-all ${
                          canAfford
                            ? 'bg-purple-500/30 text-purple-300 border border-purple-400 hover:bg-purple-500/40'
                            : 'bg-gray-500/20 text-gray-400 border border-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <ShoppingCart size={16} />
                        Buy
                      </button>
                    )}
                  </div>

                  {/* GitHub Link */}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex items-center gap-2 text-xs text-purple-300 hover:text-purple-200 transition-colors"
                  >
                    <Github size={14} />
                    View on GitHub
                  </a>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </main>
  )
}
