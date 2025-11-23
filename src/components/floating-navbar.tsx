import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"
import { useNavigate, useLocation } from "react-router-dom"
import { useState } from "react"
import { LogOut, ChevronDown } from "lucide-react"

export function FloatingNavbar() {
  const { user, signOutUser } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const isDashboard = location.pathname.startsWith('/dashboard')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    if (isDashboard) {
      navigate('/')
      setTimeout(() => {
        const section = document.getElementById(sectionId)
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" })
        }
      }, 100)
    } else {
      const section = document.getElementById(sectionId)
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" })
      }
    }
  }

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard')
    } else {
      navigate('/signup')
    }
  }

  const handleLogout = async () => {
    await signOutUser()
    navigate('/')
    setIsDropdownOpen(false)
  }

  const publicNavItems = [
    { label: 'Features', onClick: () => scrollToSection('features') },
    { label: 'Showcase', onClick: () => scrollToSection('showcase') },
    { label: 'About', onClick: () => scrollToSection('about') },
    { label: 'Contact', onClick: () => scrollToSection('contact') },
    { label: 'Documentation', onClick: () => scrollToSection('documentation') },
  ]

  const dashboardNavItems = [
    { label: 'Overview', onClick: () => navigate('/dashboard') },
    { label: 'My Submissions', onClick: () => navigate('/dashboard/submissions') },
    { label: 'Submit Project', onClick: () => navigate('/dashboard/submit') },
    { label: 'Portfolio', onClick: () => navigate('/dashboard/portfolio') },
    { label: 'Showcase', onClick: () => navigate('/dashboard/showcase') },
  ]

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 px-4 py-4">
      <div className="mx-auto max-w-7xl rounded-2xl border-2 border-white/10 bg-white/5 px-6 py-4 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <button onClick={() => scrollToSection("home")} className="cursor-pointer">
            <div className="flex items-center text-white [text-shadow:_0_2px_8px_rgb(0_0_0_/_40%)]">
              <svg
                fill="currentColor"
                fillRule="evenodd"
                height="2em"
                style={{ flexShrink: 0, lineHeight: 1 }}
                viewBox="0 0 24 24"
                width="2em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>V0</title>
                <path
                  clipRule="evenodd"
                  d="M14.252 8.25h5.624c.088 0 .176.006.26.018l-5.87 5.87a1.889 1.889 0 01-.019-.265V8.25h-2.25v5.623a4.124 4.124 0 004.125 4.125h5.624v-2.25h-5.624c-.09 0-.179-.006-.265-.018l5.874-5.875a1.9 1.9 0 01.02.27v5.623H24v-5.624A4.124 4.124 0 0019.876 6h-5.624v2.25zM0 7.5v.006l7.686 9.788c.924 1.176 2.813.523 2.813-.973V7.5H8.25v6.87L2.856 7.5H0z"
                />
              </svg>
            </div>
          </button>

          {isDashboard ? (
            <div className="hidden items-center gap-8 md:flex">
              {dashboardNavItems.map((item) => (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className="text-sm font-open-sans-custom text-gray-300 transition-colors hover:text-white [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)]"
                >
                  {item.label}
                </button>
              ))}
            </div>
          ) : (
            <div className="hidden items-center gap-8 md:flex">
              {publicNavItems.map((item) => (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className="text-sm font-open-sans-custom text-gray-300 transition-colors hover:text-white [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)]"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}

          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-open-sans-custom text-white hover:bg-white/20 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-xs font-bold">
                  {user.email?.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline max-w-[150px] truncate">{user.email?.split('@')[0]}</span>
                <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm shadow-lg py-2">
                  <div className="px-4 py-2 border-b border-white/10">
                    <p className="text-xs text-gray-400 font-open-sans-custom">Signed in as</p>
                    <p className="text-sm font-semibold text-white font-open-sans-custom truncate">{user.email}</p>
                  </div>
                  {!isDashboard && (
                    <button
                      onClick={() => {
                        navigate('/dashboard')
                        setIsDropdownOpen(false)
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors font-open-sans-custom border-b border-white/10"
                    >
                      Dashboard
                    </button>
                  )}
                  {isDashboard && (
                    <button
                      onClick={() => {
                        navigate('/dashboard/settings')
                        setIsDropdownOpen(false)
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors font-open-sans-custom border-b border-white/10"
                    >
                      Settings
                    </button>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors font-open-sans-custom"
                  >
                    <LogOut size={16} />
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Button
              size="sm"
              onClick={handleGetStarted}
              className="bg-white text-black hover:bg-gray-100 [text-shadow:_0_1px_2px_rgb(0_0_0_/_10%)] font-open-sans-custom"
            >
              Start Building
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
}
