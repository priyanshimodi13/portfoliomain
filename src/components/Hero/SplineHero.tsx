'use client'

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
 
export function SplineSceneBasic() {
  return (
    <Card className="w-full h-full md:h-screen bg-black/[0.96] relative overflow-hidden rounded-none border-none">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      
      <div className="flex flex-col md:flex-row h-full">
        {/* Left content */}
        <div className="flex-1 p-8 md:p-12 relative z-50 flex flex-col justify-center">
          <h1 className="text-5xl md:text-8xl font-bold text-white leading-tight tracking-tight">
            Priyanshi Modi
          </h1>
          <p className="mt-4 text-cyan-400 text-2xl md:text-3xl font-semibold tracking-wider uppercase">
            Web Developer
          </p>
          <p className="mt-6 text-neutral-400 text-lg md:text-xl max-w-xl font-light leading-relaxed">
            Crafting beautiful, high-performance web experiences and intelligent solutions with a dedication to visual and technical excellence.
          </p>
        </div>

        {/* Right content */}
        <div className="flex-1 relative min-h-[400px] md:min-h-full">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </Card>
  )
}
