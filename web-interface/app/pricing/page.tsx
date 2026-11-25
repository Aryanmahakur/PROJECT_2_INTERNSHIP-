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
  ctaLabel: string;
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
    ctaLabel: 'Start Free',
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
    ctaLabel: 'Buy Growth',
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
    ctaLabel: 'Buy Enterprise',
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
    return <div className={`min-w-0 ${className}`}>{children}</div>;
  }

  const initialTransform =
    direction === 'left'
      ? 'translate3d(-56px, 0, 0) scale(0.985)'
      : direction === 'right'
        ? 'translate3d(56px, 0, 0) scale(0.985)'
        : 'translate3d(0, 32px, 0) scale(0.985)';

  return (
    <div
      ref={ref}
      className={`min-w-0 ${className}`}
      style={{
        opacity: shown ? 1 : 0.04,
        transform: shown ? 'translate3d(0, 0, 0) scale(1)' : initialTransform,
        transition: `opacity 720ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms, transform 720ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms`,
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
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [accountOpen, setAccountOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);

  const handleBuyPlan = (planName: string) => {
    setSelectedPlan(planName);
    requestAnimationFrame(() => {
      contactRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  };

  return (
    <main className="relative min-h-screen w-full overflow-x-clip bg-[#09090b] text-zinc-100 selection:bg-amber-400 selection:text-zinc-950">
      <style>{`
        @keyframes smoothPanelReveal {
          0% {
            opacity: 0;
            transform: translate3d(0, 14px, 0) scale(0.99);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }
        @keyframes priceSwap {
          0% {
            opacity: 0;
            transform: translateY(6px) scale(0.97);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .smooth-panel-reveal {
          animation: smoothPanelReveal 550ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .animate-price-swap {
          animation: priceSwap 340ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>

      {/* Subtle Obsidian Top Glow */}
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
              className="whitespace-nowrap transition-colors duration-300 hover:text-white"
            >
              Sectors
            </Link>
            <Link
              href="/pricing"
              className="whitespace-nowrap font-semibold text-white transition-colors duration-300"
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
              {mobileMenuOpen ? '✕' : '☰'}
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
              <Link
                href="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="font-bold text-amber-400"
              >
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

      {/* ================= HERO & BILLING TOGGLE ================= */}
      <section className="mx-auto max-w-4xl px-4 pb-8 pt-8 text-center sm:px-6 sm:pb-10 sm:pt-12">
        <h1 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-5xl">
          Simple plans for{' '}
          <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-purple-400 bg-clip-text text-transparent">
            every delivery scale
          </span>
        </h1>

        <p className="mx-auto mt-3.5 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
          Start with ready-to-use registered spots or switch to custom coordinates to
          estimate delivery times for restaurants anywhere in the world.
        </p>

        <div className="mt-7 inline-flex max-w-full flex-wrap items-center justify-center gap-1 rounded-full border border-white/10 bg-zinc-900/90 p-1 shadow-lg">
          <button
            type="button"
            onClick={() => setBilling('monthly')}
            className={`cursor-pointer rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-300 ease-out ${
              billing === 'monthly'
                ? 'bg-amber-400 text-zinc-950 shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setBilling('yearly')}
            className={`flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-300 ease-out ${
              billing === 'yearly'
                ? 'bg-amber-400 text-zinc-950 shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <span>Yearly</span>
            <span className="rounded-full bg-purple-500/20 px-2 py-0.5 text-[10px] font-extrabold text-purple-300">
              Save 20%
            </span>
          </button>
        </div>
      </section>

      {/* ================= PRICING CARDS ================= */}
      <section className="mx-auto max-w-6xl px-3 pb-10 sm:px-6 sm:pb-12 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-3 lg:items-stretch">
          {PLANS.map((plan, index) => {
            const price =
              billing === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
            const isSelected = selectedPlan === plan.name;

            return (
              <SlideInBox
                key={plan.name}
                direction={plan.slideFrom}
                delayMs={index * 90}
                className="flex"
              >
                <div
                  className={`flex w-full min-w-0 flex-col justify-between rounded-[28px] p-5 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:scale-[1.02] sm:p-8 ${
                    plan.highlighted
                      ? 'border-2 border-amber-400/70 bg-gradient-to-b from-purple-950/55 via-zinc-900/95 to-zinc-950 shadow-2xl shadow-purple-950/40'
                      : isSelected
                        ? 'border border-amber-400/60 bg-zinc-900/90 shadow-xl'
                        : 'border border-white/10 bg-zinc-900/80 shadow-xl hover:border-purple-500/40'
                  }`}
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h2 className="text-xl font-extrabold text-white">
                        {plan.name}
                      </h2>
                      {plan.badge && (
                        <span className="rounded-full bg-amber-400 px-3 py-0.5 text-[11px] font-bold text-zinc-950">
                          {plan.badge}
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-xs leading-relaxed text-zinc-400 sm:text-sm">
                      {plan.tagline}
                    </p>

                    <div className="mt-6 flex flex-wrap items-baseline gap-2 border-b border-white/10 pb-6">
                      <span
                        key={`${plan.name}-${billing}-${price}`}
                        className="animate-price-swap font-mono text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
                      >
                        {price}
                      </span>
                      <span className="text-xs font-medium text-zinc-400">
                        {plan.unit}
                      </span>
                    </div>

                    <ul className="mt-6 space-y-3 text-xs font-medium text-zinc-200 sm:text-sm">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5 transition-transform duration-300 hover:translate-x-0.5">
                          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-purple-300">
                            <CheckIcon />
                          </span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-2">
                    <button
                      type="button"
                      onClick={() => handleBuyPlan(plan.name)}
                      className={`inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-all duration-300 ease-out hover:-translate-y-0.5 ${
                        plan.highlighted
                          ? 'bg-amber-400 text-zinc-950 shadow-lg shadow-amber-500/20 hover:bg-amber-300'
                          : 'border border-white/15 bg-white/5 text-white hover:border-amber-400/50 hover:bg-white/10'
                      }`}
                    >
                      <span>{plan.ctaLabel}</span>
                      <ArrowRightIcon />
                    </button>
                  </div>
                </div>
              </SlideInBox>
            );
          })}
        </div>
      </section>

      {/* ================= COVERAGE STRIP + CONTACT US BOX ================= */}
      <section className="mx-auto max-w-6xl space-y-6 px-3 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <SlideInBox direction="up">
          <div className="grid grid-cols-1 gap-5 rounded-[28px] border border-white/10 bg-zinc-900/75 p-5 shadow-xl transition-all duration-500 ease-out hover:scale-[1.01] hover:border-white/20 md:grid-cols-2 sm:p-8">
            <div className="flex items-start gap-4 transition-transform duration-300 hover:translate-x-1">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400 ring-1 ring-purple-500/30">
                <MapPinIcon />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-extrabold text-white sm:text-base">
                  Registered Locations Included
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-zinc-400 sm:text-sm">
                  Test pre-configured restaurants and residential drop-offs immediately
                  without entering coordinates by hand.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 transition-transform duration-300 hover:translate-x-1">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400/15 text-amber-400 ring-1 ring-amber-400/30">
                <GlobeIcon />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-extrabold text-white sm:text-base">
                  Global Coverage via Custom Coordinates
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-zinc-400 sm:text-sm">
                  Enter or drag pins to any latitude and longitude on Earth to predict
                  road travel, prep time, and ETD for restaurants worldwide.
                </p>
              </div>
            </div>
          </div>
        </SlideInBox>

        {/* Contact Us Banner (Updates smoothly when user clicks Buy on any plan) */}
        <div ref={contactRef}>
          <SlideInBox direction="up" delayMs={80}>
            <div
              key={selectedPlan ?? 'default-contact'}
              className="smooth-panel-reveal flex flex-col items-start justify-between gap-4 rounded-[28px] border border-amber-400/25 bg-gradient-to-r from-purple-950/75 via-zinc-900 to-amber-950/45 p-5 shadow-2xl transition-all duration-500 ease-out hover:border-amber-400/40 sm:flex-row sm:items-center sm:px-8 sm:py-6"
            >
              <div className="min-w-0">
                <h3 className="break-words text-base font-extrabold text-white sm:text-lg">
                  {selectedPlan
                    ? `Contact Us — Selected: ${selectedPlan} (${billing})`
                    : 'Need help picking a plan or setting up a custom route?'}
                </h3>
                <p className="mt-1 text-xs text-zinc-300 sm:text-sm">
                  {selectedPlan
                    ? 'Our operator will contact you shortly to complete your plan onboarding and setup.'
                    : 'Our operator will contact you and walk you through local presets and global coordinate ETD.'}
                </p>
              </div>

              <div className="flex w-full shrink-0 flex-wrap items-center gap-3 sm:w-auto sm:flex-nowrap">
                {selectedPlan && (
                  <button
                    type="button"
                    onClick={() => setSelectedPlan(null)}
                    className="cursor-pointer rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-semibold text-zinc-300 transition-colors duration-300 hover:bg-white/10 hover:text-white"
                  >
                    Clear
                  </button>
                )}
                <Link
                  href={
                    selectedPlan
                      ? `/demo?plan=${encodeURIComponent(selectedPlan)}&billing=${billing}`
                      : '/demo'
                  }
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-zinc-950 shadow-lg shadow-amber-500/20 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-amber-300 sm:w-auto"
                >
                  <span>Contact Operator</span>
                  <ArrowRightIcon />
                </Link>
              </div>
            </div>
          </SlideInBox>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 px-4 py-7 text-center text-xs text-zinc-500">
        <div>&copy; 2026 Deliver it. All rights reserved.</div>
        <div className="mt-1">Reliable routing and dispatch for delivery partners.</div>
      </footer>
    </main>
  );
}