import DotPattern from "@/components/ui/dot-pattern"

export function DocumentationContent() {
    return (
        <div className="mx-auto mb-10 max-w-7xl px-6 md:mb-20 xl:px-0">
            <div className="relative flex flex-col items-center border-2 border-white/20 rounded-lg backdrop-blur-sm bg-white/5">
                <DotPattern width={5} height={5} />

                <div className="absolute -left-1.5 -top-1.5 h-3 w-3 bg-white/80" />
                <div className="absolute -bottom-1.5 -left-1.5 h-3 w-3 bg-white/80" />
                <div className="absolute -right-1.5 -top-1.5 h-3 w-3 bg-white/80" />
                <div className="absolute -bottom-1.5 -right-1.5 h-3 w-3 bg-white/80" />

                <div className="relative z-20 mx-auto max-w-5xl rounded-[40px] py-6 md:p-10 xl:py-20">
                    <div className="space-y-8 md:space-y-10">
                        {/* Introduction */}
                        <div className="space-y-4">
                            <p className="text-base md:text-lg lg:text-xl text-white/90 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom leading-relaxed">
                                Your complete guide to understanding how the platform works, what's expected from contributors, and how your projects move through the ecosystem.
                            </p>
                        </div>

                        {/* Section 1: Introduction */}
                        <div className="space-y-3">
                            <h2 className="text-2xl md:text-3xl font-bold text-white [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom">
                                1. Introduction
                            </h2>
                            <p className="text-base md:text-lg text-white/90 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom leading-relaxed">
                                Zorvexra.xod3 is a developer-focused ecosystem built around weekly contributions, structured project review, and transparent recognition.
                                Every project you submit becomes part of a shared organizational codebase, helping you grow your portfolio while contributing to the community.
                            </p>
                        </div>

                        {/* Section 2: Getting Started */}
                        <div className="space-y-4">
                            <h2 className="text-2xl md:text-3xl font-bold text-white [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom">
                                2. Getting Started
                            </h2>

                            <div className="space-y-3 pl-4">
                                <h3 className="text-xl md:text-2xl font-semibold text-white/95 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom">
                                    2.1 Create Your Account
                                </h3>
                                <ul className="space-y-2 list-disc list-inside text-base md:text-lg text-white/90 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom">
                                    <li>Register using your email</li>
                                    <li>Accept the Contributor License Agreement (required)</li>
                                    <li>Connect your GitHub account</li>
                                </ul>
                            </div>

                            <div className="space-y-3 pl-4">
                                <h3 className="text-xl md:text-2xl font-semibold text-white/95 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom">
                                    2.2 Complete Onboarding
                                </h3>
                                <ul className="space-y-2 list-disc list-inside text-base md:text-lg text-white/90 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom">
                                    <li>Set your username and profile details</li>
                                    <li>Review the contribution rules</li>
                                    <li>Visit your Dashboard to begin submitting</li>
                                </ul>
                            </div>
                        </div>

                        {/* Section 3: Contribution Guidelines */}
                        <div className="space-y-4">
                            <h2 className="text-2xl md:text-3xl font-bold text-white [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom">
                                3. Contribution Guidelines
                            </h2>
                            <p className="text-base md:text-lg text-white/90 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom leading-relaxed">
                                These rules keep the ecosystem fair and consistent:
                            </p>

                            <div className="space-y-3 pl-4">
                                <h3 className="text-xl md:text-2xl font-semibold text-white/95 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom">
                                    3.1 Submission Requirements
                                </h3>
                                <ul className="space-y-2 list-disc list-inside text-base md:text-lg text-white/90 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom">
                                    <li>You must submit one project per week</li>
                                    <li>The project must be stored in a public GitHub repository</li>
                                    <li>You must be the original owner of the code</li>
                                    <li>Your repo must include:
                                        <ul className="ml-6 mt-2 space-y-1 list-circle">
                                            <li>README</li>
                                            <li>Working code</li>
                                            <li>Clear structure</li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>

                            <div className="space-y-3 pl-4">
                                <h3 className="text-xl md:text-2xl font-semibold text-white/95 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom">
                                    3.2 Late Submissions
                                </h3>
                                <ul className="space-y-2 list-disc list-inside text-base md:text-lg text-white/90 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom">
                                    <li>Submitted within 7 days → 1 ZorBit</li>
                                    <li>Submitted after 7 days → 0.5 ZorBit</li>
                                </ul>
                            </div>

                            <div className="space-y-3 pl-4">
                                <h3 className="text-xl md:text-2xl font-semibold text-white/95 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom">
                                    3.3 Repeated Low-Quality Submissions
                                </h3>
                                <p className="text-base md:text-lg text-white/90 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom">
                                    Will result in reduced tokens, review delays, or account removal.
                                </p>
                            </div>
                        </div>

                        {/* Section 4: License Agreement */}
                        <div className="space-y-4">
                            <h2 className="text-2xl md:text-3xl font-bold text-white [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom">
                                4. License Agreement
                            </h2>
                            <p className="text-base md:text-lg text-white/90 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom leading-relaxed">
                                Every contributor must accept the CLA before using the platform.
                            </p>

                            <div className="space-y-3 pl-4">
                                <h3 className="text-xl md:text-2xl font-semibold text-white/95 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom">
                                    Key Points
                                </h3>
                                <ul className="space-y-2 list-disc list-inside text-base md:text-lg text-white/90 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom">
                                    <li>All approved projects become part of the Zorvexra organizational codebase</li>
                                    <li>Zorvexra receives a non-exclusive, irrevocable license to use, modify, and distribute your code</li>
                                    <li>You keep authorship credit, but not exclusive commercial rights</li>
                                </ul>
                            </div>

                            <div className="space-y-3 pl-4">
                                <h3 className="text-xl md:text-2xl font-semibold text-white/95 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom">
                                    Do NOT submit:
                                </h3>
                                <ul className="space-y-2 list-disc list-inside text-base md:text-lg text-white/90 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom">
                                    <li>proprietary code</li>
                                    <li>client work</li>
                                    <li>copied or AI-generated code you don't understand</li>
                                </ul>
                                <p className="text-base md:text-lg text-red-400 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom font-semibold">
                                    Violations result in permanent removal.
                                </p>
                            </div>
                        </div>

                        {/* Section 5: Submission Workflow */}
                        <div className="space-y-4">
                            <h2 className="text-2xl md:text-3xl font-bold text-white [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom">
                                5. Submission Workflow
                            </h2>

                            <div className="space-y-3 pl-4">
                                <h3 className="text-xl md:text-2xl font-semibold text-white/95 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom">
                                    5.1 Step-by-Step
                                </h3>
                                <ol className="space-y-2 list-decimal list-inside text-base md:text-lg text-white/90 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom">
                                    <li>User submits GitHub repo link</li>
                                    <li>System validates repo via GitHub API</li>
                                    <li>Submission enters Pending Review state</li>
                                    <li>Admin tests and evaluates the project</li>
                                    <li>Result:
                                        <ul className="ml-6 mt-2 space-y-1 list-disc">
                                            <li>Approved → added to Showcase + portfolio</li>
                                            <li>Rejected → feedback provided</li>
                                        </ul>
                                    </li>
                                    <li>Tokens awarded automatically</li>
                                </ol>
                            </div>

                            <div className="space-y-3 pl-4">
                                <h3 className="text-xl md:text-2xl font-semibold text-white/95 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom">
                                    5.2 What Admins Check
                                </h3>
                                <ul className="space-y-2 list-disc list-inside text-base md:text-lg text-white/90 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom">
                                    <li>Code quality</li>
                                    <li>Project completeness</li>
                                    <li>Functionality</li>
                                    <li>Security concerns</li>
                                    <li>Ownership legitimacy</li>
                                </ul>
                            </div>
                        </div>

                        {/* Section 6: Tokens (ZorBits) */}
                        <div className="space-y-4">
                            <h2 className="text-2xl md:text-3xl font-bold text-white [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom">
                                6. Tokens (ZorBits)
                            </h2>
                            <p className="text-base md:text-lg text-white/90 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom leading-relaxed">
                                ZorBits are internal recognition units awarded for each approved project.
                            </p>

                            <div className="space-y-3 pl-4">
                                <h3 className="text-xl md:text-2xl font-semibold text-white/95 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom">
                                    Rules
                                </h3>
                                <ul className="space-y-2 list-disc list-inside text-base md:text-lg text-white/90 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom">
                                    <li>On-time submission: +1 ZB</li>
                                    <li>Late submission: +0.5 ZB</li>
                                    <li>Tokens may unlock future perks (marketplace, privileges, levels, badges)</li>
                                </ul>
                            </div>
                        </div>

                        {/* Section 7: Project Showcase */}
                        <div className="space-y-4">
                            <h2 className="text-2xl md:text-3xl font-bold text-white [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom">
                                7. Project Showcase
                            </h2>
                            <p className="text-base md:text-lg text-white/90 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom leading-relaxed">
                                Approved submissions appear publicly with:
                            </p>
                            <ul className="space-y-2 list-disc list-inside text-base md:text-lg text-white/90 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom pl-4">
                                <li>Title</li>
                                <li>Description</li>
                                <li>GitHub link</li>
                                <li>Contributor details</li>
                                <li>Approval date</li>
                            </ul>
                            <p className="text-base md:text-lg text-white/90 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom leading-relaxed">
                                This helps contributors build visibility and credibility.
                            </p>
                        </div>

                        {/* Section 8: Contributor Portfolio */}
                        <div className="space-y-4">
                            <h2 className="text-2xl md:text-3xl font-bold text-white [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom">
                                8. Contributor Portfolio
                            </h2>
                            <p className="text-base md:text-lg text-white/90 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom leading-relaxed">
                                Each user gets an auto-generated public portfolio that displays:
                            </p>
                            <ul className="space-y-2 list-disc list-inside text-base md:text-lg text-white/90 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom pl-4">
                                <li>All approved projects</li>
                                <li>Token stats</li>
                                <li>Contributor activity</li>
                                <li>Future: purchased/used projects</li>
                            </ul>
                            <p className="text-base md:text-lg text-white/90 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom leading-relaxed">
                                This acts as proof of work under the Zorvexra ecosystem.
                            </p>
                        </div>

                        {/* Section 9: Platform Policies */}
                        <div className="space-y-4">
                            <h2 className="text-2xl md:text-3xl font-bold text-white [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom">
                                9. Platform Policies
                            </h2>

                            <div className="space-y-3 pl-4">
                                <h3 className="text-xl md:text-2xl font-semibold text-white/95 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom">
                                    9.1 Required Conduct
                                </h3>
                                <ul className="space-y-2 list-disc list-inside text-base md:text-lg text-white/90 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom">
                                    <li>Maintain originality</li>
                                    <li>Follow weekly contribution rules</li>
                                    <li>Avoid spam or non-functional submissions</li>
                                </ul>
                            </div>

                            <div className="space-y-3 pl-4">
                                <h3 className="text-xl md:text-2xl font-semibold text-white/95 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom">
                                    9.2 Enforcement
                                </h3>
                                <ul className="space-y-2 list-disc list-inside text-base md:text-lg text-white/90 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom">
                                    <li>Repeated violations → temp suspension</li>
                                    <li>Severe violations → permanent ban</li>
                                </ul>
                            </div>
                        </div>

                        {/* Section 10: Security Measures */}
                        <div className="space-y-4">
                            <h2 className="text-2xl md:text-3xl font-bold text-white [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom">
                                10. Security Measures
                            </h2>
                            <ul className="space-y-2 list-disc list-inside text-base md:text-lg text-white/90 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom pl-4">
                                <li>Enforced HTTPS</li>
                                <li>Sanitized inputs</li>
                                <li>Password hashing with bcrypt</li>
                                <li>Admin audit logging</li>
                                <li>Repo validation to prevent malicious URLs</li>
                            </ul>
                        </div>

                        {/* Section 11: Roadmap Overview */}
                        <div className="space-y-4">
                            <h2 className="text-2xl md:text-3xl font-bold text-white [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom">
                                11. Roadmap Overview
                            </h2>
                            <p className="text-base md:text-lg text-white/90 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom leading-relaxed">
                                Upcoming enhancements include:
                            </p>
                            <ul className="space-y-2 list-disc list-inside text-base md:text-lg text-white/90 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom pl-4">
                                <li>Automated sandbox testing</li>
                                <li>Peer review system</li>
                                <li>Achievement badges</li>
                                <li>Internal project marketplace</li>
                                <li>AI-powered code review</li>
                                <li>Contributor leveling system</li>
                            </ul>
                        </div>

                        {/* Section 12: Support */}
                        <div className="space-y-4">
                            <h2 className="text-2xl md:text-3xl font-bold text-white [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom">
                                12. Support
                            </h2>
                            <p className="text-base md:text-lg text-white/90 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom leading-relaxed">
                                Need help?
                            </p>
                            <ul className="space-y-2 list-none text-base md:text-lg text-white/90 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom pl-4">
                                <li>→ Contact admin on your dashboard</li>
                                <li>→ Use the community channels (coming soon)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
