import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center px-4 overflow-hidden bg-zinc-950 text-zinc-100">
      
      {/* Background glow effects matching reference style */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
        
        {/* Subtle pill badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-400 text-xs font-semibold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next-Gen Resource Allocation Engine</span>
        </div>

        {/* Big Hero Text */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-none">
          Relay <br />
          <span className="bg-linear-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent">
            Run For Resources
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-zinc-400 font-normal">
          Empowering workflows, synchronizing data,allocating resources and connecting you with the tools you need—effortlessly.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/register"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 group"
          >
            Get Started Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/resources"
            className="w-full sm:w-auto px-8 py-4 rounded-xl border border-zinc-800 hover:bg-zinc-900 text-zinc-200 font-medium transition-all"
          >
            Explore Resources
          </Link>
        </div>

      </div>
    </div>
  );
}