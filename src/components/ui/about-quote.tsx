import DotPattern from "@/components/ui/dot-pattern"

export function AboutQuote() {
  return (
    <div className="mx-auto mb-10 max-w-7xl px-6 md:mb-20 xl:px-0">
      <div className="relative flex flex-col items-center border-2 border-white/20 rounded-lg backdrop-blur-sm bg-white/5">
        <DotPattern width={5} height={5} />

        <div className="absolute -left-1.5 -top-1.5 h-3 w-3 bg-white/80" />
        <div className="absolute -bottom-1.5 -left-1.5 h-3 w-3 bg-white/80" />
        <div className="absolute -right-1.5 -top-1.5 h-3 w-3 bg-white/80" />
        <div className="absolute -bottom-1.5 -right-1.5 h-3 w-3 bg-white/80" />

        <div className="relative z-20 mx-auto max-w-5xl rounded-[40px] py-6 md:p-10 xl:py-20">
          <div className="space-y-4 md:space-y-6">
            <p className="text-base md:text-lg lg:text-lg xl:text-2lg text-white/90 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom leading-relaxed">
              Zorvexra.xod3 is a developer-driven ecosystem built to push creators toward consistent growth through weekly project contributions, structured review, and transparent recognition. Our vision is to create a space where every idea, commit, and project becomes part of a larger organizational codebase that evolves continuously through collaboration. The platform’s mission focuses on simplifying how developers build, submit, and showcase their work while maintaining a high-quality internal repository that fuels learning, reuse, and innovation.            </p>
            <p className="text-base md:text-lg lg:text-lg xl:text-2lg text-white/90 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom leading-relaxed">
              Zorvexra was founded by <span className="font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Musharraf Gouri</span> and <span className="font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Syed Bahauddin</span>, two classmates who met in college and discovered a shared passion for development, automation, and building meaningful systems. What began as a casual idea while hanging out quickly evolved into a full-scale vision—one that both founders committed their time, energy, and skills to bring to life. With strong expertise in frontend engineering, React, backend architectures, and automation workflows, Musharraf and Bahauddin built Zorvexra as a long-term ecosystem rather than just another project.            </p>
            <p className="text-base md:text-lg lg:text-lg xl:text-2lg text-white/90 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom leading-relaxed">
              Today, contributors submit projects weekly, and admins ensure originality and quality through systematic review. This forms a disciplined workflow that rewards consistency with ZorBits and automatically builds each member’s public portfolio. Behind the platform is a focused structure of founders, reviewers, contributors, and design teams working together to maintain a clean, future-ready environment. Zorvexra stands for consistency, growth, and transparent collaboration—aiming to evolve into a full innovation layer with automated testing, token-based tools, AI-assisted reviews, and advanced analytics. It’s more than a platform; it’s the outcome of two founders’ shared dream and a development culture built for creators who want to build, contribute, and evolve.            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
