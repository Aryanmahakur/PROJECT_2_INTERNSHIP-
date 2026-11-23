'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Globe,
  Sparkles,
  Clock,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';

type RevealDirection = 'up' | 'left' | 'right' | 'wide';

function StepScrollReveal({
  children,
  direction = 'up',
  immediate = false,
  className = '',
}: {
  children: ReactNode;
  direction?: RevealDirection;
  immediate?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(immediate);

  useEffect(() => {
    if (immediate) return;
    const el = ref.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.14, rootMargin: '0px 0px -32px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [immediate]);

  const hiddenTransform =
    direction === 'left'
      ? 'translate3d(-56px, 0, 0) scale(0.985)'
      : direction === 'right'
        ? 'translate3d(56px, 0, 0) scale(0.985)'
        : direction === 'wide'
          ? 'translate3d(0, 36px, 0) scale(0.965)'
          : 'translate3d(0, 44px, 0) scale(0.985)';

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0.04,
        transform: visible
          ? 'translate3d(0, 0, 0) scale(1)'
          : hiddenTransform,
        transition:
          'opacity 760ms cubic-bezier(0.16, 1, 0.3, 1), transform 760ms cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
}

export default function CapabilitiesPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#fcfcfd] text-slate-900 selection:bg-purple-100 selection:text-purple-900">
      {/* Soft ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-24 top-16 h-96 w-96 rounded-full bg-purple-200/35 blur-3xl" />
        <div className="absolute -right-24 top-1/3 h-[28rem] w-[28rem] rounded-full bg-amber-200/35 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-indigo-200/25 blur-3xl" />
      </div>

      {/* ================= FLOATING HEADER ================= */}
      <header className="sticky top-4 z-50 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between rounded-full border border-purple-200/60 bg-white/90 px-6 py-3 shadow-sm shadow-purple-950/5 backdrop-blur-xl">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="grid h-7 w-7 grid-cols-2 gap-0.5">
              <div className="rounded-[3px] bg-purple-600" />
              <div className="rounded-[3px] bg-amber-400" />
              <div className="rounded-[3px] bg-purple-500" />
              <div className="rounded-[3px] bg-amber-500" />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-slate-900">
              Deliver it
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <Link href="/capabilities" className="font-semibold text-purple-600">
              Capabilities
            </Link>
            <div className="flex cursor-pointer items-center gap-1 transition-colors hover:text-slate-900">
              <span>Sectors</span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </div>
            <Link href="/pricing" className="transition-colors hover:text-slate-900">
              Plans
            </Link>
            <Link href="/about" className="transition-colors hover:text-slate-900">
              About us
            </Link>
          </nav>

          <div className="flex items-center gap-4 sm:gap-5">
            <Link
              href="/demo"
              className="hidden text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 sm:inline-block"
            >
              Book a demo
            </Link>
            <Link
              href="/demo"
              className="rounded-full bg-[#ffb703] px-5 py-2 text-sm font-bold text-slate-950 shadow-sm shadow-amber-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ffaa00]"
            >
              Try Live Demo
            </Link>
          </div>
        </div>
      </header>

      {/* ================= WIDE INTRO ================= */}
      <section className="mx-auto max-w-5xl px-4 pb-10 pt-12 text-center sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-200/70 bg-white/85 px-4 py-1 text-[11px] font-semibold uppercase tracking-widest text-purple-700 shadow-2xs">
          <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
          Step-by-Step Capabilities
        </div>

        <h1 className="mt-4 text-3xl font-extrabold leading-[1.15] tracking-tight text-slate-900 sm:text-5xl">
          How we estimate delivery time,{' '}
          <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500 bg-clip-text text-transparent">
            step by step
          </span>
        </h1>

        <p className="mx-auto mt-3.5 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
          Start with registered spots or use coordinates for any restaurant anywhere
          in the world—scroll down to move through each step.
        </p>
      </section>

      {/* ================= LARGE HORIZONTAL STEP BANDS ================= */}
      <div className="mx-auto max-w-6xl space-y-8 px-4 pb-24 sm:px-6 lg:px-8">
        {/* STEP 1 — Visible immediately on load */}
        <StepScrollReveal immediate direction="wide">
          <section className="rounded-[32px] border border-slate-200/85 bg-white/95 p-7 shadow-md shadow-purple-950/[0.04] backdrop-blur-sm transition-all duration-300 hover:border-purple-200 sm:p-10">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-2xl space-y-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-600 text-xs font-extrabold text-white shadow-xs">
                    01
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
                    Registered Locations • Instant Start
                  </span>
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                  Pick from ready local spots in seconds
                </h2>
                <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                  Select a registered restaurant and a nearby home from the list to
                  place pins right away and explore everyday routes without typing raw
                  coordinates.
                </p>
              </div>

              <div className="flex shrink-0 items-center justify-between gap-5 rounded-2xl border border-purple-100 bg-purple-50/60 px-6 py-5 lg:min-w-[260px]">
                <div>
                  <div className="text-xs font-bold text-purple-900">
                    Curated Presets
                  </div>
                  <div className="mt-0.5 text-xs text-slate-500">
                    Scroll for Step 02 ↓
                  </div>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-purple-600 shadow-2xs ring-1 ring-purple-100">
                  <MapPin className="h-6 w-6" />
                </div>
              </div>
            </div>
          </section>
        </StepScrollReveal>

        {/* STEP 2 — Scroll reveal from left */}
        <StepScrollReveal direction="left">
          <section className="rounded-[32px] border border-amber-200/90 bg-gradient-to-r from-amber-50/65 via-white to-white p-7 shadow-md shadow-amber-950/[0.04] backdrop-blur-sm transition-all duration-300 hover:border-amber-300 sm:p-10">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-2xl space-y-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ffb703] text-xs font-extrabold text-slate-950 shadow-xs">
                    02
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                    Custom Coordinates • Worldwide Coverage
                  </span>
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                  Predict ETD for any restaurant in the world
                </h2>
                <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                  Switch to{' '}
                  <span className="font-semibold text-slate-800">
                    Custom Coordinates
                  </span>{' '}
                  or drag markers anywhere on the map. Because predictions work from
                  coordinates, you can cover restaurants across any city or country on
                  Earth.
                </p>
              </div>

              <div className="flex shrink-0 items-center justify-between gap-5 rounded-2xl border border-amber-200/80 bg-amber-50/70 px-6 py-5 lg:min-w-[260px]">
                <div>
                  <div className="text-xs font-bold text-amber-950">
                    Any City • Any Pin
                  </div>
                  <div className="mt-0.5 text-xs text-amber-800/80">
                    Scroll for Step 03 ↓
                  </div>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-amber-700 shadow-2xs ring-1 ring-amber-200">
                  <Globe className="h-6 w-6" />
                </div>
              </div>
            </div>
          </section>
        </StepScrollReveal>

        {/* STEP 3 — Scroll reveal from right */}
        <StepScrollReveal direction="right">
          <section className="rounded-[32px] border border-slate-200/85 bg-white/95 p-7 shadow-md shadow-indigo-950/[0.04] backdrop-blur-sm transition-all duration-300 hover:border-indigo-200 sm:p-10">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-2xl space-y-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-xs font-extrabold text-white shadow-xs">
                    03
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                    Travel + Kitchen Prep
                  </span>
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                  We account for both road travel and prep time
                </h2>
                <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                  A true arrival estimate goes beyond driving speed. We map the street
                  path and distance while also estimating kitchen preparation time so
                  every forecast feels grounded.
                </p>
              </div>

              <div className="flex shrink-0 items-center justify-between gap-5 rounded-2xl border border-indigo-100 bg-indigo-50/60 px-6 py-5 lg:min-w-[260px]">
                <div>
                  <div className="text-xs font-bold text-indigo-950">
                    Two-Part Timing
                  </div>
                  <div className="mt-0.5 text-xs text-slate-500">
                    Scroll for Step 04 ↓
                  </div>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-indigo-600 shadow-2xs ring-1 ring-indigo-100">
                  <Sparkles className="h-6 w-6" />
                </div>
              </div>
            </div>
          </section>
        </StepScrollReveal>

        {/* STEP 4 — Scroll reveal upward & wide */}
        <StepScrollReveal direction="wide">
          <section className="rounded-[32px] border border-purple-200/90 bg-gradient-to-r from-purple-50/70 via-white to-amber-50/50 p-7 shadow-md shadow-purple-950/[0.05] backdrop-blur-sm sm:p-10">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-2xl space-y-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-extrabold text-white shadow-xs">
                    04
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
                    Estimated Time to Delivery
                  </span>
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                  One clear ETD on the map
                </h2>
                <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                  View the route line, distance, travel time, prep time, and total
                  estimated delivery time together in one clean summary.
                </p>
              </div>

              <div className="flex shrink-0 flex-col items-start justify-between gap-4 rounded-2xl border border-purple-200/70 bg-white/90 px-6 py-5 lg:min-w-[280px] lg:items-end">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-100/80 text-purple-700">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div className="text-left lg:text-right">
                    <div className="text-xs font-bold text-slate-900">
                      Ready to Test
                    </div>
                    <div className="text-xs text-slate-500">
                      Local or global pins
                    </div>
                  </div>
                </div>

                <Link
                  href="/demo"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#ffb703] px-5 py-2.5 text-sm font-bold text-slate-950 shadow-sm shadow-amber-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ffaa00]"
                >
                  <span>Open Live Demo</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        </StepScrollReveal>
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-slate-200/70 bg-white/80 py-7 text-center text-xs text-slate-500 backdrop-blur-xs">
        <div>&copy; 2026 Deliver it. All rights reserved.</div>
        <div className="mt-1">Reliable routing and dispatch for delivery partners.</div>
      </footer>
    </main>
  );
}