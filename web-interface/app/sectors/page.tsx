'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Check,
  Clock,
  Route,
  ShieldCheck,
  Menu,
  X,
} from 'lucide-react';

type SectorDetail = {
  title: string;
  description: string;
};

type SectorSlide = {
  id: string;
  label: string;
  title: string;
  summary: string;
  points: string[];
  image: string;
  imageAlt: string;
  imagePosition?: string;
  href: string;
  details: [SectorDetail, SectorDetail, SectorDetail];
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
    imagePosition: 'object-[50%_18%]',
    href: '/demo',
    details: [
      {
        title: 'Kitchen-to-curb timing',
        description:
          'Matches rider arrival with kitchen prep completion so hot meals do not sit waiting on the counter.',
      },
      {
        title: 'Lunch & dinner rush control',
        description:
          'Spreads order volume across nearby riders instead of sending multiple drivers down the same street.',
      },
      {
        title: 'Clear customer ETAs',
        description:
          'Combines prep duration and road travel time into a realistic arrival window.',
      },
    ],
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
    imagePosition: 'object-[50%_18%]',
    href: '/demo',
    details: [
      {
        title: 'Multi-bag stop order',
        description:
          'Arranges neighborhood drops in sequence so heavier bags go out without doubling back.',
      },
      {
        title: 'Delivery slot tracking',
        description:
          'Keeps scheduled time slots on track while holding total route distance down.',
      },
      {
        title: 'Chilled item transit time',
        description:
          'Keeps cold and frozen grocery runs within sensible road durations from pickup to door.',
      },
    ],
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
    imagePosition: 'object-[50%_18%]',
    href: '/demo',
    details: [
      {
        title: 'Rural & suburban loops',
        description:
          'Connects spread-out drop addresses into continuous loops that cut extra fuel use.',
      },
      {
        title: 'Weekly share schedules',
        description:
          'Groups repeat farm boxes by area so weekly drop days stay consistent.',
      },
      {
        title: 'Direct harvest handoffs',
        description:
          'Keeps road time short so produce and dairy reach customers in good shape.',
      },
    ],
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
    imagePosition: 'object-[50%_18%]',
    href: '/demo',
    details: [
      {
        title: 'Holiday order spikes',
        description:
          'Handles busy seasonal days without sorting stops by hand on a map.',
      },
      {
        title: 'Steady road pacing',
        description:
          'Cuts extra turns and back-and-forth loops for delicate arrangements.',
      },
      {
        title: 'Timed recipient drops',
        description:
          'Puts time-sensitive deliveries and morning drop-offs ahead of standard stops.',
      },
    ],
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
    imagePosition: 'object-[50%_18%]',
    href: '/demo',
    details: [
      {
        title: 'Separate city zones',
        description:
          'Splits city blocks across drivers so routes do not cross over each other.',
      },
      {
        title: 'Afternoon pickups',
        description:
          'Fits same-day pickups into active routes without throwing off later stops.',
      },
      {
        title: 'Stop-by-stop sequence',
        description:
          'Gives drivers a clear order of stops with steady arrival times.',
      },
    ],
  },
];

const DETAIL_ICONS = [Clock, Route, ShieldCheck];

export default function SectorsPage(): React.ReactElement {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const current = SECTOR_SLIDES[activeIndex];

  const handleSelect = (index: number) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 'right' : 'left');
    setActiveIndex(index);
  };

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
    <main className="relative min-h-screen w-full overflow-x-clip bg-[#09090b] font-sans text-zinc-100 antialiased selection:bg-amber-400 selection:text-zinc-950">
      <style>{`
        @keyframes sectorSmoothRight {
          0% {
            opacity: 0;
            transform: translate3d(32px, 0, 0) scale(0.99);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }
        @keyframes sectorSmoothLeft {
          0% {
            opacity: 0;
            transform: translate3d(-32px, 0, 0) scale(0.99);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }
        @keyframes sectorCardsRise {
          0% {
            opacity: 0;
            transform: translate3d(0, 20px, 0) scale(0.99);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }
        .sector-enter-right {
          animation: sectorSmoothRight 720ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .sector-enter-left {
          animation: sectorSmoothLeft 720ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .sector-details-enter {
          animation: sectorCardsRise 760ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>

      {/* Subtle Top Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] bg-[radial-gradient(ellipse_70%_45%_at_50%_-10%,rgba(139,92,246,0.2),rgba(245,158,11,0.06),transparent)]"
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
            <Link
              href="/"
              className="whitespace-nowrap transition-colors duration-300 hover:text-white"
            >
              Home
            </Link>
            <Link
              href="/capabilities"
              className="whitespace-nowrap transition-colors duration-300 hover:text-white"
            >
              Capabilities
            </Link>
            <Link
              href="/sectors"
              className="whitespace-nowrap font-semibold text-white transition-colors duration-300"
            >
              Sectors
            </Link>
            <Link
              href="/pricing"
              className="whitespace-nowrap transition-colors duration-300 hover:text-white"
            >
              Plans
            </Link>
            <Link
              href="/about"
              className="whitespace-nowrap transition-colors duration-300 hover:text-white"
            >
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
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((prev) => !prev)}
              className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/15 text-zinc-300 transition-colors hover:border-white/30 hover:text-white md:hidden"
            >
              {mobileOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="mt-2 rounded-3xl border border-white/10 bg-zinc-900/95 p-5 shadow-2xl backdrop-blur-xl transition-all duration-300 md:hidden">
            <div className="flex flex-col space-y-3 text-sm font-medium text-zinc-300">
              <Link href="/" onClick={() => setMobileOpen(false)} className="hover:text-white">
                Home
              </Link>
              <Link href="/capabilities" onClick={() => setMobileOpen(false)} className="hover:text-white">
                Capabilities
              </Link>
              <Link
                href="/sectors"
                onClick={() => setMobileOpen(false)}
                className="font-bold text-amber-400"
              >
                Sectors
              </Link>
              <Link href="/pricing" onClick={() => setMobileOpen(false)} className="hover:text-white">
                Plans
              </Link>
              <Link href="/about" onClick={() => setMobileOpen(false)} className="hover:text-white">
                About us
              </Link>
              <Link href="/signin" onClick={() => setMobileOpen(false)} className="hover:text-white">
                Account / Sign in
              </Link>
              <Link href="/contact" onClick={() => setMobileOpen(false)} className="hover:text-white">
                Contact us
              </Link>
              <Link
                href="/demo"
                onClick={() => setMobileOpen(false)}
                className="pt-2 font-semibold text-amber-400"
              >
                Try Live Demo →
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ================= PAGE TITLE ================= */}
      <section className="mx-auto max-w-2xl px-4 pb-8 pt-8 text-center sm:px-6 sm:pb-10 sm:pt-12">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Built for{' '}
          <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-purple-400 bg-clip-text text-transparent">
            every local run
          </span>
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
          See how Deliver it handles orders and stops across five delivery categories.
        </p>
      </section>

      {/* ================= SECTOR SLIDE CARD ================= */}
      <section className="mx-auto max-w-5xl px-3 pb-10 sm:px-6">
        <div className="min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/80 shadow-2xl transition-all duration-300 hover:border-white/20">
          <div
            key={current.id}
            className={`grid grid-cols-1 items-center lg:grid-cols-12 ${
              direction === 'right'
                ? 'sector-enter-right'
                : 'sector-enter-left'
            }`}
          >
            {/* Image */}
            <div className="min-w-0 p-4 sm:p-8 lg:col-span-6">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-zinc-950">
                <img
                  src={current.image}
                  alt={current.imageAlt}
                  className={`h-full w-full object-cover ${
                    current.imagePosition ?? 'object-top'
                  } transition-transform duration-700 ease-out hover:scale-[1.03]`}
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex min-w-0 flex-col justify-center px-5 pb-7 pt-2 sm:p-10 lg:col-span-6 lg:pl-2">
              <span className="inline-flex w-fit rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 text-xs font-semibold text-purple-300">
                {current.label}
              </span>

              <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {current.title}
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
                {current.summary}
              </p>

              <ul className="mt-6 space-y-3 text-sm text-zinc-200">
                {current.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 transition-transform duration-300 hover:translate-x-1 sm:items-center"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-400/15 text-amber-400 sm:mt-0">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href={current.href}
                  className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-5 py-2.5 text-sm font-bold text-zinc-950 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-amber-300 sm:px-6"
                >
                  <span>Try {current.label}</span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </Link>
                <Link
                  href="/capabilities"
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-medium text-zinc-300 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:text-white"
                >
                  See Capabilities
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-zinc-950/60 px-4 py-4 sm:px-8">
            <div className="flex flex-wrap items-center gap-2">
              {SECTOR_SLIDES.map((sector, idx) => (
                <button
                  key={sector.id}
                  type="button"
                  aria-label={`View ${sector.label}`}
                  onClick={() => handleSelect(idx)}
                  className={`h-2 cursor-pointer rounded-full transition-all duration-500 ease-out ${
                    idx === activeIndex
                      ? 'w-8 bg-amber-400'
                      : 'w-2 bg-zinc-700 hover:bg-zinc-500'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="mr-1 text-xs font-medium text-zinc-400 sm:mr-2">
                {activeIndex + 1} of {SECTOR_SLIDES.length}
              </span>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous sector"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-zinc-900 text-zinc-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400/50 hover:text-white active:scale-95"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next sector"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-zinc-900 text-zinc-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400/50 hover:text-white active:scale-95"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTOR DETAILS ================= */}
      <section className="mx-auto max-w-5xl px-3 pb-16 sm:px-6 sm:pb-20">
        <div key={`${current.id}-details`} className="sector-details-enter min-w-0">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              How it works for{' '}
              <span className="text-amber-400">{current.label}</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3">
            {current.details.map((detail, idx) => {
              const Icon = DETAIL_ICONS[idx];
              return (
                <div
                  key={detail.title}
                  style={{ animationDelay: `${idx * 90}ms` }}
                  className="sector-details-enter min-w-0 rounded-2xl border border-white/10 bg-zinc-900/60 p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-purple-500/40 sm:p-6"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400 transition-transform duration-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h4 className="mt-4 text-base font-bold text-white">
                    {detail.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {detail.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 px-4 py-8 text-center text-xs text-zinc-500">
        <div className="mb-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-zinc-400">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <Link href="/capabilities" className="hover:text-white">
            Capabilities
          </Link>
          <Link href="/sectors" className="text-amber-400">
            Sectors
          </Link>
          <Link href="/pricing" className="hover:text-white">
            Plans
          </Link>
          <Link href="/about" className="hover:text-white">
            About us
          </Link>
          <Link href="/demo" className="hover:text-white">
            Live Demo
          </Link>
        </div>
        <p>
          &copy; 2026 Deliver it · College Project by Aryan Mahakur. All rights
          reserved.
        </p>
      </footer>
    </main>
  );
}