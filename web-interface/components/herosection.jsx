import Link from 'next/link';
import { ChevronDown, Play } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f4f6fc] via-[#f8f9fe] to-white pb-20 pt-4 text-slate-900">
      
      {/* ----------------- NAVBAR ----------------- */}
      <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between rounded-2xl bg-white/80 px-6 backdrop-blur-md shadow-sm border border-slate-100">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-md shadow-blue-500/20">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="8" />
                <path d="M12 2v20M2 12h20" />
              </svg>
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-slate-900">
              routific
            </span>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <div className="flex items-center gap-1 cursor-pointer hover:text-slate-900 transition-colors">
              <span>Features</span>
              <ChevronDown className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:text-slate-900 transition-colors">
              <span>Industries</span>
              <ChevronDown className="h-4 w-4" />
            </div>
            <Link href="/pricing" className="hover:text-slate-900 transition-colors">Pricing</Link>
            <Link href="/about" className="hover:text-slate-900 transition-colors">About</Link>
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-600 cursor-pointer hover:text-slate-900">
              <span>Login</span>
              <ChevronDown className="h-4 w-4" />
            </div>
            <Link href="/demo" className="hidden sm:inline-block text-sm font-semibold text-slate-700 hover:text-slate-900">
              Book a demo
            </Link>
            <Link
              href="/signup"
              className="rounded-xl bg-[#ffb703] px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition-all hover:bg-[#ffaa00] active:scale-95"
            >
              Start free trial
            </Link>
          </div>

        </div>
      </header>

      {/* ----------------- HERO CONTENT ----------------- */}
      <div className="mx-auto max-w-4xl px-4 pt-16 pb-12 text-center sm:px-6 lg:px-8">
        
        {/* Main Heading */}
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          Route optimization software for <br className="hidden sm:inline" />
          <span className="text-slate-900">growing delivery businesses</span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 sm:text-xl">
          Plan optimized routes your drivers actually trust, dispatch in a click, and keep customers updated — all in one place. Cut delivery costs by 25%
        </p>

        {/* Call to Action Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/signup"
            className="w-full sm:w-auto rounded-xl bg-[#ffb703] px-8 py-4 text-base font-bold text-slate-950 shadow-lg shadow-amber-500/25 transition-all hover:bg-[#ffaa00] hover:shadow-amber-500/40 active:scale-95 text-center"
          >
            Start free trial
          </Link>
          
          <Link
            href="/demo"
            className="w-full sm:w-auto rounded-xl border border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-95 text-center"
          >
            Book a demo
          </Link>
        </div>

        {/* Dispatcher View Pill Selector */}
        <div className="mt-12 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1.5 shadow-sm">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm">
            <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
          </span>
          <span className="text-sm font-semibold text-slate-800 pr-2 pl-1">Dispatcher view</span>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer transition-colors">
            <Play className="h-3 w-3 fill-slate-600 ml-0.5" />
          </div>
        </div>

      </div>

    </section>
  );
}