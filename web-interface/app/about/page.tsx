'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

function SmoothReveal({
  children,
  delayMs = 0,
  immediate = false,
  className = '',
}: {
  children: React.ReactNode;
  delayMs?: number;
  immediate?: boolean;
  className?: string;
}): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(immediate);

  useEffect(() => {
    if (immediate) {
      const id = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(id);
    }

    const el = ref.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.14, rootMargin: '0px 0px -32px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [immediate]);

  return (
    <div
      ref={ref}
      className={`min-w-0 ${className}`}
      style={{
        opacity: shown ? 1 : 0.04,
        transform: shown
          ? 'translate3d(0, 0, 0) scale(1)'
          : 'translate3d(0, 24px, 0) scale(0.988)',
        transition: `opacity 720ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms, transform 720ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms`,
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
}

export default function AboutPage(): React.ReactElement {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  return (
    <main className="relative min-h-screen w-full overflow-x-clip bg-[#09090b] text-zinc-100 selection:bg-amber-400 selection:text-zinc-950">
      {/* Subtle Top Radial Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(ellipse_75%_50%_at_50%_-10%,rgba(139,92,246,0.22),rgba(245,158,11,0.08),transparent)]"
      />

      {/* ================= NON-STICKY HEADER ================= */}
      <header className="relative z-50 mx-auto w-full max-w-6xl px-3 pt-2 sm:px-6 lg:px-8">
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
            <Link href="/" className="whitespace-nowrap transition-colors duration-300 hover:text-white">
              Home
            </Link>
            <Link href="/capabilities" className="whitespace-nowrap transition-colors duration-300 hover:text-white">
              Capabilities
            </Link>
            <Link href="/sectors" className="whitespace-nowrap transition-colors duration-300 hover:text-white">
              Sectors
            </Link>
            <Link href="/pricing" className="whitespace-nowrap transition-colors duration-300 hover:text-white">
              Plans
            </Link>
            <Link href="/about" className="whitespace-nowrap font-semibold text-white transition-colors duration-300">
              About us
            </Link>
          </nav>

          <div className="relative flex shrink-0 items-center gap-2 sm:gap-4 lg:gap-5">
            <div className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setAccountOpen((prev) => !prev)}
                className="inline-flex cursor-pointer items-center gap-1 whitespace-nowrap text-sm font-medium text-zinc-300 transition-colors duration-300 hover:text-white"
              >
                <span>Account</span>
                <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4 text-zinc-400" aria-hidden="true">
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
              {mobileMenuOpen ? (
                <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden="true">
                  <path
                    d="M4 4L12 12M12 4L4 12"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden="true">
                  <path
                    d="M2.5 4.5H13.5M2.5 8H13.5M2.5 11.5H13.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="mt-2 rounded-3xl border border-white/10 bg-zinc-900/95 p-5 shadow-2xl backdrop-blur-xl transition-all duration-300 md:hidden">
            <div className="flex flex-col space-y-3 text-sm font-medium text-zinc-300">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">
                Home
              </Link>
              <Link href="/capabilities" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">
                Capabilities
              </Link>
              <Link href="/sectors" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">
                Sectors
              </Link>
              <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">
                Plans
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="font-bold text-amber-400"
              >
                About us
              </Link>
              <Link href="/signin" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">
                Account / Sign in
              </Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">
                Contact us
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

      {/* ================= EDITORIAL HERO (NO BOX) ================= */}
      <section className="mx-auto max-w-3xl px-4 pb-8 pt-8 text-center sm:px-6 sm:pb-14 sm:pt-12">
        <SmoothReveal immediate>
          <h1 className="text-3xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl sm:leading-[1.1]">
            Calm, honest arrival times{' '}
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-purple-400 bg-clip-text text-transparent">
              from kitchen to door
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-zinc-400 sm:mt-5 sm:text-base">
            Created as a college project by{' '}
            <strong className="font-semibold text-zinc-200">Aryan Mahakur</strong>,
            Deliver it turns rough delivery guesses into a clear visual experience —
            for nearby spots or restaurants anywhere in the world.
          </p>
        </SmoothReveal>
      </section>

      {/* ================= QUICK FACTS STRIP ================= */}
      <section className="mx-auto max-w-4xl px-3 pb-10 sm:px-6 sm:pb-12">
        <SmoothReveal immediate delayMs={90}>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-4">
            {[
              { label: 'Focus', value: 'Realistic ETAs' },
              { label: 'Scope', value: 'Local + Global' },
              { label: 'Approach', value: 'Visual first' },
              { label: 'Type', value: 'College project' },
            ].map((item) => (
              <div
                key={item.label}
                className="min-w-0 rounded-2xl border border-white/10 bg-zinc-900/80 px-3 py-3.5 text-center shadow-lg transition-all duration-300 ease-out hover:-translate-y-1 hover:border-purple-500/40 sm:px-4 sm:py-4"
              >
                <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                  {item.label}
                </p>
                <p className="mt-1 font-mono text-xs font-bold text-white sm:text-[15px]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </SmoothReveal>
      </section>

      {/* ================= CREATOR & GOAL ================= */}
      <section className="mx-auto max-w-6xl px-3 pb-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 md:gap-6">
          {/* Creator */}
          <SmoothReveal delayMs={0} className="flex">
            <article className="group flex w-full min-w-0 flex-col rounded-[28px] border border-white/10 bg-zinc-900/85 p-5 shadow-xl transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-purple-500/40 hover:shadow-2xl sm:p-8">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-[11px] font-bold tracking-wide text-purple-300">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                Behind the Project
              </span>
              <h2 className="mt-4 text-xl font-extrabold tracking-tight text-white sm:text-2xl">
                Built by Aryan Mahakur
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-[15px]">
                Aryan started this college project with one clear goal: make delivery
                time estimates easier to understand and more realistic. Instead of a
                single rough number, the focus is on a calm visual flow that shows how
                long an order actually takes — from prep to door.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-[15px]">
                Every screen is designed to feel approachable, honest, and useful for
                both local testing and global exploration.
              </p>
            </article>
          </SmoothReveal>

          {/* Goal */}
          <SmoothReveal delayMs={110} className="flex">
            <article className="group flex w-full min-w-0 flex-col rounded-[28px] border border-amber-400/25 bg-gradient-to-br from-purple-950/60 via-zinc-900/95 to-amber-950/35 p-5 shadow-xl transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-amber-400/50 hover:shadow-2xl sm:p-8">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[11px] font-bold tracking-wide text-amber-300">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                Our Main Goal
              </span>
              <h2 className="mt-4 text-xl font-extrabold tracking-tight text-white sm:text-2xl">
                Account for the whole journey
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
                A useful estimate must include both road time and kitchen time. Deliver
                it supports quick local examples through{' '}
                <strong className="font-semibold text-white">
                  Registered Locations
                </strong>{' '}
                and lets you place{' '}
                <strong className="font-semibold text-white">
                  Custom Coordinates
                </strong>{' '}
                so you can predict delivery times for restaurants in any city.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
                The result is a single, readable experience — not just a number, but a
                story of the route.
              </p>
            </article>
          </SmoothReveal>
        </div>
      </section>

      {/* ================= HOW IT CAME TOGETHER ================= */}
      <section className="mx-auto max-w-6xl px-3 pb-14 sm:px-6 sm:pb-16 lg:px-8">
        <SmoothReveal>
          <div className="min-w-0 overflow-hidden rounded-[32px] border border-white/10 bg-zinc-900/80 shadow-2xl transition-all duration-300 hover:border-white/20">
            <div className="p-5 sm:p-10">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-[11px] font-bold tracking-wide text-purple-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  How We Built It
                </span>
                <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                  Shaped step by step into a visual experience
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-zinc-400 sm:text-[15px]">
                  The project grew by putting clarity first — combining map routes,
                  preparation estimates, and flexible place selection into one calm,
                  approachable flow.
                </p>
              </div>

              {/* Steps */}
              <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
                <div className="relative min-w-0 rounded-2xl border border-white/10 bg-zinc-950/75 p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-purple-500/40">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 font-mono text-xs font-bold text-white">
                    01
                  </div>
                  <h3 className="mt-3 text-base font-bold text-white">
                    Start with a real problem
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                    Bridge the gap between driving time and kitchen readiness so
                    estimates feel thoughtful instead of rushed.
                  </p>
                </div>

                <div className="relative min-w-0 rounded-2xl border border-white/10 bg-zinc-950/75 p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-purple-500/40">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/80 font-mono text-xs font-bold text-white">
                    02
                  </div>
                  <h3 className="mt-3 text-base font-bold text-white">
                    Keep it easy to try
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                    Test ready local spots in one click, or drop pins for restaurants
                    in any city worldwide.
                  </p>
                </div>

                <div className="relative min-w-0 rounded-2xl border border-white/10 bg-zinc-950/75 p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-amber-400/40">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-400 font-mono text-xs font-bold text-zinc-950">
                    03
                  </div>
                  <h3 className="mt-3 text-base font-bold text-white">
                    Design with calm clarity
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                    Clean spacing, high contrast, and clear steps so the idea shines
                    without noise.
                  </p>
                </div>
              </div>

              {/* Bottom CTA row */}
              <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:mt-9 sm:flex-row sm:items-center sm:pt-7">
                <p className="max-w-md text-sm text-zinc-400">
                  Want to walk through each step or try the map yourself?
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href="/capabilities"
                    className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-bold text-zinc-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10 hover:text-white"
                  >
                    Explore Capabilities
                  </Link>
                  <Link
                    href="/demo"
                    className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-5 py-2.5 text-sm font-bold text-zinc-950 shadow-lg shadow-amber-500/20 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-amber-300"
                  >
                    <span>Open Live Demo</span>
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      className="h-4 w-4 shrink-0"
                      aria-hidden="true"
                    >
                      <path
                        d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SmoothReveal>
      </section>

      {/* ================= WHAT YOU CAN DO ================= */}
      <section className="mx-auto max-w-6xl px-3 pb-14 sm:px-6 sm:pb-16 lg:px-8">
        <SmoothReveal>
          <div className="mb-7 max-w-xl">
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              What you can do with it
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400 sm:text-base">
              A simple set of tools to explore realistic delivery timing without
              complexity.
            </p>
          </div>
        </SmoothReveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'Registered Locations',
              body: 'Pick from ready local spots and see estimates in a few clicks.',
              tone: 'purple',
            },
            {
              title: 'Custom Coordinates',
              body: 'Drop pins anywhere in the world and model delivery for any restaurant.',
              tone: 'indigo',
            },
            {
              title: 'Visual Route Story',
              body: 'See the path, not just a number — so timing feels grounded and clear.',
              tone: 'amber',
            },
          ].map((card, idx) => (
            <SmoothReveal key={card.title} delayMs={idx * 90} className="flex">
              <div
                className={`w-full min-w-0 rounded-2xl border bg-zinc-900/80 p-5 shadow-xl transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl sm:p-6 ${
                  card.tone === 'purple'
                    ? 'border-white/10 hover:border-purple-500/40'
                    : card.tone === 'indigo'
                      ? 'border-white/10 hover:border-purple-400/40'
                      : 'border-white/10 hover:border-amber-400/40'
                }`}
              >
                <div
                  className={`mb-3 h-1.5 w-8 rounded-full ${
                    card.tone === 'purple'
                      ? 'bg-purple-500'
                      : card.tone === 'indigo'
                        ? 'bg-purple-400'
                        : 'bg-amber-400'
                  }`}
                />
                <h3 className="text-base font-bold text-white">{card.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                  {card.body}
                </p>
              </div>
            </SmoothReveal>
          ))}
        </div>
      </section>

      {/* ================= CLOSING CTA ================= */}
      <section className="mx-auto max-w-4xl px-3 pb-14 sm:px-6 sm:pb-16">
        <SmoothReveal>
          <div className="min-w-0 rounded-[28px] border border-amber-400/25 bg-gradient-to-r from-purple-950/75 via-zinc-900 to-amber-950/45 px-5 py-8 text-center shadow-2xl transition-all duration-300 hover:border-amber-400/40 sm:px-10 sm:py-10">
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Ready to see it in action?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-zinc-300 sm:text-base">
              Open the live demo and explore how calm, honest arrival times look on a
              real map.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-zinc-950 shadow-lg shadow-amber-500/25 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-amber-300"
              >
                Try Live Demo
              </Link>
              <Link
                href="/"
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-zinc-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10 hover:text-white"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </SmoothReveal>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 px-4 py-8 text-center text-xs text-zinc-500">
        <p>
          &copy; 2026 Deliver it · College Project by Aryan Mahakur. All rights
          reserved.
        </p>
        <p className="mt-1.5">
          Reliable routing and dispatch for delivery partners.
        </p>
      </footer>
    </main>
  );
}