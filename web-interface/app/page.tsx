'use client';

import Link from 'next/link';
import { Sparkles, Play, MapPin, SlidersHorizontal, CheckCircle2, ArrowRight, Check, ShieldAlert, ChevronDown } from 'lucide-react';

export default function Home() {
  const driverVideoSrc = ""; 
  const dispatcherVideoSrc = ""; 
  const trackerVideoSrc = "";

  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-900 pb-20">
      
      {/* ================= FLOATING HEADER / NAVBAR (Subtle Purple Tint) ================= */}
      <header className="sticky top-4 z-50 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between rounded-full bg-white/95 px-6 py-3.5 shadow-xl shadow-purple-900/5 backdrop-blur-md border border-purple-200/50">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="grid grid-cols-2 gap-0.5 w-7 h-7">
              <div className="bg-purple-600 rounded-sm"></div>
              <div className="bg-amber-400 rounded-sm"></div>
              <div className="bg-purple-500 rounded-sm"></div>
              <div className="bg-amber-500 rounded-sm"></div>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">routific</span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-700">
            <div className="flex items-center gap-1 hover:text-purple-600 cursor-pointer transition-colors">
              <span>Features</span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </div>
            <div className="flex items-center gap-1 hover:text-purple-600 cursor-pointer transition-colors">
              <span>Industries</span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </div>
            <Link href="/pricing" className="hover:text-purple-600 transition-colors">Pricing</Link>
            <Link href="/about" className="hover:text-purple-600 transition-colors">About</Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-5">
            <div className="hidden lg:flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-purple-600 cursor-pointer transition-colors">
              <span>Login</span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </div>
            <Link href="/demo" className="hidden sm:inline-block text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors">
              Book a demo
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-[#ffb703] px-5 py-2.5 text-sm font-bold text-slate-950 shadow-md shadow-amber-500/20 transition-all hover:bg-[#ffaa00] hover:scale-[1.02] active:scale-95"
            >
              Start free trial
            </Link>
          </div>

        </div>
      </header>

      {/* ================= HERO SECTION ================= */}
      <section className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-16 text-center sm:px-6 lg:px-8">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-purple-50/50 px-4 py-1.5 border border-purple-100 mb-6 shadow-xs">
          <Sparkles className="h-4 w-4 text-amber-500" />
          <span className="text-xs font-semibold tracking-wide text-purple-900 uppercase">Next-Gen Route AI</span>
        </div>

        {/* Main Heading (2 Rows) */}
        <h1 className="mx-auto max-w-5xl text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.2]">
          <span>Route optimization software for </span>
          <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500 bg-clip-text text-transparent">
            growing delivery businesses
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 sm:text-xl font-normal">
          Plan optimized routes your drivers actually trust, dispatch in a click, and keep customers updated — all in one place. Cut delivery costs by 25%
        </p>

        {/* Call to Action Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/signup"
            className="w-full sm:w-auto rounded-xl bg-[#ffb703] px-8 py-4 text-base font-bold text-slate-950 shadow-xl shadow-amber-500/20 transition-all hover:bg-[#ffaa00] hover:scale-[1.02] active:scale-95 text-center"
          >
            Start free trial
          </Link>
          
          <Link
            href="/demo"
            className="w-full sm:w-auto rounded-xl border border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-700 transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-95 text-center shadow-xs"
          >
            Book a demo
          </Link>
        </div>

        {/* Staggered Row Layout */}
        <div className="mt-16 flex flex-col lg:flex-row items-center justify-center gap-4 max-w-4xl mx-auto">
          
          <div className="flex-1 w-full lg:w-auto flex items-center justify-between rounded-2xl bg-white p-4 border border-slate-200/80 shadow-[0_4px_20px_0_rgba(0,0,0,0.05)] hover:border-slate-300 transition-all cursor-pointer group">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 border border-purple-100 text-purple-600">
                <span className="h-3 w-3 rounded-full bg-purple-600 animate-pulse" />
              </span>
              <div className="text-left">
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Active Workspace</p>
                <p className="text-base font-bold text-slate-900 group-hover:text-purple-600 transition-colors">Dispatcher view</p>
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 group-hover:bg-[#ffb703] group-hover:text-slate-950 transition-all shadow-xs">
              <Play className="h-4 w-4 fill-current ml-0.5" />
            </div>
          </div>

          <div className="w-full lg:w-auto flex items-center gap-3 rounded-2xl bg-white px-5 py-4 border border-slate-200/80 shadow-[0_4px_20px_0_rgba(0,0,0,0.05)] hover:border-slate-300 transition-all cursor-pointer">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <MapPin className="h-4 w-4" />
            </span>
            <div className="text-left">
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Region</p>
              <p className="text-sm font-bold text-slate-800">Live Fleet Map</p>
            </div>
          </div>

          <div className="w-full lg:w-auto flex items-center gap-3 rounded-2xl bg-white px-5 py-4 border border-slate-200/80 shadow-[0_4px_20px_0_rgba(0,0,0,0.05)] hover:border-slate-300 transition-all cursor-pointer">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <SlidersHorizontal className="h-4 w-4" />
            </span>
            <div className="text-left">
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Settings</p>
              <p className="text-sm font-bold text-slate-800">Auto-Batching</p>
            </div>
          </div>

        </div>

      </section>

      {/* ================= WHITE GLASS SHOWCASE SECTION (Apps & Dashboard) ================= */}
      <section className="relative mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-b from-white via-purple-50/20 to-slate-50/80 p-6 sm:p-10 shadow-2xl overflow-hidden border border-slate-200/80 backdrop-blur-xl">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3 rounded-full bg-white px-4 py-2 border border-slate-200 text-slate-800 shadow-md">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-white">
                <span className="h-2 w-2 rounded-full bg-white animate-ping" />
              </span>
              <span className="text-sm font-semibold">Driver app</span>
              <span className="rounded-full bg-purple-50 px-2 py-0.5 text-[10px] font-bold text-purple-600 uppercase">iOS / Android</span>
            </div>

            <div className="text-xs text-slate-500 italic font-medium">
              - Video integration ready (Add your video source links below)
            </div>

            <div className="flex items-center gap-3 rounded-full bg-white px-4 py-2 border border-slate-200 text-slate-800 shadow-md">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-slate-950">
                <span className="h-2 w-2 rounded-full bg-slate-950 animate-ping" />
              </span>
              <span className="text-sm font-semibold">Delivery tracker</span>
              <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700 uppercase">Live link</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left iPhone Mockup */}
            <div className="lg:col-span-3 bg-slate-900 rounded-[44px] p-3.5 border-4 border-slate-800 shadow-2xl relative">
              <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-28 h-5 bg-black rounded-full z-20 flex items-center justify-end px-2.5">
                <div className="w-2.5 h-2.5 bg-purple-500/80 rounded-full animate-pulse" />
              </div>
              
              <div className="mt-5 bg-white rounded-[32px] p-3.5 text-slate-900 text-xs space-y-3 border border-slate-100 shadow-inner">
                <div className="flex justify-between items-center text-[10px] text-slate-400 px-1 pt-1">
                  <span className="font-semibold text-slate-700">9:41</span>
                  <span>5G 🔋</span>
                </div>
                <div className="bg-purple-50 border border-purple-100 rounded-2xl p-3">
                  <p className="font-bold text-purple-700">Route #1 Active</p>
                  <p className="text-[11px] text-slate-600 mt-1">📍 8 W 47th St, New York</p>
                  <div className="mt-3 flex items-center justify-between text-[10px]">
                    <span className="text-slate-500 font-medium">ETA: 10:15 AM</span>
                    <span className="rounded-lg bg-purple-600 px-2.5 py-1 font-bold text-white shadow-xs">Turn-by-turn</span>
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 h-36 flex items-center justify-center group shadow-sm">
                  {driverVideoSrc && (
                    <video className="absolute inset-0 w-full h-full object-cover opacity-80" autoPlay muted loop playsInline src={driverVideoSrc} />
                  )}
                  <div className="absolute inset-0 bg-slate-900/30 flex flex-col items-center justify-center p-2 text-center">
                    <div className="h-8 w-8 rounded-full bg-white/90 shadow-md flex items-center justify-center text-purple-600 mb-1">
                      <Play className="h-4 w-4 fill-current ml-0.5" />
                    </div>
                    <span className="text-[10px] font-semibold text-white drop-shadow-md">Driver App Video</span>
                  </div>
                </div>

                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 rounded-xl transition-colors shadow-md">
                  View details
                </button>
              </div>
            </div>

            {/* Center Dashboard */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-200 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 px-3 py-1.5 bg-slate-100 rounded-xl">Routes</span>
                  <span className="text-slate-500 font-medium">📅 Wed, Nov 18</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <span className="bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">⏱️ Timeline</span>
                  <span className="bg-purple-600 text-white px-3 py-1.5 rounded-xl font-bold shadow-md">Plan routes</span>
                </div>
              </div>

              <div className="relative mt-4 h-56 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 flex items-center justify-center group shadow-inner">
                {dispatcherVideoSrc && (
                  <video className="absolute inset-0 w-full h-full object-cover opacity-75" autoPlay muted loop playsInline src={dispatcherVideoSrc} />
                )}
                <div className="absolute inset-0 bg-slate-950/30 flex items-center justify-center pointer-events-none">
                  <div className="text-center p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white shadow-xl">
                    <div className="h-10 w-10 mx-auto rounded-full bg-amber-500 flex items-center justify-center text-slate-950 mb-2 shadow-md">
                      <Play className="h-5 w-5 fill-current ml-0.5" />
                    </div>
                    <p className="text-sm font-bold text-slate-900">Dispatcher Dashboard Video</p>
                    <p className="text-xs text-slate-500 mt-0.5">Placeholder link ready for your video asset</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2 text-xs">
                <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-slate-700">
                  <span className="font-bold text-purple-600">● Route 1</span>
                  <span className="font-medium">Drivers: 1</span>
                  <span className="font-medium">Stops: 32</span>
                  <span className="font-medium">68 km</span>
                  <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">On Track</span>
                </div>
              </div>
            </div>

            {/* Right iPhone Mockup */}
            <div className="lg:col-span-3 bg-slate-900 rounded-[44px] p-3.5 border-4 border-slate-800 shadow-2xl relative">
              <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-28 h-5 bg-black rounded-full z-20 flex items-center justify-end px-2.5">
                <div className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-pulse" />
              </div>

              <div className="mt-5 bg-white rounded-[32px] p-3.5 text-slate-900 text-xs space-y-3 border border-slate-100 shadow-inner">
                <div className="flex justify-between items-center text-[10px] text-slate-400 px-1 pt-1">
                  <span className="font-semibold text-slate-700">9:41</span>
                  <span>Wi-Fi 📶</span>
                </div>
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-3">
                  <p className="font-bold text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4" /> Successfully delivered
                  </p>
                  <p className="text-[10px] text-slate-600 mt-1">Nov 18 at 3:45 PM • Left at front door</p>
                </div>

                <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 h-28 flex items-center justify-center group shadow-sm">
                  {trackerVideoSrc && (
                    <video className="absolute inset-0 w-full h-full object-cover opacity-80" autoPlay muted loop playsInline src={trackerVideoSrc} />
                  )}
                  <div className="absolute inset-0 bg-slate-900/30 flex flex-col items-center justify-center p-2 text-center">
                    <div className="h-7 w-7 rounded-full bg-white/90 shadow-md flex items-center justify-center text-amber-600 mb-1">
                      <Play className="h-3 w-3 fill-current ml-0.5" />
                    </div>
                    <span className="text-[10px] font-semibold text-white drop-shadow-md">Tracker Video</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Proof of delivery</p>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-slate-700">
                    <span className="font-medium">Signature verified ✓</span>
                    <span className="text-emerald-600 font-bold">Passed</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ================= CLEAN WHITE AESTHETIC ROUTE COMPARISON WITH ANIMATED PATHS ================= */}
      <section className="relative mx-auto max-w-7xl px-4 pb-32 pt-8 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Tired of spaghetti routes?
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            The best routes are the ones drivers respect. That means clean routes built for the real world: no doubling back, and no crossing into a colleague&apos;s territory.
          </p>
          <div className="mt-6">
            <Link
              href="/smart-optimization"
              className="inline-flex items-center gap-2 text-sm font-bold text-purple-600 hover:text-purple-700 transition-colors"
            >
              <span>Discover smart route optimization</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Split Comparison Graphic Container (Clean White Modern Look) */}
        <div className="relative rounded-3xl bg-white p-6 sm:p-10 shadow-2xl overflow-hidden border border-slate-200">
          
          <div className="relative rounded-2xl overflow-hidden bg-slate-50/50 border border-slate-200/80 shadow-xl h-[480px] sm:h-[540px] grid grid-cols-1 md:grid-cols-2">
            
            {/* Custom CSS for Smooth Flowing Animated Lines */}
            <style jsx>{`
              @keyframes drawPath {
                0% { stroke-dashoffset: 300; }
                50% { stroke-dashoffset: 0; }
                100% { stroke-dashoffset: -300; }
              }
              @keyframes chaosPulse {
                0%, 100% { opacity: 0.6; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.02); }
              }
              .animated-clean-path {
                stroke-dasharray: 200;
                animation: drawPath 6s linear infinite;
              }
              .animated-chaos-path {
                stroke-dasharray: 150;
                animation: chaosPulse 3s ease-in-out infinite;
              }
            `}</style>

            {/* LEFT SIDE: Routific (Clean Single Smooth Path - White Aesthetic with Purple Accents) */}
            <div className="relative p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200/60 bg-gradient-to-br from-purple-50/30 via-white to-white">
              
              <div className="flex items-center justify-between z-10">
                <span className="inline-flex items-center gap-1.5 bg-purple-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-sm">
                  <Check className="h-3.5 w-3.5" /> Routific (1 Best Path)
                </span>
                <span className="text-xs text-purple-700 font-bold bg-purple-50 px-3 py-1 rounded-full border border-purple-100">Zero overlap</span>
              </div>

              {/* Animated Clean Route SVG */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <svg className="w-full h-full p-8" viewBox="0 0 400 300" fill="none">
                  {/* Grid background dots for modern map vibe */}
                  <pattern id="dot-grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.5" fill="#cbd5e1" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#dot-grid)" opacity="0.6" />

                  {/* Smooth, flowing main route line */}
                  <path 
                    d="M60 220 Q 120 100, 200 160 T 340 90" 
                    stroke="#9333ea" 
                    strokeWidth="5" 
                    strokeLinecap="round" 
                    className="animated-clean-path"
                  />
                  
                  {/* Secondary clean branch */}
                  <path 
                    d="M100 240 Q 160 180, 240 220 T 320 170" 
                    stroke="#d8b4fe" 
                    strokeWidth="4" 
                    strokeLinecap="round" 
                  />

                  {/* Elegant Stop Nodes with Pulsing Glow */}
                  <circle cx="60" cy="220" r="7" fill="#9333ea" />
                  <circle cx="200" cy="160" r="9" fill="#9333ea" stroke="#fff" strokeWidth="3" className="animate-pulse" />
                  <circle cx="340" cy="90" r="9" fill="#9333ea" stroke="#fff" strokeWidth="3" />
                  
                  <circle cx="100" cy="240" r="6" fill="#a855f7" />
                  <circle cx="320" cy="170" r="7" fill="#c084fc" stroke="#fff" strokeWidth="2" />
                </svg>
              </div>

              <div className="z-10 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 shadow-lg">
                <h3 className="text-sm font-bold text-slate-900 mb-1">Single Dedicated Corridor</h3>
                <p className="text-xs text-slate-600">Drivers follow one efficient, sequential trajectory without backtracking.</p>
              </div>

            </div>

            {/* RIGHT SIDE: Competitor (Spaghetti Chaos - Muted Red/Rose Light Aesthetic) */}
            <div className="relative p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-rose-50/40 via-white to-white">
              
              <div className="flex items-center justify-between z-10">
                <span className="inline-flex items-center gap-1.5 bg-rose-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-sm">
                  <ShieldAlert className="h-3.5 w-3.5" /> Competitor (Spaghetti Chaos)
                </span>
                <span className="text-xs text-rose-600 font-bold bg-rose-50 px-3 py-1 rounded-full border border-rose-100">Criss-crossing</span>
              </div>

              {/* Animated Spaghetti Chaos SVG */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <svg className="w-full h-full p-8" viewBox="0 0 400 300" fill="none">
                  <rect width="100%" height="100%" fill="url(#dot-grid)" opacity="0.6" />

                  {/* Messy intersecting paths */}
                  <path 
                    d="M50 50 Q 200 280, 350 40 T 80 260 T 320 120" 
                    stroke="#e11d48" 
                    strokeWidth="3.5" 
                    strokeLinecap="round" 
                    className="animated-chaos-path"
                  />
                  <path 
                    d="M70 240 Q 260 40, 330 240 T 60 90 T 240 220" 
                    stroke="#fb7185" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                  />
                  <path 
                    d="M40 180 Q 180 60, 260 240 T 150 40" 
                    stroke="#fda4af" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                  />

                  {/* Cluttered overlapping nodes */}
                  <circle cx="200" cy="150" r="8" fill="#e11d48" stroke="#fff" strokeWidth="2" className="animate-ping" />
                  <circle cx="260" cy="240" r="7" fill="#fb7185" />
                  <circle cx="100" cy="100" r="7" fill="#f43f5e" />
                </svg>
              </div>

              <div className="z-10 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 shadow-lg">
                <h3 className="text-sm font-bold text-slate-900 mb-1">Overlapping Territory</h3>
                <p className="text-xs text-slate-600">Multiple drivers cross paths repeatedly, increasing fuel burn and confusion.</p>
              </div>

            </div>

            {/* Central Divider Badge Handle */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:flex h-12 w-12 rounded-full bg-slate-900 text-white shadow-2xl items-center justify-center border-4 border-white z-30 font-extrabold text-xs tracking-wider">
              VS
            </div>

          </div>

        </div>

      </section>

    </main>
  );
}