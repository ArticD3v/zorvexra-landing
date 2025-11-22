import { cn } from "@/lib/utils"
import { GithubIcon } from "lucide-react"
import DotPattern from "@/components/ui/dot-pattern"
import { Button } from "@/components/ui/button"

type Project = {
    title: string
    description: string
    techStack: string[]
    contributor: string
}

const projects: Project[] = [
    {
        title: "Nebula UI Generator",
        description: "Generate UI components using modular prompt-based design.",
        techStack: ["React", "Tailwind", "Framer Motion"],
        contributor: "RiyaDev",
    },
    {
        title: "PrismCode Analyzer",
        description: "Detects code smells and complexity in real time.",
        techStack: ["Node.js", "TypeScript", "AST"],
        contributor: "ArjunX",
    },
    {
        title: "FluxBoard Dashboard",
        description: "Real-time analytics dashboard with modular blocks.",
        techStack: ["Next.js", "Redis", "Chart.js"],
        contributor: "DevAyaan",
    },
    {
        title: "ByteFlow API Engine",
        description: "Fast scalable API framework for microservices.",
        techStack: ["Go", "PostgreSQL", "Docker"],
        contributor: "YashVortex",
    },
    {
        title: "ShadowAuth Secure Login",
        description: "Secure auth with encrypted tokens and MFA.",
        techStack: ["Express", "JWT", "Bcrypt"],
        contributor: "SanaCodes",
    },
    {
        title: "Photon Docs Builder",
        description: "AI-powered documentation generator for GitHub repos.",
        techStack: ["Python", "Markdown", "OpenAI"],
        contributor: "KaranDev",
    },
]

function ProjectCard({ title, description, techStack, contributor }: Project) {
    return (
        <div className="group relative border-2 border-white/10 bg-white/5 backdrop-blur-sm rounded-lg p-6 transition-all duration-300 hover:scale-105 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]">
            <DotPattern width={5} height={5} />

            <div className="relative z-10 flex flex-col h-full">
                {/* Title */}
                <h3 className="text-xl font-bold text-white [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom mb-3">
                    {title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-300 [text-shadow:_0_2px_8px_rgb(0_0_0_/_40%)] font-open-sans-custom mb-4 leading-relaxed">
                    {description}
                </p>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {techStack.map((tech, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 text-xs rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 [text-shadow:_0_1px_4px_rgb(0_0_0_/_40%)] font-open-sans-custom"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Footer with contributor and GitHub icon */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                    <p className="text-xs text-gray-400 [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)] font-open-sans-custom">
                        by <span className="text-white font-medium">{contributor}</span>
                    </p>
                    <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors border border-white/10 hover:border-purple-400/50">
                        <GithubIcon className="h-4 w-4 text-white" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export function ProjectShowcase() {
    return (
        <div className="mx-auto w-full max-w-7xl">
            <div className="space-y-8">
                {/* Project Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} {...project} />
                    ))}
                </div>

                {/* View More Button */}
                <div className="flex justify-center pt-4">
                    <Button
                        className="relative px-8 py-6 text-base font-semibold border-2 border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] text-white [text-shadow:_0_2px_8px_rgb(0_0_0_/_40%)] font-open-sans-custom"
                    >
                        View More Projects
                    </Button>
                </div>
            </div>
        </div>
    )
}
