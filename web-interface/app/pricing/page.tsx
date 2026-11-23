'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

type BillingCycle = 'monthly' | 'yearly';
type SlideDirection = 'left' | 'right' | 'none' | 'up';

interface PlanTier {
  name: string;
  badge?: string;
  tagline: string;
  monthlyPrice: string;
  yearlyPrice: string;
  unit: string;
  highlighted?: boolean;
  slideFrom: 'left' | 'right' | 'none';
  features: string[];
}

const PLANS: PlanTier[] = [
  {
    name: 'Starter',
    tagline: 'Great for local testing, demos, and small delivery pilots.',
    monthlyPrice: '₹0',
    yearlyPrice: '₹0',
    unit: 'forever for local testing',
    slideFrom: 'left',
    features: [
      'Registered Locations preset directory',
      'Custom Coordinates for worldwide ETD',
      'Mapbox road distance & travel time',
      'Random Forest prep-time estimates',
      'Interactive map with draggable pins',
    ],
  },
  {
    name: 'Growth',
    badge: 'Most Popular',
    tagline: 'Built for multi-zone kitchens and regional delivery operations.',
    monthlyPrice: '₹4,999',
    yearlyPrice: '₹3,999',
    unit: 'per month',
    highlighted: true,
    slideFrom: 'none',
    features: [
      'Everything in Starter',
      'Unlimited custom global coordinates',
      'Custom registered restaurant & hub catalogs',
      'Faster FastAPI batch prediction throughput',
      'Peak-hour & order-time feature tuning',
      'Priority setup & integration support',
    ],
  },
  {
    name: 'Enterprise',
    tagline: 'Tailored routing, custom ML pipelines, and dedicated SLAs.',
    monthlyPrice: 'Custom',
    yearlyPrice: 'Custom',
    unit: 'tailored to volume',
    slideFrom: 'right',
    features: [
      'Everything in Growth',
      'Dedicated model retraining on your historical orders',
      'Custom SLA, uptime guarantees & private hosting',
      'Multi-region dispatch & fleet analytics',
      'Direct engineering onboarding',
    ],
  },
];

function SlideInBox({
  children,
  direction = 'up',
  delayMs = 0,
  className = '',
}: {
  children: React.ReactNode;
  direction?: SlideDirection;
  delayMs?: number;
  className?: string;
}): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(direction === 'none');

  useEffect(() => {
    if (direction === 'none') {
      setShown(true);
      return;
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
  }, [direction]);

  if (direction === 'none') {
    return <div className={className}>{children}</div>;
  }

  const initialTransform =
    direction === 'left'
      ? 'translate3d(-72px, 0, 0) scale(0.98)'
      : direction === 'right'
        ? 'translate3d(72px, 0, 0) scale(0.98)'
        : 'translate3d(0, 36px, 0) scale(0.98)';

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0.04,
        transform: shown ? 'translate3d(0, 0, 0) scale(1)' : initialTransform,
        transition: `opacity 760ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, transform 760ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms`,
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
}

function CheckIcon(): React.ReactElement {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3" aria-hidden="true">
      <path
        d="M3.5 8.5L6.5 11.5L12.5 4.5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon(): React.ReactElement {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDownIcon(): React.ReactElement {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4 text-slate-400" aria-hidden="true">
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SparklesIcon(): React.ReactElement {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5 text-purple-600" aria-hidden="true">
      <path
        d="M8 1.5L9.5 6L14 7.5L9.5 9L8 13.5L6.5 9L2 7.5L6.5 6L8 1.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MapPinIcon(): React.ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M12 21C12 21 19 14.8 19 9.5C19 5.63401 15.866 2.5 12 2.5C8.13401 2.5 5 5.63401 5 9.5C5 14.8 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function GlobeIcon(): React.ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M12 3C14.5 5.7 15.8 8.8 15.8 12C15.8 15.2 14.5 18.3 12 21C9.5 18.3 8.2 15.2 8.2 12C8.2 8.8 9.5 5.7 12 3Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function PlansPage(): React.ReactElement {
  const [billing, setBilling] = useState<BillingCycle>('monthly');

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#fcfcfd] text-slate-900 selection:bg-purple-100 selection:text-purple-900">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-24 top-12 h-96 w-96 rounded-full bg-purple-200/35 blur-3xl" />
        <div className="absolute -right-24 top-1/3 h-[26rem] w-[26rem] rounded-full bg-amber-200/35 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-indigo-200/25 blur-3xl" />
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
              <ChevronDownIcon />
            </div>
            <Link
              href="/pricing"
              className="font-semibold text-purple-600 transition-colors"
            >
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
              Start free trial
            </Link>
          </div>
        </div>
      </header>

      {/* ================= HERO & BILLING TOGGLE ================= */}
      <section className="mx-auto max-w-4xl px-4 pb-10 pt-14 text-center sm:px-6 sm:pt-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-200/70 bg-white/85 px-4 py-1 text-[11px] font-semibold uppercase tracking-widest text-purple-700 shadow-2xs">
          <SparklesIcon />
          Flexible Plans
        </div>

        <h1 className="mt-4 text-3xl font-extrabold leading-[1.15] tracking-tight text-slate-900 sm:text-5xl">
          Simple plans for{' '}
          <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500 bg-clip-text text-transparent">
            every delivery scale
          </span>
        </h1>

        <p className="mx-auto mt-3.5 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
          Start with ready-to-use registered spots or switch to custom coordinates to
          estimate delivery times for restaurants anywhere in the world.
        </p>

        <div className="mt-7 inline-flex items-center gap-1 rounded-full border border-slate-200/90 bg-white p-1 shadow-2xs">
          <button
            type="button"
            onClick={() => setBilling('monthly')}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
              billing === 'monthly'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setBilling('yearly')}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
              billing === 'yearly'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Yearly</span>
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-extrabold text-amber-900">
              Save 20%
            </span>
          </button>
        </div>
      </section>

      {/* ================= PRICING CARDS (MIDDLE STATIC, ZOOM ON HOVER) ================= */}
      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-stretch">
          {PLANS.map((plan, index) => {
            const price =
              billing === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;

            return (
              <SlideInBox
                key={plan.name}
                direction={plan.slideFrom}
                delayMs={index * 90}
                className="flex"
              >
                <div
                  className={`flex w-full flex-col justify-between rounded-[28px] p-7 transition-transform duration-300 ease-out hover:scale-[1.03] sm:p-8 ${
                    plan.highlighted
                      ? 'border-2 border-purple-500/80 bg-gradient-to-b from-purple-50/60 via-white to-amber-50/40 shadow-lg shadow-purple-950/[0.06] hover:shadow-xl hover:shadow-purple-950/[0.1]'
                      : 'border border-slate-200/85 bg-white/95 shadow-sm shadow-slate-950/[0.03] hover:border-purple-200 hover:shadow-lg hover:shadow-slate-950/[0.06]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="text-xl font-extrabold text-slate-900">
                        {plan.name}
                      </h2>
                      {plan.badge && (
                        <span className="rounded-full bg-purple-600 px-3 py-0.5 text-[11px] font-bold text-white">
                          {plan.badge}
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
                      {plan.tagline}
                    </p>

                    <div className="mt-6 flex items-baseline gap-2 border-b border-slate-100 pb-6">
                      <span className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                        {price}
                      </span>
                      <span className="text-xs font-medium text-slate-500">
                        {plan.unit}
                      </span>
                    </div>

                    <ul className="mt-6 space-y-3 text-xs font-medium text-slate-700 sm:text-sm">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5">
                          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-700">
                            <CheckIcon />
                          </span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </SlideInBox>
            );
          })}
        </div>
      </section>

      {/* ================= COVERAGE STRIP + SINGLE BOTTOM CONTACT BOX ================= */}
      <section className="mx-auto max-w-6xl space-y-6 px-4 pb-20 sm:px-6 lg:px-8">
        <SlideInBox direction="up">
          <div className="grid grid-cols-1 gap-5 rounded-[28px] border border-slate-200/80 bg-white/90 p-6 shadow-sm transition-transform duration-300 ease-out hover:scale-[1.01] md:grid-cols-2 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600 ring-1 ring-purple-100">
                <MapPinIcon />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 sm:text-base">
                  Registered Locations Included
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">
                  Test pre-configured restaurants and residential drop-offs immediately
                  without entering coordinates by hand.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700 ring-1 ring-amber-200/80">
                <GlobeIcon />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 sm:text-base">
                  Global Coverage via Custom Coordinates
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">
                  Enter or drag pins to any latitude and longitude on Earth to predict
                  road travel, prep time, and ETD for restaurants worldwide.
                </p>
              </div>
            </div>
          </div>
        </SlideInBox>

        {/* Single shared action box at the bottom with 1 contact CTA */}
        <SlideInBox direction="up" delayMs={80}>
          <div className="flex flex-col items-start justify-between gap-4 rounded-[28px] border border-purple-200/80 bg-gradient-to-r from-purple-50/75 via-white to-amber-50/60 p-6 shadow-sm transition-transform duration-300 ease-out hover:scale-[1.01] sm:flex-row sm:items-center sm:px-8 sm:py-6">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 sm:text-lg">
                Need help picking a plan or setting up a custom route?
              </h3>
              <p className="mt-0.5 text-xs text-slate-600 sm:text-sm">
                Reach out for a walkthrough of local presets and global coordinate ETD.
              </p>
            </div>

            <Link
              href="/demo"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#ffb703] px-6 py-3 text-sm font-bold text-slate-950 shadow-sm shadow-amber-500/20 transition-all duration-200 hover:scale-[1.03] hover:bg-[#ffaa00]"
            >
              <span>Contact &amp; Book Demo</span>
              <ArrowRightIcon />
            </Link>
          </div>
        </SlideInBox>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-slate-200/70 bg-white/80 py-7 text-center text-xs text-slate-500 backdrop-blur-xs">
        <div>&copy; 2026 Deliver it. All rights reserved.</div>
        <div className="mt-1">Reliable routing and dispatch for delivery partners.</div>
      </footer>
    </main>
  );
}