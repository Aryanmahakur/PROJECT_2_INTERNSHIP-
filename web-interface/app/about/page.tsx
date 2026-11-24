'use client';

import React from 'react';
import Link from 'next/link';

export default function AboutPage(): React.ReactElement {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#fbf9fe] text-slate-900 selection:bg-purple-100 selection:text-purple-900">
      {/* Soft ambient pastel glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-36 top-6 h-[30rem] w-[30rem] rounded-full bg-purple-200/35 blur-3xl" />
        <div className="absolute -right-28 top-[28%] h-[28rem] w-[28rem] rounded-full bg-amber-200/35 blur-3xl" />
        <div className="absolute bottom-[-4rem] left-1/3 h-[26rem] w-[26rem] rounded-full bg-indigo-100/45 blur-3xl" />
      </div>

      {/* ================= FLOATING HEADER ================= */}
      <header className="sticky top-4 z-50 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between rounded-full border border-purple-200/60 bg-white/90 px-5 py-3 shadow-sm shadow-purple-950/5 backdrop-blur-xl sm:px-6">
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

          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
            <Link
              href="/capabilities"
              className="transition-colors hover:text-slate-900"
            >
              Capabilities
            </Link>
            <div className="flex cursor-pointer items-center gap-1 transition-colors hover:text-slate-900">
              <span>Sectors</span>
              <svg
                viewBox="0 0 16 16"
                fill="none"
                className="h-4 w-4 text-slate-400"
                aria-hidden="true"
              >
                <path
                  d="M4 6L8 10L12 6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <Link href="/pricing" className="transition-colors hover:text-slate-900">
              Plans
            </Link>
            <Link
              href="/about"
              className="font-semibold text-purple-600 transition-colors"
            >
              About us
            </Link>
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/capabilities"
              className="hidden text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 sm:inline-block"
            >
              Explore Steps
            </Link>
            <Link
              href="/demo"
              className="rounded-full bg-[#ffb703] px-4 py-2 text-sm font-bold text-slate-950 shadow-sm shadow-amber-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ffaa00] sm:px-5"
            >
              Try Live Demo
            </Link>
          </div>
        </div>
      </header>

      {/* ================= EDITORIAL HERO ================= */}
      <section className="mx-auto max-w-3xl px-4 pb-10 pt-14 text-center sm:px-6 sm:pb-14 sm:pt-18">
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-200/80 bg-white/90 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-purple-700 shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
          College Project · About Deliver it
        </div>

        <h1 className="mt-6 text-3xl font-extrabold leading-[1.12] tracking-tight text-slate-900 sm:text-5xl sm:leading-[1.1]">
          Calm, honest arrival times{' '}
          <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500 bg-clip-text text-transparent">
            from kitchen to door
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-slate-600 sm:text-base">
          Created as a college project by{' '}
          <strong className="font-semibold text-slate-800">Aryan Mahakur</strong>,
          Deliver it turns rough delivery guesses into a clear visual experience —
          for nearby spots or restaurants anywhere in the world.
        </p>
      </section>

      {/* ================= QUICK FACTS STRIP ================= */}
      <section className="mx-auto max-w-4xl px-4 pb-12 sm:px-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {[
            { label: 'Focus', value: 'Realistic ETAs' },
            { label: 'Scope', value: 'Local + Global' },
            { label: 'Approach', value: 'Visual first' },
            { label: 'Type', value: 'College project' },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-purple-100/80 bg-white/90 px-4 py-4 text-center shadow-sm shadow-purple-950/[0.02] backdrop-blur-sm"
            >
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                {item.label}
              </p>
              <p className="mt-1 text-sm font-bold text-slate-800 sm:text-[15px]">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CREATOR & GOAL ================= */}
      <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {/* Creator */}
          <article className="group rounded-[28px] border border-purple-100/90 bg-white/95 p-7 shadow-sm shadow-purple-950/[0.03] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-200 hover:shadow-md hover:shadow-purple-950/[0.05] sm:p-8">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1 text-[11px] font-bold tracking-wide text-purple-700 ring-1 ring-purple-100">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
              Behind the Project
            </span>
            <h2 className="mt-4 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
              Built by Aryan Mahakur
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
              Aryan started this college project with one clear goal: make delivery
              time estimates easier to understand and more realistic. Instead of a
              single rough number, the focus is on a calm visual flow that shows how
              long an order actually takes — from prep to door.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
              Every screen is designed to feel approachable, honest, and useful for
              both local testing and global exploration.
            </p>
          </article>

          {/* Goal */}
          <article className="group rounded-[28px] border border-amber-200/70 bg-gradient-to-br from-amber-50/80 via-white/95 to-purple-50/50 p-7 shadow-sm shadow-amber-950/[0.03] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-md hover:shadow-amber-950/[0.05] sm:p-8">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100/90 px-3 py-1 text-[11px] font-bold tracking-wide text-amber-900 ring-1 ring-amber-200/70">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              Our Main Goal
            </span>
            <h2 className="mt-4 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
              Account for the whole journey
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
              A useful estimate must include both road time and kitchen time. Deliver
              it supports quick local examples through{' '}
              <strong className="font-semibold text-slate-800">
                Registered Locations
              </strong>{' '}
              and lets you place{' '}
              <strong className="font-semibold text-slate-800">
                Custom Coordinates
              </strong>{' '}
              so you can predict delivery times for restaurants in any city.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
              The result is a single, readable experience — not just a number, but a
              story of the route.
            </p>
          </article>
        </div>
      </section>

      {/* ================= HOW IT CAME TOGETHER ================= */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[32px] border border-purple-200/70 bg-gradient-to-b from-white via-white to-[#fcfaff] shadow-sm shadow-purple-950/[0.04]">
          <div className="p-7 sm:p-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-bold tracking-wide text-indigo-700 ring-1 ring-indigo-100">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                How We Built It
              </span>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Shaped step by step into a visual experience
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
                The project grew by putting clarity first — combining map routes,
                preparation estimates, and flexible place selection into one calm,
                approachable flow.
              </p>
            </div>

            {/* Steps */}
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
              <div className="relative rounded-2xl border border-purple-100/80 bg-gradient-to-b from-purple-50/40 to-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-purple-200">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-xs font-bold text-white">
                  01
                </div>
                <h3 className="mt-3 text-base font-bold text-slate-900">
                  Start with a real problem
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                  Bridge the gap between driving time and kitchen readiness so
                  estimates feel thoughtful instead of rushed.
                </p>
              </div>

              <div className="relative rounded-2xl border border-indigo-100/80 bg-gradient-to-b from-indigo-50/40 to-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                  02
                </div>
                <h3 className="mt-3 text-base font-bold text-slate-900">
                  Keep it easy to try
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                  Test ready local spots in one click, or drop pins for restaurants
                  in any city worldwide.
                </p>
              </div>

              <div className="relative rounded-2xl border border-amber-200/70 bg-gradient-to-b from-amber-50/50 to-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-300">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-slate-950">
                  03
                </div>
                <h3 className="mt-3 text-base font-bold text-slate-900">
                  Design with calm clarity
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                  Clean spacing, soft color, and clear steps so the idea shines
                  without noise.
                </p>
              </div>
            </div>

            {/* Bottom CTA row */}
            <div className="mt-9 flex flex-col items-start justify-between gap-4 border-t border-purple-100/80 pt-7 sm:flex-row sm:items-center">
              <p className="max-w-md text-sm text-slate-600">
                Want to walk through each step or try the map yourself?
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/capabilities"
                  className="rounded-full border border-purple-200/80 bg-white px-5 py-2.5 text-sm font-bold text-slate-800 transition-colors hover:border-purple-300 hover:bg-purple-50/70"
                >
                  Explore Capabilities
                </Link>
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-2 rounded-full bg-[#ffb703] px-5 py-2.5 text-sm font-bold text-slate-950 shadow-sm shadow-amber-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ffaa00]"
                >
                  <span>Open Live Demo</span>
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    className="h-4 w-4"
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
      </section>

      {/* ================= WHAT YOU CAN DO ================= */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-7 max-w-xl">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            What you can do with it
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
            A simple set of tools to explore realistic delivery timing without
            complexity.
          </p>
        </div>

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
          ].map((card) => (
            <div
              key={card.title}
              className={`rounded-2xl border bg-white/95 p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                card.tone === 'purple'
                  ? 'border-purple-100 hover:border-purple-200'
                  : card.tone === 'indigo'
                    ? 'border-indigo-100 hover:border-indigo-200'
                    : 'border-amber-200/80 hover:border-amber-300'
              }`}
            >
              <div
                className={`mb-3 h-1.5 w-8 rounded-full ${
                  card.tone === 'purple'
                    ? 'bg-purple-500'
                    : card.tone === 'indigo'
                      ? 'bg-indigo-500'
                      : 'bg-amber-400'
                }`}
              />
              <h3 className="text-base font-bold text-slate-900">{card.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CLOSING CTA ================= */}
      <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
        <div className="rounded-[28px] border border-purple-200/70 bg-gradient-to-br from-purple-50/60 via-white to-amber-50/40 px-6 py-10 text-center shadow-sm sm:px-10">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Ready to see it in action?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-600 sm:text-base">
            Open the live demo and explore how calm, honest arrival times look on a
            real map.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 rounded-full bg-[#ffb703] px-6 py-3 text-sm font-bold text-slate-950 shadow-sm shadow-amber-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ffaa00]"
            >
              Try Live Demo
            </Link>
            <Link
              href="/"
              className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-purple-100/80 bg-white/85 py-8 text-center text-xs text-slate-500 backdrop-blur-sm">
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