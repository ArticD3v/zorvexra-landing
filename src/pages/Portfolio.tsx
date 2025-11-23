import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { DarkVeil } from '@/components/dark-veil'
import { FloatingNavbar } from '@/components/floating-navbar'
import { motion } from 'framer-motion'
import { Briefcase, Eye, EyeOff, ExternalLink, Check } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

interface Project {
  id: string
  name: string
  description: string
  visible: boolean
}

interface Template {
  id: string
  name: string
  description: string
  preview: string
}

export default function Portfolio() {
  const navigate = useNavigate()
  const { user, loading } = useAuth()
  const [selectedTemplate, setSelectedTemplate] = useState('minimal')
  const [projects, setProjects] = useState<Project[]>([
    { id: '1', name: 'E-Commerce Platform', description: 'Full-featured e-commerce solution', visible: true },
    { id: '2', name: 'Social Media Dashboard', description: 'Analytics dashboard for social metrics', visible: true },
    { id: '3', name: 'Weather App', description: 'Real-time weather application', visible: false },
    { id: '4', name: 'Portfolio Website', description: 'Personal portfolio showcase', visible: true },
  ])
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login')
    }
  }, [user, loading, navigate])

  const templates: Template[] = [
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Clean and simple portfolio layout',
      preview: '◻ Simple list view with project details',
    },
    {
      id: 'grid',
      name: 'Grid Gallery',
      description: 'Project cards in a grid layout',
      preview: '◼◼◼ Projects displayed as cards',
    },
    {
      id: 'showcase',
      name: 'Showcase',
      description: 'Large featured project layout',
      preview: '■ Large project showcase view',
    },
    {
      id: 'timeline',
      name: 'Timeline',
      description: 'Projects displayed as timeline',
      preview: '→ Projects on a timeline',
    },
  ]

  const toggleVisibility = (id: string) => {
    setProjects(projects.map(p => 
      p.id === id ? { ...p, visible: !p.visible } : p
    ))
  }

  const visibleProjects = projects.filter(p => p.visible)
  const portfolioUrl = `${window.location.origin}/u/${user?.email?.split('@')[0]}/portfolio?template=${selectedTemplate}`

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
            <motion.div variants={itemVariants} className="mb-2 flex items-center gap-2">
              <Briefcase size={20} className="text-purple-300" />
              <span className="text-gray-400 text-sm font-open-sans-custom">Showcase</span>
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-5xl font-bold text-white drop-shadow-lg font-open-sans-custom"
            >
              My Portfolio
            </motion.h1>
            <motion.p variants={itemVariants} className="mt-2 text-gray-300 text-base font-open-sans-custom">
              Customize what appears on your public portfolio
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Project Visibility */}
            <motion.div
              className="lg:col-span-2 space-y-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Project Visibility Control */}
              <motion.div
                className="rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-md"
                variants={itemVariants}
              >
                <h2 className="text-2xl font-bold text-white font-open-sans-custom drop-shadow-lg mb-6">
                  Project Visibility
                </h2>
                <p className="text-gray-400 text-sm font-open-sans-custom mb-6">
                  Choose which projects appear on your public portfolio ({visibleProjects.length} visible)
                </p>

                <div className="space-y-3">
                  {projects.map((project) => (
                    <motion.div
                      key={project.id}
                      variants={itemVariants}
                      className="flex items-center justify-between p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-white font-open-sans-custom">{project.name}</h3>
                        <p className="text-sm text-gray-400 font-open-sans-custom">{project.description}</p>
                      </div>
                      <button
                        onClick={() => toggleVisibility(project.id)}
                        className={`p-3 rounded-lg transition-all ${
                          project.visible
                            ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                            : 'bg-white/10 text-gray-400 hover:bg-white/20'
                        }`}
                      >
                        {project.visible ? <Eye size={20} /> : <EyeOff size={20} />}
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Template Selection */}
              <motion.div
                className="rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-md"
                variants={itemVariants}
              >
                <h2 className="text-2xl font-bold text-white font-open-sans-custom drop-shadow-lg mb-6">
                  Choose Template
                </h2>
                <p className="text-gray-400 text-sm font-open-sans-custom mb-6">
                  Select how your portfolio will be displayed
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {templates.map((template) => (
                    <motion.button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        selectedTemplate === template.id
                          ? 'border-purple-400 bg-purple-500/20'
                          : 'border-white/10 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-white font-open-sans-custom">{template.name}</h3>
                        {selectedTemplate === template.id && (
                          <Check size={20} className="text-purple-300" />
                        )}
                      </div>
                      <p className="text-sm text-gray-400 font-open-sans-custom mb-3">{template.description}</p>
                      <p className="text-xs text-gray-500 font-open-sans-custom">{template.preview}</p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column: Actions & Preview */}
            <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
              {/* Public Portfolio Link */}
              <motion.div
                className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
                variants={itemVariants}
              >
                <h3 className="text-lg font-semibold text-white font-open-sans-custom mb-4">Public Portfolio</h3>
                <div className="space-y-3">
                  <div className="rounded-lg bg-white/5 border border-white/10 p-3 break-all">
                    <p className="text-xs text-gray-400 font-open-sans-custom mb-1">Your portfolio URL:</p>
                    <p className="text-xs text-purple-300 font-mono">{portfolioUrl}</p>
                  </div>
                  <Button
                    onClick={() => window.open(portfolioUrl, '_blank')}
                    className="w-full bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 border border-purple-400 font-open-sans-custom flex items-center justify-center gap-2"
                  >
                    <ExternalLink size={16} />
                    View Public Portfolio
                  </Button>
                </div>
              </motion.div>

              {/* Portfolio Preview */}
              <motion.div
                className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
                variants={itemVariants}
              >
                <h3 className="text-lg font-semibold text-white font-open-sans-custom mb-4">Template Preview</h3>
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors font-open-sans-custom text-sm font-semibold"
                >
                  {showPreview ? 'Hide Preview' : 'Show Preview'}
                </button>

                {showPreview && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 p-4 rounded-lg bg-black/30 border border-white/10 min-h-[200px] flex items-center justify-center"
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-2">
                        {selectedTemplate === 'minimal' && '📋'}
                        {selectedTemplate === 'grid' && '🎨'}
                        {selectedTemplate === 'showcase' && '⭐'}
                        {selectedTemplate === 'timeline' && '📈'}
                      </div>
                      <p className="text-gray-300 font-open-sans-custom text-sm">
                        {templates.find(t => t.id === selectedTemplate)?.description}
                      </p>
                      <p className="text-gray-500 font-open-sans-custom text-xs mt-2">
                        with {visibleProjects.length} project{visibleProjects.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Stats */}
              <motion.div
                className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
                variants={itemVariants}
              >
                <h3 className="text-lg font-semibold text-white font-open-sans-custom mb-4">Portfolio Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 font-open-sans-custom text-sm">Total Projects</span>
                    <span className="text-2xl font-bold text-purple-300">{projects.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 font-open-sans-custom text-sm">Visible</span>
                    <span className="text-2xl font-bold text-green-400">{visibleProjects.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 font-open-sans-custom text-sm">Template</span>
                    <span className="text-sm font-semibold text-white capitalize font-open-sans-custom">
                      {templates.find(t => t.id === selectedTemplate)?.name}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}
