import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"
import { useNavigate, useLocation } from "react-router-dom"

export function FloatingNavbar() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const isDashboard = location.pathname === '/dashboard'

  const scrollToSection = (sectionId: string) => {
    // If on dashboard, navigate to home first
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

          <div className="hidden items-center gap-8 md:flex">
            <button
              onClick={() => scrollToSection("features")}
              className="text-sm font-open-sans-custom text-gray-300 transition-colors hover:text-white [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)]"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("showcase")}
              className="text-sm font-open-sans-custom text-gray-300 transition-colors hover:text-white [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)]"
            >
              Showcase
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-sm font-open-sans-custom text-gray-300 transition-colors hover:text-white [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)]"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm font-open-sans-custom text-gray-300 transition-colors hover:text-white [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)]"
            >
              Contact
            </button>
            <button
              onClick={() => scrollToSection("documentation")}
              className="text-sm font-open-sans-custom text-gray-300 transition-colors hover:text-white [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)]"
            >
              Documentation
            </button>
          </div>

          <Button
            size="sm"
            onClick={handleGetStarted}
            className="bg-white text-black hover:bg-gray-100 [text-shadow:_0_1px_2px_rgb(0_0_0_/_10%)] font-open-sans-custom"
          >
            {user ? 'Dashboard' : 'Start Building'}
          </Button>
        </div>
      </div>
    </nav>
  )
}
