"use client";

import RotatingText from "@/components/ui/RotatingText";
import { ShinyButton } from "@/components/ui/shiny-button";
import { cn } from "@/lib/utils";

export function ZorvexraHeading() {
  return (
    <div className="text-center px-0 leading-5">
      <h1 className="mb-8 text-balance text-5xl tracking-tight text-white [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)] md:text-6xl lg:text-8xl flex items-center justify-center">
        <span className="font-open-sans-custom not-italic">zorvexra</span>
        <div
          className={cn(
            "relative ml-4 inline-flex h-24 w-56 items-center justify-center overflow-hidden rounded-xl border border-white/25 bg-white/15 p-4 font-bold text-white shadow-lg",
            "backdrop-blur-md"
          )}
          style={{
            backdropFilter: "blur(16px)",
          }}
        >
          <RotatingText
            texts={[".developer", ".portfolio", ".projects"]}
            splitBy="words"
            mainClassName="text-xl"
          />
        </div>
      </h1>
      <p className="mb-8 mx-auto max-w-2xl text-pretty leading-relaxed text-gray-300 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-thin font-open-sans-custom tracking-wide leading-7 text-xl">
        whether you are a designer, a developer, or just curious, take an
        idea, <span className="font-serif italic">prompt</span> it, and
        watch it come alive
      </p>
      <div className="flex justify-center">
        <ShinyButton className="px-8 py-3 text-base">
          start building
        </ShinyButton>
      </div>
    </div>
  );
}
