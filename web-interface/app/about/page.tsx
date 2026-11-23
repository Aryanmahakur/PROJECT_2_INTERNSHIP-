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

          <div className="flex items-center gap-4 sm:gap-5">
            <Link
              href="/capabilities"
              className="hidden text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 sm:inline-block"
            >
              Explore Steps
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

      {/* ================= EDITORIAL HERO ================= */}
      <section className="mx-auto max-w-4xl px-4 pb-12 pt-14 text-center sm:px-6 sm:pt-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-200/80 bg-white/90 px-4 py-1 text-[11px] font-semibold uppercase tracking-widest text-purple-700 shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
          College Project • About Deliver it
        </div>

        <h1 className="mt-5 text-3xl font-extrabold leading-[1.13] tracking-tight text-slate-900 sm:text-5xl">
          Calm, honest arrival times{' '}
          <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500 bg-clip-text text-transparent">
            from kitchen to door
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
          Created as a college project by <strong>Aryan Mahakur</strong>, Deliver it
          was made to turn guesswork around delivery timing into a clear, visual
          experience—whether you pick a nearby spot or explore locations for any
          restaurant anywhere in the world.
        </p>
      </section>

      {/* ================= CREATOR & GOALS CARDS ================= */}
      <section className="mx-auto max-w-6xl space-y-6 px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-[30px] border border-purple-100/90 bg-white/95 p-7 shadow-sm shadow-purple-950/[0.03] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-200 hover:shadow-md hover:shadow-purple-950/[0.05] sm:p-9">
            <span className="inline-block rounded-full bg-purple-50 px-3.5 py-1 text-[11px] font-bold tracking-wide text-purple-700 ring-1 ring-purple-100">
              Behind the Project
            </span>
            <h2 className="mt-4 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
              A college project by Aryan Mahakur
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
              <strong>Aryan Mahakur</strong> started this college project with a
              simple goal: make delivery time estimates easier to understand and more
              realistic. Instead of showing just a rough number, the project focuses
              on giving people a calm, visual way to see how long an order actually
              takes.
            </p>
          </div>

          <div className="rounded-[30px] border border-amber-200/80 bg-gradient-to-br from-amber-50/75 via-white/95 to-purple-50/40 p-7 shadow-sm shadow-amber-950/[0.03] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-md hover:shadow-amber-950/[0.05] sm:p-9">
            <span className="inline-block rounded-full bg-amber-100/85 px-3.5 py-1 text-[11px] font-bold tracking-wide text-amber-900 ring-1 ring-amber-200/70">
              Our Main Goal
            </span>
            <h2 className="mt-4 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
              Account for the whole journey, anywhere
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
              A good delivery estimate has to consider both the road trip and the
              time spent getting food ready. Our goal is to support quick local
              examples via <strong>Registered Locations</strong> while letting you use{' '}
              <strong>Custom Coordinates</strong> to predict delivery times for
              restaurants anywhere in the world.
            </p>
          </div>
        </div>

        {/* How It Came Together Band */}
        <div className="rounded-[32px] border border-purple-200/70 bg-gradient-to-b from-white/98 via-white/95 to-[#fcfaff] p-7 shadow-sm shadow-purple-950/[0.04] backdrop-blur-sm sm:p-10">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-indigo-50 px-3.5 py-1 text-[11px] font-bold tracking-wide text-indigo-700 ring-1 ring-indigo-100">
              How We Built It
            </span>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Shaped step by step into a visual experience
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
              The project grew by focusing on clarity first—combining map routes,
              preparation time estimates, and flexible place selection into one
              approachable experience.
            </p>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-purple-100/80 bg-gradient-to-b from-purple-50/35 to-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-purple-200">
              <div className="text-xs font-extrabold uppercase tracking-wider text-purple-700">
                01 • Start With a Real Problem
              </div>
              <h3 className="mt-2 text-base font-bold text-slate-900">
                Clearer Arrival Expectations
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:text-sm">
                Built to bridge the gap between driving time and kitchen readiness so
                estimates feel thoughtful rather than rushed.
              </p>
            </div>

            <div className="rounded-2xl border border-indigo-100/80 bg-gradient-to-b from-indigo-50/35 to-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200">
              <div className="text-xs font-extrabold uppercase tracking-wider text-indigo-700">
                02 • Keep It Easy to Try
              </div>
              <h3 className="mt-2 text-base font-bold text-slate-900">
                Local Spots &amp; Global Pins
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:text-sm">
                Designed so anyone can test ready local spots in a click or place
                pins for restaurants in any city worldwide.
              </p>
            </div>

            <div className="rounded-2xl border border-amber-200/70 bg-gradient-to-b from-amber-50/45 to-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-300">
              <div className="text-xs font-extrabold uppercase tracking-wider text-amber-800">
                03 • Design With Calm Clarity
              </div>
              <h3 className="mt-2 text-base font-bold text-slate-900">
                Step-by-Step Visual Flow
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:text-sm">
                Organized around clean spacing, soft colors, and clear steps so the
                idea shines without overwhelming detail.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-purple-100/80 pt-6 sm:flex-row sm:items-center">
            <p className="text-xs font-medium text-slate-600 sm:text-sm">
              Want to walk through each step or try the map for yourself?
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/capabilities"
                className="rounded-full border border-purple-200/80 bg-white px-5 py-2.5 text-xs font-bold text-slate-800 transition-colors hover:border-purple-300 hover:bg-purple-50/60 sm:text-sm"
              >
                Explore Capabilities
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-full bg-[#ffb703] px-5 py-2.5 text-xs font-bold text-slate-950 shadow-sm shadow-amber-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ffaa00] sm:text-sm"
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
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-purple-100/80 bg-white/85 py-7 text-center text-xs text-slate-500 backdrop-blur-sm">
        <div>
          &copy; 2026 Deliver it • College Project by Aryan Mahakur. All rights
          reserved.
        </div>
        <div className="mt-1">Reliable routing and dispatch for delivery partners.</div>
      </footer>
    </main>
  );
}