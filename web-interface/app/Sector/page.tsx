'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type SectorSlide = {
  id: string;
  label: string;
  title: string;
  summary: string;
  points: string[];
  image: string;
  imageAlt: string;
  href: string;
};

const SECTOR_SLIDES: SectorSlide[] = [
  {
    id: 'food-beverage',
    label: 'Food & beverage',
    title: 'Hot meals, calmer rushes',
    summary:
      'Group nearby orders cleanly so food arrives fresh on tight delivery windows.',
    points: [
      'Cut unnecessary miles and overlap',
      'Keep time windows and fresh drops on track',
      'Simple guidance for every partner',
    ],
    image: '/images/6ae10840a5fcc3022b03341e_food-delivery-hero.webp',
    imageAlt: 'Food and beverage delivery dispatch',
    href: '/industries/food-beverage',
  },
  {
    id: 'grocery',
    label: 'Grocery',
    title: 'Heavy loads, smooth slots',
    summary:
      'Sequence scheduled grocery drops with less backtracking from store to doorstep.',
    points: [
      'Handle dense stop counts cleanly',
      'Respect customer drop windows',
      'Clear next-stop flow for partners',
    ],
    image: '/images/6ae10841c96ff8c92157e7af_grocery-delivery-hero.webp',
    imageAlt: 'Grocery delivery order planning',
    href: '/industries/grocery',
  },
  {
    id: 'farms',
    label: 'Farms',
    title: 'Wide loops, less fuel waste',
    summary:
      'Connect harvest boxes and recurring farm shares along efficient rural corridors.',
    points: [
      'Reduce long-haul detour miles',
      'Group recurring share drops together',
      'Protect harvest freshness on the road',
    ],
    image: '/images/6ae10fe68599fd226e05bde9_farm-delivery-hero-mirrored.webp',
    imageAlt: 'Farm harvest route delivery',
    href: '/industries/farms',
  },
  {
    id: 'florists',
    label: 'Florists',
    title: 'Careful stops, peak ready',
    summary:
      'Order delicate bouquets smoothly through same-day rushes and busy holidays.',
    points: [
      'Smarter sequence for fragile items',
      'Built for peak seasonal spikes',
      'Clear delivery timing and proof',
    ],
    image: '/images/6ae108400835c9097b031f0d_flower-delivery-hero.webp',
    imageAlt: 'Florist same-day delivery',
    href: '/industries/florists',
  },
  {
    id: 'couriers',
    label: 'Couriers',
    title: 'Clear zones, steady pace',
    summary:
      'Keep multi-client parcel runs organized across city blocks without overlapping paths.',
    points: [
      'Separate partner corridors clearly',
      'Scale daily parcel stops smoothly',
      'Live step-by-step route clarity',
    ],
    image: '/images/6ac6bc707385f726f30391c8_rt-industries-industry-courier.jpg',
    imageAlt: 'Courier parcel route dispatch',
    href: '/industries/couriers',
  },
];

export default function SectorsPage(): React.ReactElement {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const current = SECTOR_SLIDES[activeIndex];

  const handlePrev = () => {
    setDirection('left');
    setActiveIndex((prev) =>
      prev === 0 ? SECTOR_SLIDES.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setDirection('right');
    setActiveIndex((prev) =>
      prev === SECTOR_SLIDES.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#fbf9fe] text-slate-900 selection:bg-purple-100 selection:text-purple-900">
      <style>{`
        @keyframes sectorFadeFromRight {
          0% {
            opacity: 0;
            transform: translate3d(24px, 0, 0) scale(0.99);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }
        @keyframes sectorFadeFromLeft {
          0% {
            opacity: 0;
            transform: translate3d(-24px, 0, 0) scale(0.99);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }
        .sector-slide-right {
          animation: sectorFadeFromRight 460ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .sector-slide-left {
          animation: sectorFadeFromLeft 460ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}</style>

      {/* Soft ambient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-36 top-6 h-[30rem] w-[30rem] rounded-full bg-purple-200/35 blur-3xl" />
        <div className="absolute -right-28 top-[28%] h-[28rem] w-[28rem] rounded-full bg-amber-200/35 blur-3xl" />
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
            <Link
              href="/sectors"
              className="font-semibold text-purple-600 transition-colors"
            >
              Sectors
            </Link>
            <Link href="/pricing" className="transition-colors hover:text-slate-900">
              Plans
            </Link>
            <Link href="/about" className="transition-colors hover:text-slate-900">
              About us
            </Link>
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/about"
              className="hidden text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 sm:inline-block"
            >
              About
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

      {/* ================= BRIEF HERO ================= */}
      <section className="mx-auto max-w-3xl px-4 pb-8 pt-12 text-center sm:px-6 sm:pt-14">
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-200/80 bg-white/90 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-purple-700 shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
          Delivery Sectors
        </div>

        <h1 className="mt-5 text-3xl font-extrabold leading-[1.12] tracking-tight text-slate-900 sm:text-5xl">
          One route engine for{' '}
          <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500 bg-clip-text text-transparent">
            every local run
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
          Use the arrows outside the card to switch sectors smoothly.
        </p>
      </section>

      {/* ================= SINGLE LARGE SECTION WITH OUTSIDE ARROWS ================= */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-16">
        <div className="relative">
          {/* Left Arrow Outside Box */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous sector"
            className="absolute -left-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-purple-200/80 bg-white text-slate-800 shadow-md transition-all duration-200 hover:scale-105 hover:border-purple-400 hover:text-purple-700 active:scale-95 sm:-left-5 lg:-left-14 lg:h-12 lg:w-12"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Right Arrow Outside Box */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next sector"
            className="absolute -right-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-purple-200/80 bg-white text-slate-800 shadow-md transition-all duration-200 hover:scale-105 hover:border-purple-400 hover:text-purple-700 active:scale-95 sm:-right-5 lg:-right-14 lg:h-12 lg:w-12"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="overflow-hidden rounded-[32px] border border-purple-200/80 bg-white/95 shadow-md shadow-purple-950/[0.04]">
            <div
              key={current.id}
              className={`grid grid-cols-1 items-center lg:grid-cols-12 ${
                direction === 'right'
                  ? 'sector-slide-right'
                  : 'sector-slide-left'
              }`}
            >
              {/* Large Image */}
              <div className="p-4 sm:p-6 lg:col-span-7">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-900">
                  <img
                    src={current.image}
                    alt={current.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>

              {/* Brief Content */}
              <div className="flex flex-col justify-center p-6 sm:p-8 lg:col-span-5">
                <span className="inline-flex w-fit rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-purple-700 ring-1 ring-purple-200/70">
                  {current.label}
                </span>

                <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                  {current.title}
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
                  {current.summary}
                </p>

                <ul className="mt-5 space-y-2.5 text-sm font-medium text-slate-700">
                  {current.points.map((point) => (
                    <li key={point} className="flex items-center gap-2.5">
                      <span className="h-2 w-2 shrink-0 rounded-full bg-purple-600" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Link
                    href={current.href}
                    className="rounded-full bg-[#ffb703] px-5 py-2.5 text-sm font-bold text-slate-950 shadow-xs transition-all hover:bg-[#ffaa00]"
                  >
                    Explore sector
                  </Link>
                  <Link
                    href="/demo"
                    className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    Try Live Demo
                  </Link>
                </div>
              </div>
            </div>
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