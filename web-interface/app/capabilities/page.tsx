'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Globe,
  ArrowRight,
  Utensils,
  Navigation,
  Layers,
  Zap,
  Menu,
  X,
} from 'lucide-react';

type Mode = 'preset' | 'custom';

const PRESET_ROUTES = [
  {
    id: 'r1',
    restaurant: 'Sector 17 Spice Kitchen',
    dropoff: 'Greenwood Heights, Block B',
    distance: '3.2 km',
    prep: 14,
    transit: 11,
    coords: '30.7415° N, 76.7680° E',
  },
  {
    id: 'r2',
    restaurant: 'Urban Tandoor & Grill',
    dropoff: 'Lakeside View Apartments',
    distance: '5.8 km',
    prep: 18,
    transit: 16,
    coords: '30.7190° N, 76.8102° E',
  },
];

const CUSTOM_CITIES = [
  {
    id: 'c1',
    city: 'Tokyo, Japan',
    label: 'Shibuya Ramen Lab → Yoyogi Loft',
    distance: '2.9 km',
    prep: 12,
    transit: 9,
    coords: '35.6595° N, 139.7004° E',
  },
  {
    id: 'c2',
    city: 'London, UK',
    label: 'Soho Artisan Bakery → Kensington Flat',
    distance: '4.6 km',
    prep: 15,
    transit: 17,
    coords: '51.5136° N, 0.1365° W',
  },
];

const PIPELINE_STEPS = [
  {
    step: '01',
    title: 'Pin Selection',
    desc: 'Choose a registered venue or drop custom lat/lng coordinates.',
    from: 'left' as const,
  },
  {
    step: '02',
    title: 'Street Routing',
    desc: 'Fetch real road polyline geometry, distance, and transit time.',
    from: 'right' as const,
  },
  {
    step: '03',
    title: 'Prep Estimation',
    desc: 'Run ML inference to estimate kitchen preparation minutes.',
    from: 'left' as const,
  },
  {
    step: '04',
    title: 'Unified ETD',
    desc: 'Combine prep + transit into one clear map-ready arrival forecast.',
    from: 'right' as const,
  },
];

function SlideFromSide({
  children,
  from = 'left',
  delay = 0,
  className = '',
  immediate = false,
}: {
  children: ReactNode;
  from?: 'left' | 'right';
  delay?: number;
  className?: string;
  immediate?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(immediate);

  useEffect(() => {
    if (immediate) {
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [immediate]);

  const hiddenTranslate =
    from === 'left' ? '-translate-x-8 opacity-0' : 'translate-x-8 opacity-0';

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`min-w-0 transform-gpu transition-all duration-700 ease-out ${
        visible ? 'translate-x-0 opacity-100' : hiddenTranslate
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function CapabilitiesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [mode, setMode] = useState<Mode>('preset');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const activeData =
    mode === 'preset' ? PRESET_ROUTES[selectedIndex] : CUSTOM_CITIES[selectedIndex];
  const totalEtd = activeData.prep + activeData.transit;

  return (
    <div className="relative min-h-screen w-full overflow-x-clip bg-[#09090b] font-sans text-zinc-100 antialiased selection:bg-amber-400 selection:text-zinc-950">
      <style jsx global>{`
        @keyframes metricSwap {
          0% {
            opacity: 0;
            transform: translateY(8px) scale(0.97);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes riderGlide {
          0% {
            left: 6%;
            transform: translateY(-50%) scale(0.95);
          }
          50% {
            transform: translateY(calc(-50% - 3px)) scale(1.04);
          }
          100% {
            left: calc(94% - 14px);
            transform: translateY(-50%) scale(0.95);
          }
        }
        @keyframes pulsePingRing {
          0% {
            transform: scale(0.8);
            opacity: 0.85;
          }
          100% {
            transform: scale(2.1);
            opacity: 0;
          }
        }
        @keyframes barBounce {
          0%, 100% {
            transform: scaleY(0.35);
          }
          50% {
            transform: scaleY(1);
          }
        }
        .animate-metric-swap {
          animation: metricSwap 0.36s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .animate-rider-glide {
          animation: riderGlide 3.4s ease-in-out infinite alternate;
        }
        .animate-ping-ring {
          animation: pulsePingRing 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-bar-1 {
          animation: barBounce 1.1s ease-in-out infinite;
          transform-origin: bottom;
        }
        .animate-bar-2 {
          animation: barBounce 1.1s ease-in-out 0.22s infinite;
          transform-origin: bottom;
        }
        .animate-bar-3 {
          animation: barBounce 1.1s ease-in-out 0.44s infinite;
          transform-origin: bottom;
        }
        .animate-bar-4 {
          animation: barBounce 1.1s ease-in-out 0.66s infinite;
          transform-origin: bottom;
        }
      `}</style>

      <main className="relative min-h-screen w-full">
        {/* Subtle Top Radial Spotlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(ellipse_75%_50%_at_50%_-10%,rgba(139,92,246,0.24),rgba(245,158,11,0.08),transparent)]"
        />

        {/* ================= NON-STICKY HEADER ================= */}
        <header className="relative z-50 mx-auto w-full max-w-6xl px-3 pt-3 sm:px-6 sm:pt-4 lg:px-8">
          <div className="flex items-center justify-between gap-2 rounded-full border border-white/10 bg-[#121215]/90 px-3.5 py-2.5 shadow-2xl backdrop-blur-xl sm:px-6 sm:py-3">
            <Link href="/" className="flex shrink-0 items-center gap-2 sm:gap-2.5">
              <div className="grid h-7 w-7 grid-cols-2 gap-0.5 rounded-md p-0.5">
                <div className="rounded-[3px] bg-purple-500" />
                <div className="rounded-[3px] bg-amber-400" />
                <div className="rounded-[3px] bg-purple-400" />
                <div className="rounded-[3px] bg-amber-500" />
              </div>
              <span className="text-base font-extrabold tracking-tight text-white sm:text-lg">
                Deliver it
              </span>
            </Link>

            <nav className="hidden items-center gap-6 text-sm font-medium text-zinc-400 md:flex lg:gap-8">
              <Link href="/" className="whitespace-nowrap transition-colors hover:text-white">
                Home
              </Link>
              <Link href="/capabilities" className="whitespace-nowrap font-semibold text-white">
                Capabilities
              </Link>
              <Link href="/sectors" className="whitespace-nowrap transition-colors hover:text-white">
                Sectors
              </Link>
              <Link href="/pricing" className="whitespace-nowrap transition-colors hover:text-white">
                Plans
              </Link>
              <Link href="/about" className="whitespace-nowrap transition-colors hover:text-white">
                About us
              </Link>
            </nav>

            <div className="relative flex shrink-0 items-center gap-2 sm:gap-4 lg:gap-5">
              <div className="relative hidden sm:block">
                <button
                  type="button"
                  onClick={() => setAccountOpen((prev) => !prev)}
                  className="inline-flex cursor-pointer items-center gap-1 whitespace-nowrap text-sm font-medium text-zinc-300 transition-colors hover:text-white"
                >
                  <span>Account</span>
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    className="h-4 w-4 text-zinc-400"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 6L8 10L12 6"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {accountOpen && (
                  <div
                    onMouseLeave={() => setAccountOpen(false)}
                    className="absolute right-0 mt-3 w-44 rounded-2xl border border-white/10 bg-zinc-900/95 p-1.5 text-sm shadow-2xl backdrop-blur-xl"
                  >
                    <Link
                      href="/signin"
                      onClick={() => setAccountOpen(false)}
                      className="block rounded-xl px-3 py-2 text-zinc-200 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      Sign in
                    </Link>
                    <Link
                      href="/contact"
                      onClick={() => setAccountOpen(false)}
                      className="block rounded-xl px-3 py-2 text-zinc-200 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      Contact us
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/demo"
                className="whitespace-nowrap rounded-full bg-[#ffb703] px-3.5 py-2 text-xs font-bold text-zinc-950 shadow-lg shadow-amber-500/20 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#ffaa00] sm:px-5 sm:text-sm"
              >
                Try Live Demo
              </Link>

              <button
                type="button"
                aria-label="Toggle Menu"
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen((v) => !v)}
                className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/15 text-zinc-300 transition-colors hover:border-white/30 hover:text-white md:hidden"
              >
                {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="mt-2 rounded-3xl border border-white/10 bg-zinc-900/95 p-5 shadow-2xl backdrop-blur-xl transition-all duration-300 md:hidden">
              <div className="flex flex-col space-y-3 text-sm font-medium text-zinc-300">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">
                  Home
                </Link>
                <Link
                  href="/capabilities"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-bold text-amber-400"
                >
                  Capabilities
                </Link>
                <Link href="/sectors" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">
                  Sectors
                </Link>
                <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">
                  Plans
                </Link>
                <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">
                  About us
                </Link>
                <Link href="/signin" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">
                  Account / Sign in
                </Link>
                <Link
                  href="/demo"
                  onClick={() => setMobileMenuOpen(false)}
                  className="pt-2 font-semibold text-amber-400"
                >
                  Try Live Demo →
                </Link>
              </div>
            </div>
          )}
        </header>

      {/* ================= TOP PAGE HEADING ================= */}
        <section className="mx-auto mt-8 max-w-3xl px-4 pb-4 pt-5 text-center sm:mt-12 sm:px-6 sm:pb-5 sm:pt-6">
          <SlideFromSide from="left" delay={30} immediate>
            <h1 className="text-3xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl">
              How Deliver it{' '}
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-purple-400 bg-clip-text text-transparent">
                calculates arrival times
              </span>
            </h1>
            <p className="mx-auto mt-2.5 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
              Kitchen prep modeling and road routing working together for local spots or
              custom coordinates worldwide.
            </p>
          </SlideFromSide>
        </section>

        {/* ================= HERO + INTERACTIVE PRODUCT SANDBOX ================= */}
        <section className="mx-auto mt-5.5 mb-5 max-w-6xl px-3 pt-2 pb-5 sm:mt-8 sm:mb-6 sm:px-6 sm:pt-3 sm:pb-6 lg:px-8">
          <div className="grid items-start gap-8 sm:gap-10 lg:grid-cols-12 lg:items-stretch">
           {/* Left Copy + Animated Telemetry Strip — slides in from left */}
            <SlideFromSide
              from="left"
              delay={60}
              immediate
              className="flex flex-col lg:col-span-6"
            >
              <div className="mt-1 flex h-full flex-col justify-between gap-5 sm:mt-2">
                <div className="-mt-1 space-y-4 sm:-mt-2 sm:space-y-5">
                  <h2 className="text-2xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl">
                    Precision delivery estimates,{' '}
                    <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-purple-400 bg-clip-text text-transparent">
                      anywhere on Earth.
                    </span>
                  </h2>

                  <p className="text-sm leading-relaxed text-zinc-400 sm:text-base">
                    Test how <strong className="text-zinc-200">Deliver it</strong> fuses
                    machine-learned kitchen prep predictions with live street-network routing—using
                    either pre-registered local spots or any custom coordinates worldwide.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <Link
                      href="/demo"
                      className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-5 py-3 text-sm font-bold text-zinc-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 sm:px-6"
                    >
                      <span>Open Full Map Sandbox</span>
                      <ArrowRight className="h-4 w-4 shrink-0" />
                    </Link>
                    <Link
                      href="/sectors"
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-zinc-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
                    >
                      Explore Sectors
                    </Link>
                  </div>
                </div>

                {/* Animated Live Dispatch & Route Pulse Box */}
                <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-4 shadow-xl">
                  <div className="flex items-center justify-between gap-2 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    <span className="flex items-center gap-2 text-amber-300">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping-ring absolute inline-flex h-full w-full rounded-full bg-amber-400" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-400" />
                      </span>
                      Live Dispatch Pulse
                    </span>

                    <div className="flex h-4 items-end gap-1" aria-hidden="true">
                      <span className="animate-bar-1 h-3.5 w-1 rounded-full bg-purple-400" />
                      <span className="animate-bar-2 h-4 w-1 rounded-full bg-amber-400" />
                      <span className="animate-bar-3 h-3 w-1 rounded-full bg-purple-300" />
                      <span className="animate-bar-4 h-4 w-1 rounded-full bg-amber-300" />
                    </div>
                  </div>

                  {/* Animated Track Between Kitchen & Dropoff */}
                  <div className="relative mt-4 flex h-8 items-center">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-purple-500 ring-4 ring-purple-500/20" />
                    <div className="relative mx-2 h-[2px] flex-1 overflow-visible rounded-full bg-gradient-to-r from-purple-500/60 via-amber-400/50 to-emerald-400/60">
                      <span className="animate-rider-glide absolute top-1/2 flex h-5 w-5 items-center justify-center rounded-full border border-amber-200 bg-amber-400 text-zinc-950 shadow-[0_0_14px_rgba(251,191,36,0.85)]">
                        <Navigation className="h-2.5 w-2.5 rotate-90" />
                      </span>
                    </div>
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20" />
                  </div>

                  <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-zinc-400">
                    <span>Kitchen Prep: {activeData.prep}m</span>
                    <span className="text-amber-300">ETA: {totalEtd}m</span>
                    <span>Dropoff: {activeData.distance}</span>
                  </div>
                </div>
              </div>
            </SlideFromSide>

            {/* Right Interactive Live ETD Console Box — slides in from right */}
            <SlideFromSide
              from="right"
              delay={140}
              immediate
              className="mx-auto flex w-full max-w-xl flex-col lg:col-span-6 lg:max-w-none"
            >
              <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/90 shadow-2xl transition-all duration-300 hover:border-white/20">
                {/* Console Top Mode Switcher */}
                <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-white/10 bg-zinc-950/60 px-3.5 py-3 sm:px-4">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 font-mono text-xs text-zinc-400">
                      etd-engine.preview
                    </span>
                  </div>

                  {/* Mode Toggle */}
                  <div className="inline-flex max-w-full flex-wrap rounded-full border border-white/10 bg-zinc-900 p-1 text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        setMode('preset');
                        setSelectedIndex(0);
                      }}
                      className={`cursor-pointer rounded-full px-3 py-1 font-semibold transition-all duration-300 ${
                        mode === 'preset'
                          ? 'bg-purple-600 text-white shadow-sm'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      Registered Spots
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMode('custom');
                        setSelectedIndex(0);
                      }}
                      className={`cursor-pointer rounded-full px-3 py-1 font-semibold transition-all duration-300 ${
                        mode === 'custom'
                          ? 'bg-amber-400 text-zinc-950 shadow-sm'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      Global Coordinates
                    </button>
                  </div>
                </div>

                {/* Route Selector Pills */}
                <div className="grid grid-cols-1 gap-2 border-b border-white/10 p-3.5 sm:grid-cols-2 sm:p-4">
                  {(mode === 'preset' ? PRESET_ROUTES : CUSTOM_CITIES).map((item, idx) => {
                    const active = selectedIndex === idx;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedIndex(idx)}
                        className={`min-w-0 cursor-pointer rounded-2xl border p-3 text-left transition-all duration-300 ${
                          active
                            ? 'border-amber-400/60 bg-amber-400/10'
                            : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="truncate text-[11px] font-bold uppercase tracking-wider text-amber-400">
                            {mode === 'preset'
                              ? `Preset #0${idx + 1}`
                              : (item as (typeof CUSTOM_CITIES)[0]).city}
                          </span>
                          <span className="shrink-0 font-mono text-[11px] text-zinc-400">
                            {item.distance}
                          </span>
                        </div>
                        <div className="mt-1 truncate text-xs font-semibold text-white">
                          {mode === 'preset'
                            ? `${(item as (typeof PRESET_ROUTES)[0]).restaurant} → ${(item as (typeof PRESET_ROUTES)[0]).dropoff}`
                            : (item as (typeof CUSTOM_CITIES)[0]).label}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Simulated Vector Map + Route Line */}
                <div className="relative h-36 min-h-[144px] w-full flex-1 overflow-hidden bg-zinc-950 px-4 py-3.5 sm:px-5">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        'linear-gradient(to right, #3f3f46 1px, transparent 1px), linear-gradient(to bottom, #3f3f46 1px, transparent 1px)',
                      backgroundSize: '26px 26px',
                    }}
                  />

                  <svg
                    viewBox="0 0 400 100"
                    className="relative mx-auto h-full w-[92%] overflow-visible"
                  >
                    <path
                      d={
                        selectedIndex === 0
                          ? 'M 36 74 Q 150 16, 230 54 T 364 24'
                          : 'M 36 26 Q 140 84, 245 40 T 364 70'
                      }
                      fill="none"
                      stroke="url(#routeGrad)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeDasharray="6 6"
                      className="transition-all duration-500"
                    />
                    <defs>
                      <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#fbbf24" />
                      </linearGradient>
                    </defs>

                    <circle
                      cx="36"
                      cy={selectedIndex === 0 ? '74' : '26'}
                      r="6.5"
                      fill="#a855f7"
                      stroke="#ffffff"
                      strokeWidth="2.2"
                      className="transition-all duration-500"
                    />
                    <circle
                      cx="364"
                      cy={selectedIndex === 0 ? '24' : '70'}
                      r="6.5"
                      fill="#fbbf24"
                      stroke="#ffffff"
                      strokeWidth="2.2"
                      className="transition-all duration-500"
                    />
                  </svg>

                  <div className="absolute bottom-2.5 left-3 max-w-[55%] truncate rounded-lg border border-white/10 bg-zinc-900/90 px-2.5 py-1 font-mono text-[10px] text-zinc-300 sm:left-4">
                    {activeData.coords}
                  </div>
                  <div className="absolute bottom-2.5 right-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-[10px] font-semibold text-emerald-300 sm:right-4">
                    Polyline Active
                  </div>
                </div>

                {/* Live Output Telemetry Strip */}
                <div className="grid grid-cols-2 divide-x divide-y divide-white/10 border-t border-white/10 bg-zinc-900">
                  <div
                    key={`prep-${activeData.id}-${activeData.prep}`}
                    className="animate-metric-swap px-4 py-3 transition-all duration-300 hover:bg-purple-500/[0.06]"
                  >
                    <div className="text-[11px] text-zinc-400">Kitchen Prep</div>
                    <div className="mt-0.5 font-mono text-base font-extrabold text-purple-400 transition-transform duration-300">
                      {activeData.prep} min
                    </div>
                  </div>
                  <div
                    key={`transit-${activeData.id}-${activeData.transit}`}
                    className="animate-metric-swap px-4 py-3 transition-all duration-300 hover:bg-indigo-500/[0.06]"
                  >
                    <div className="text-[11px] text-zinc-400">Road Transit</div>
                    <div className="mt-0.5 font-mono text-base font-extrabold text-indigo-400 transition-transform duration-300">
                      {activeData.transit} min
                    </div>
                  </div>
                  <div
                    key={`dist-${activeData.id}-${activeData.distance}`}
                    className="animate-metric-swap px-4 py-3 transition-all duration-300 hover:bg-white/[0.03]"
                  >
                    <div className="text-[11px] text-zinc-400">Distance</div>
                    <div className="mt-0.5 font-mono text-base font-extrabold text-zinc-200">
                      {activeData.distance}
                    </div>
                  </div>
                  <div
                    key={`etd-${activeData.id}-${totalEtd}`}
                    className="animate-metric-swap bg-amber-400/10 px-4 py-3 transition-all duration-300 hover:bg-amber-400/15"
                  >
                    <div className="text-[11px] font-semibold text-amber-300">
                      Total ETD
                    </div>
                    <div className="mt-0.5 font-mono text-lg font-black text-amber-400">
                      {totalEtd} min
                    </div>
                  </div>
                </div>
              </div>
            </SlideFromSide>
          </div>
        </section>

        {/* ================= BENTO GRID OF CORE CAPABILITIES ================= */}
        <section
          id="architecture"
          className="mx-auto max-w-6xl px-3 py-12 sm:px-6 sm:py-16 lg:px-8"
        >
          <SlideFromSide
            from="left"
            className="mb-8 flex flex-col justify-between gap-4 sm:mb-10 md:flex-row md:items-end"
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                Platform Capabilities
              </span>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
                Everything built into the prediction engine
              </h2>
            </div>
            <p className="max-w-md text-sm text-zinc-400">
              Designed to eliminate guesswork between order placement, kitchen dispatch,
              and doorstep arrival.
            </p>
          </SlideFromSide>

          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-6">
            {/* Card 1 — Left */}
            <SlideFromSide from="left" delay={40} className="md:col-span-3">
              <div className="flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-zinc-900/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/40 sm:p-7">
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-500/15 text-purple-400">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-white">
                    Instant Registered Presets
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    Launch immediate route simulations using pre-indexed local restaurants
                    and residential drop-off complexes without entering raw latitude or
                    longitude values.
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2 text-xs">
                  <Link
                    href="/demo"
                    className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-zinc-300 transition-colors hover:border-purple-400/40 hover:text-white"
                  >
                    1-Click Restaurant Selection
                  </Link>
                  <Link
                    href="/sectors"
                    className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-zinc-300 transition-colors hover:border-purple-400/40 hover:text-white"
                  >
                    Verified Drop-off Zones
                  </Link>
                </div>
              </div>
            </SlideFromSide>

            {/* Card 2 — Right */}
            <SlideFromSide from="right" delay={100} className="md:col-span-3">
              <div className="flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-zinc-900/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/40 sm:p-7">
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-400/15 text-amber-400">
                    <Globe className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-white">
                    Worldwide Custom Coordinates
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    Switch to Custom Coordinate mode or drag pins anywhere on the map.
                    Because inference runs on pure geospatial coordinates, you can evaluate
                    deliveries in any city globally.
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2 text-xs">
                  <Link
                    href="/demo"
                    className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-zinc-300 transition-colors hover:border-amber-400/40 hover:text-white"
                  >
                    Draggable Map Markers
                  </Link>
                  <Link
                    href="/demo"
                    className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-zinc-300 transition-colors hover:border-amber-400/40 hover:text-white"
                  >
                    Global Street Graph
                  </Link>
                </div>
              </div>
            </SlideFromSide>

            {/* Card 3 — Left */}
            <SlideFromSide from="left" delay={140} className="md:col-span-2">
              <div className="h-full rounded-3xl border border-white/10 bg-zinc-900/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/40 sm:p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-400">
                  <Utensils className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-white">
                  ML Kitchen Prep Modeling
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  Predicts food preparation duration independently from road speed so
                  complex orders never produce unrealistic arrival promises.
                </p>
              </div>
            </SlideFromSide>

            {/* Card 4 — Left */}
            <SlideFromSide from="left" delay={180} className="md:col-span-2">
              <div className="h-full rounded-3xl border border-white/10 bg-zinc-900/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 sm:p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400">
                  <Navigation className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-white">
                  Turn-by-Turn Street Geometry
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  Computes true road distance and renders the exact driving polyline
                  between pickup and customer doorstep—never straight-line guesses.
                </p>
              </div>
            </SlideFromSide>

            {/* Card 5 — Right */}
            <SlideFromSide from="right" delay={220} className="md:col-span-2">
              <div className="h-full rounded-3xl border border-white/10 bg-zinc-900/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/40 sm:p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-400/15 text-amber-400">
                  <Layers className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-white">
                  Unified ETD Breakdown
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  Presents prep time, travel duration, distance, and final ETD side by
                  side for transparent dispatch and customer communication.
                </p>
              </div>
            </SlideFromSide>
          </div>
        </section>

        {/* ================= COMPACT 4-STAGE EXECUTION PIPELINE ================= */}
        <section className="mx-auto max-w-6xl px-3 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-12 lg:px-8">
          <SlideFromSide from="left" delay={60}>
            <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-5 transition-all duration-300 hover:border-white/20 sm:p-10">
              <div className="mb-8 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-white sm:text-2xl">
                    How every ETD request is processed
                  </h2>
                  <p className="mt-1 text-sm text-zinc-400">
                    Four sequential stages from pin placement to final arrival window.
                  </p>
                </div>
                <Zap className="hidden h-6 w-6 shrink-0 text-amber-400 sm:block" />
              </div>

              <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
                {PIPELINE_STEPS.map((item, i) => (
                  <SlideFromSide key={item.step} from={item.from} delay={i * 80}>
                    <div className="h-full rounded-2xl border border-white/10 bg-zinc-950/70 p-5">
                      <span className="font-mono text-xs font-extrabold text-amber-400">
                        STEP {item.step}
                      </span>
                      <h3 className="mt-2 text-base font-bold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-zinc-400 sm:text-sm">
                        {item.desc}
                      </p>
                    </div>
                  </SlideFromSide>
                ))}
              </div>
            </div>
          </SlideFromSide>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 px-4 py-7 text-center text-xs text-zinc-500">
        <div>&copy; 2026 Deliver it. All rights reserved.</div>
        <div className="mt-1">Reliable routing and dispatch for delivery partners.</div>
      </footer>
    </div>
  );
}