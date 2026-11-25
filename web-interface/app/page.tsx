'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Check,
  ShieldAlert,
  ChevronDown,
  MapPin,
  Menu,
  X,
  Navigation,
} from 'lucide-react';

type IndustryItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
};

type RoutePlan = {
  id: number;
  name: string;
  corridor: string;
  partner: string;
  stops: number;
  distance: string;
  status: string;
  color: string;
  path: string;
  nodes: { x: number; y: number; label: string }[];
};

type RevealVariant =
  | 'large-soft'
  | 'slide-up'
  | 'slide-left'
  | 'slide-right'
  | 'square-pop';

type ScrollRevealProps = {
  children: ReactNode;
  variant?: RevealVariant;
  delayMs?: number;
  className?: string;
  threshold?: number;
};

const STRONG_EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

function ScrollReveal({
  children,
  variant = 'slide-up',
  delayMs = 0,
  className = '',
  threshold = 0.08,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
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
      {
        threshold,
        rootMargin: '0px 0px -16px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const getHiddenStyle = (): React.CSSProperties => {
    switch (variant) {
      case 'large-soft':
        return {
          opacity: 0.12,
          transform: 'translate3d(0, 32px, 0) scale(0.985)',
          transition: `opacity 780ms ${STRONG_EASE} ${delayMs}ms, transform 780ms ${STRONG_EASE} ${delayMs}ms`,
        };
      case 'slide-left':
        return {
          opacity: 0.05,
          transform: 'translate3d(68px, 0, 0)',
          transition: `opacity 650ms ${STRONG_EASE} ${delayMs}ms, transform 650ms ${STRONG_EASE} ${delayMs}ms`,
        };
      case 'slide-right':
        return {
          opacity: 0.05,
          transform: 'translate3d(-68px, 0, 0)',
          transition: `opacity 650ms ${STRONG_EASE} ${delayMs}ms, transform 650ms ${STRONG_EASE} ${delayMs}ms`,
        };
      case 'square-pop':
        return {
          opacity: 0.05,
          transform: 'translate3d(0, 26px, 0) scale(0.84)',
          transition: `opacity 540ms ${STRONG_EASE} ${delayMs}ms, transform 540ms ${STRONG_EASE} ${delayMs}ms`,
        };
      case 'slide-up':
      default:
        return {
          opacity: 0.06,
          transform: 'translate3d(0, 48px, 0)',
          transition: `opacity 680ms ${STRONG_EASE} ${delayMs}ms, transform 680ms ${STRONG_EASE} ${delayMs}ms`,
        };
    }
  };

  const visibleStyle: React.CSSProperties = {
    opacity: 1,
    transform: 'translate3d(0, 0, 0) scale(1)',
    transition:
      variant === 'large-soft'
        ? `opacity 780ms ${STRONG_EASE} ${delayMs}ms, transform 780ms ${STRONG_EASE} ${delayMs}ms`
        : variant === 'square-pop'
          ? `opacity 540ms ${STRONG_EASE} ${delayMs}ms, transform 540ms ${STRONG_EASE} ${delayMs}ms`
          : `opacity 660ms ${STRONG_EASE} ${delayMs}ms, transform 660ms ${STRONG_EASE} ${delayMs}ms`,
  };

  return (
    <div
      ref={ref}
      style={visible ? visibleStyle : getHiddenStyle()}
      className={`min-w-0 ${className}`}
    >
      {children}
    </div>
  );
}

const INDUSTRIES: IndustryItem[] = [
  {
    id: 'food-beverage',
    title: 'Food & beverage',
    description:
      'Keep meals fresh and drinks chilled on tight delivery slots while turning first-time orders into loyal regulars.',
    href: '/industries/food-beverage',
    image: '/images/6ae10840a5fcc3022b03341e_food-delivery-hero.webp',
  },
  {
    id: 'grocery',
    title: 'Grocery',
    description:
      'Manage heavy daily order loads and scheduled drop windows smoothly from store shelf to front door.',
    href: '/industries/grocery',
    image: '/images/6ae10841c96ff8c92157e7af_grocery-delivery-hero.webp',
  },
  {
    id: 'farms',
    title: 'Farms',
    description:
      'Bring harvest boxes, dairy crates, and recurring farm shares across wide rural routes without wasted miles.',
    href: '/industries/farms',
    image: '/images/6ae10fe68599fd226e05bde9_farm-delivery-hero-mirrored.webp',
  },
  {
    id: 'florists',
    title: 'Florists',
    description:
      'Protect delicate bouquets during same-day rushes and peak holidays with smart stop order and drop proof.',
    href: '/industries/florists',
    image: '/images/6ae108400835c9097b031f0d_flower-delivery-hero.webp',
  },
  {
    id: 'couriers',
    title: 'Couriers',
    description:
      'Scale multi-client parcel runs across city blocks while keeping every delivery partner on a clear path.',
    href: '/industries/couriers',
    image: '/images/6ac6bc707385f726f30391c8_rt-industries-industry-courier.jpg',
  },
];

const DISPATCH_ROUTES: RoutePlan[] = [
  {
    id: 1,
    name: 'Route 1',
    corridor: 'Midtown & East Corridor',
    partner: 'Maya Chen',
    stops: 32,
    distance: '68 km',
    status: 'On Track',
    color: '#7C3AED',
    path: 'M 46 184 L 46 124 L 146 124 L 146 66 L 236 66',
    nodes: [
      { x: 46, y: 184, label: '1' },
      { x: 146, y: 124, label: '12' },
      { x: 236, y: 66, label: '32' },
    ],
  },
  {
    id: 2,
    name: 'Route 2',
    corridor: 'North Uptown Loop',
    partner: 'Eren Yeager',
    stops: 28,
    distance: '54 km',
    status: 'On Track',
    color: '#2563EB',
    path: 'M 146 42 L 246 42 L 246 96 L 346 96 L 346 42',
    nodes: [
      { x: 146, y: 42, label: '1' },
      { x: 246, y: 96, label: '14' },
      { x: 346, y: 42, label: '28' },
    ],
  },
  {
    id: 3,
    name: 'Route 3',
    corridor: 'Harbor & Waterfront',
    partner: 'Luis Ortega',
    stops: 24,
    distance: '49 km',
    status: 'On Track',
    color: '#0EA5E9',
    path: 'M 366 132 L 456 132 L 456 190 L 524 190',
    nodes: [
      { x: 366, y: 132, label: '1' },
      { x: 456, y: 190, label: '11' },
      { x: 524, y: 190, label: '24' },
    ],
  },
  {
    id: 4,
    name: 'Route 4',
    corridor: 'West Avenue Express',
    partner: 'Sam Patterson',
    stops: 26,
    distance: '61 km',
    status: 'On Track',
    color: '#9333EA',
    path: 'M 26 68 L 116 68 L 116 154 L 216 154',
    nodes: [
      { x: 26, y: 68, label: '1' },
      { x: 116, y: 154, label: '13' },
      { x: 216, y: 154, label: '26' },
    ],
  },
  {
    id: 5,
    name: 'Route 5',
    corridor: 'South Market District',
    partner: 'Clara Vance',
    stops: 30,
    distance: '59 km',
    status: 'On Track',
    color: '#4F46E5',
    path: 'M 166 192 L 266 192 L 266 138 L 356 138',
    nodes: [
      { x: 166, y: 192, label: '1' },
      { x: 266, y: 138, label: '15' },
      { x: 356, y: 138, label: '30' },
    ],
  },
  {
    id: 6,
    name: 'Route 6',
    corridor: 'East Ridge Sector',
    partner: 'Noah Kim',
    stops: 22,
    distance: '45 km',
    status: 'On Track',
    color: '#1D4ED8',
    path: 'M 376 58 L 476 58 L 476 112 L 534 112',
    nodes: [
      { x: 376, y: 58, label: '1' },
      { x: 476, y: 112, label: '10' },
      { x: 534, y: 112, label: '22' },
    ],
  },
];

function BrandLogosGroup({
  ariaHidden = false,
  dark = false,
}: {
  ariaHidden?: boolean;
  dark?: boolean;
}) {
  const main = dark ? 'text-white' : 'text-slate-900';
  const muted = dark ? 'text-slate-400' : 'text-slate-500';
  const soft = dark ? 'text-slate-300' : 'text-slate-700';
  const border = dark ? 'border-white' : 'border-slate-900';

  return (
    <div
      aria-hidden={ariaHidden}
      className="flex shrink-0 items-center gap-10 pr-10 sm:gap-16 sm:pr-16 lg:gap-20 lg:pr-20"
    >
      <div className="flex h-11 shrink-0 items-center justify-center opacity-90 transition-opacity hover:opacity-100">
        <span className={`font-serif text-2xl font-black tracking-tight ${main}`}>
          KFC
        </span>
      </div>

      <div className="flex h-11 shrink-0 flex-col items-center justify-center leading-none opacity-90 transition-opacity hover:opacity-100">
        <span className={`text-xs font-extrabold tracking-tight ${main}`}>
          Little
        </span>
        <span className={`text-sm font-black tracking-tight ${main}`}>
          Caesars
        </span>
      </div>

      <div className="flex h-11 shrink-0 items-center justify-center opacity-90 transition-opacity hover:opacity-100">
        <span
          className={`text-sm font-black uppercase tracking-wider sm:text-base ${main}`}
        >
          PAPA JOHNS
        </span>
      </div>

      <div className="flex h-11 shrink-0 items-center justify-center opacity-90 transition-opacity hover:opacity-100">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-xs font-bold tracking-tight ${border} ${main}`}
        >
          chip
        </div>
      </div>

      <div className="flex h-11 shrink-0 flex-col items-center justify-center leading-none opacity-90 transition-opacity hover:opacity-100">
        <span className={`font-serif text-lg font-extrabold tracking-widest ${main}`}>
          SAGE
        </span>
        <span
          className={`mt-0.5 whitespace-nowrap text-[9px] font-medium tracking-tight ${muted}`}
        >
          a plant based bistro &amp; brewery
        </span>
      </div>

      <div className="flex h-11 shrink-0 items-center justify-center opacity-90 transition-opacity hover:opacity-100">
        <div className="flex items-center gap-1.5">
          <span className={`text-[10px] font-bold lowercase tracking-tight ${soft}`}>
            zpizza
          </span>
          <span className={`text-3xl font-black leading-none ${main}`}>Z</span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const accountMenuRef = useRef<HTMLDivElement>(null);
  const [isHeroActive, setIsHeroActive] = useState(true);
  const [accountOpen, setAccountOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedRouteId, setSelectedRouteId] = useState<number | null>(null);

  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroActive(entry.isIntersecting && entry.intersectionRatio > 0.2);
      },
      { threshold: [0, 0.2, 0.5, 0.8] }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!accountOpen) return;
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target as Node)
      ) {
        setAccountOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [accountOpen]);

  const activeRoute =
    DISPATCH_ROUTES.find((r) => r.id === selectedRouteId) ?? DISPATCH_ROUTES[0];

  const handleScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  const scrollByCards = (direction: 'left' | 'right') => {
    const el = carouselRef.current;
    if (!el) return;
    const step = Math.max(280, Math.round(el.clientWidth * 0.65));
    el.scrollBy({
      left: direction === 'left' ? -step : step,
      behavior: 'smooth',
    });
  };

  return (
    <main
      className={`min-h-screen w-full overflow-x-clip transition-colors duration-700 ease-out ${
        isHeroActive ? 'bg-black text-white' : 'bg-white text-slate-900'
      }`}
    >
      <style>{`
        @keyframes heroEnterStrong {
          0% {
            opacity: 0.05;
            transform: translate3d(0, 32px, 0) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }
        .hero-stagger-1 {
          animation: heroEnterStrong 760ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .hero-stagger-2 {
          animation: heroEnterStrong 800ms cubic-bezier(0.16, 1, 0.3, 1) 120ms both;
        }
        .hero-stagger-3 {
          animation: heroEnterStrong 760ms cubic-bezier(0.16, 1, 0.3, 1) 220ms both;
        }
      `}</style>

      {/* ================= NON-STICKY HEADER / NAVBAR ================= */}
      <header className="relative z-50 mx-auto w-full max-w-6xl px-3 pt-3 sm:px-6 sm:pt-4 lg:px-8">
        <div
          className={`flex items-center justify-between gap-2 rounded-full px-3.5 py-2.5 shadow-2xl backdrop-blur-xl transition-all duration-500 sm:px-6 sm:py-3 ${
            isHeroActive
              ? 'border border-white/10 bg-zinc-900/80 text-white'
              : 'border border-slate-200/80 bg-white/90 text-slate-900'
          }`}
        >
          <Link href="/" className="flex shrink-0 items-center gap-2 sm:gap-2.5">
            <div className="grid h-7 w-7 grid-cols-2 gap-0.5 rounded-md p-0.5">
              <div className="rounded-[3px] bg-purple-500" />
              <div className="rounded-[3px] bg-amber-400" />
              <div className="rounded-[3px] bg-purple-400" />
              <div className="rounded-[3px] bg-amber-500" />
            </div>
            <span
              className={`text-base font-extrabold tracking-tight transition-colors duration-300 sm:text-lg ${
                isHeroActive ? 'text-white' : 'text-slate-900'
              }`}
            >
              Deliver it
            </span>
          </Link>

          <nav
            className={`hidden items-center gap-6 text-sm font-medium md:flex lg:gap-8 ${
              isHeroActive ? 'text-zinc-400' : 'text-slate-600'
            }`}
          >
            <Link
              href="/"
              className={`whitespace-nowrap font-semibold transition-colors ${
                isHeroActive ? 'text-white' : 'text-slate-900'
              }`}
            >
              Home
            </Link>
            <Link
              href="/capabilities"
              className={`whitespace-nowrap transition-colors ${
                isHeroActive ? 'hover:text-white' : 'hover:text-slate-900'
              }`}
            >
              Capabilities
            </Link>
            <Link
              href="/sectors"
              className={`whitespace-nowrap transition-colors ${
                isHeroActive ? 'hover:text-white' : 'hover:text-slate-900'
              }`}
            >
              Sectors
            </Link>
            <Link
              href="/pricing"
              className={`whitespace-nowrap transition-colors ${
                isHeroActive ? 'hover:text-white' : 'hover:text-slate-900'
              }`}
            >
              Plans
            </Link>
            <Link
              href="/about"
              className={`whitespace-nowrap transition-colors ${
                isHeroActive ? 'hover:text-white' : 'hover:text-slate-900'
              }`}
            >
              About us
            </Link>
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-4 lg:gap-5">
            <div ref={accountMenuRef} className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setAccountOpen((prev) => !prev)}
                aria-expanded={accountOpen}
                className={`flex cursor-pointer items-center gap-1 whitespace-nowrap text-sm font-medium transition-colors ${
                  isHeroActive
                    ? 'text-zinc-300 hover:text-white'
                    : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                <span>Account</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    accountOpen ? 'rotate-180' : ''
                  } ${isHeroActive ? 'text-zinc-400' : 'text-slate-500'}`}
                />
              </button>

              {accountOpen && (
                <div
                  className={`absolute right-0 mt-3 w-44 overflow-hidden rounded-2xl border py-1.5 shadow-2xl backdrop-blur-xl ${
                    isHeroActive
                      ? 'border-white/10 bg-zinc-900/95 text-zinc-200'
                      : 'border-slate-200 bg-white/95 text-slate-800'
                  }`}
                >
                  <Link
                    href="/signin"
                    onClick={() => setAccountOpen(false)}
                    className={`block px-4 py-2 text-sm font-medium transition-colors ${
                      isHeroActive
                        ? 'hover:bg-white/10 hover:text-white'
                        : 'hover:bg-slate-100 hover:text-slate-950'
                    }`}
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setAccountOpen(false)}
                    className={`block px-4 py-2 text-sm font-medium transition-colors ${
                      isHeroActive
                        ? 'hover:bg-white/10 hover:text-white'
                        : 'hover:bg-slate-100 hover:text-slate-950'
                    }`}
                  >
                    Contact us
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/demo"
              className="whitespace-nowrap rounded-full bg-amber-400 px-3.5 py-2 text-xs font-bold text-zinc-950 shadow-lg shadow-amber-500/20 transition-all hover:-translate-y-0.5 hover:bg-amber-300 sm:px-5 sm:text-sm"
            >
              Try Live Demo
            </Link>

            <button
              type="button"
              aria-label="Toggle Menu"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className={`inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border md:hidden ${
                isHeroActive
                  ? 'border-white/15 text-zinc-300'
                  : 'border-slate-200 text-slate-700'
              }`}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div
            className={`mt-2 rounded-3xl border p-5 shadow-2xl backdrop-blur-xl md:hidden ${
              isHeroActive
                ? 'border-white/10 bg-zinc-900/95 text-zinc-300'
                : 'border-slate-200 bg-white/95 text-slate-700'
            }`}
          >
            <div className="flex flex-col space-y-3 text-sm font-medium">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="font-bold text-amber-400"
              >
                Home
              </Link>
              <Link href="/capabilities" onClick={() => setMobileMenuOpen(false)}>
                Capabilities
              </Link>
              <Link href="/sectors" onClick={() => setMobileMenuOpen(false)}>
                Sectors
              </Link>
              <Link href="/pricing" onClick={() => setMobileMenuOpen(false)}>
                Plans
              </Link>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)}>
                About us
              </Link>
              <div className="border-t border-white/10 pt-3">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Account
                </p>
                <div className="flex flex-col space-y-2">
                  <Link href="/signin" onClick={() => setMobileMenuOpen(false)}>
                    Sign in
                  </Link>
                  <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                    Contact us
                  </Link>
                </div>
              </div>
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

     {/* ================= AESTHETIC LEFT-ALIGNED EARTH HERO ================= */}
      <section
        ref={heroRef}
        className="relative z-10 min-h-[520px] w-full overflow-hidden bg-black text-white sm:min-h-[600px] lg:min-h-[660px]"
      >
        {/* Full-bleed Earth orbital video */}
        <video
          src="/7051724b72.mp4"
          autoPlay
          loop
          muted
          playsInline
          aria-label="Earth from orbit along global delivery corridors"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[58%_52%] sm:object-[54%_50%] lg:object-[50%_48%]"
        />

        {/* Atmospheric gradients & subtle glow for clean left-side hierarchy */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/15" />
        <div className="pointer-events-none absolute -left-24 top-24 h-80 w-80 rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-12 left-32 h-64 w-64 rounded-full bg-amber-400/10 blur-[110px]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/60 to-transparent" />

        {/* Left-aligned hero content */}
        <div className="relative z-10 mx-auto flex min-h-[520px] max-w-7xl flex-col justify-start px-4 pb-12 pt-14 sm:min-h-[600px] sm:px-8 sm:pb-14 sm:pt-20 lg:min-h-[660px] lg:px-10 lg:pt-28">
          <div className="mr-auto flex w-full max-w-none flex-col items-start text-left">
            <h1 className="hero-stagger-1 text-3xl font-extrabold leading-[1.1] tracking-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl">
              <span className="block sm:whitespace-nowrap">
                We deliver the best route
              </span>
              <span className="mt-1 block bg-gradient-to-r from-violet-300 via-purple-200 to-amber-200 bg-clip-text text-transparent sm:whitespace-nowrap">
                On every delivery path
              </span>
            </h1>
            <p className="hero-stagger-2 mt-4 max-w-xl text-sm font-normal leading-relaxed text-slate-200/95 drop-shadow sm:mt-5 sm:text-lg xl:text-xl">
              Smarter stop sequences and smoother shift handoffs. Live customer tracking built to cut up to 25% of delivery costs.
            </p>

            <div className="hero-stagger-3 mt-6 flex flex-wrap items-center justify-start gap-4 sm:mt-7">
              <Link
                href="/demo"
                className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#ffb703] px-6 py-3 text-sm font-bold text-slate-950 shadow-xl shadow-amber-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ffaa00] hover:shadow-amber-400/35 active:scale-[0.98] sm:px-7 sm:py-3.5 sm:text-base"
              >
                <span>Try Live Demo</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BRAND LOGOS STRIP (black while hero active) ================= */}
      <div
        className={`relative z-10 w-full transition-colors duration-700 ease-out ${
          isHeroActive ? 'bg-black text-white' : 'bg-white text-slate-900'
        }`}
      >
        <ScrollReveal variant="slide-up" delayMs={60} threshold={0.08}>
          <section className="mx-auto w-full max-w-7xl px-4 pb-9 pt-8 text-center sm:px-6 lg:px-8">
            <p
              className={`text-sm font-semibold tracking-tight transition-colors duration-700 sm:text-base ${
                isHeroActive ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              Who optimized their route — you can be next
            </p>

            <style>{`
              @keyframes logoLoopScroll {
                0% {
                  transform: translate3d(0, 0, 0);
                }
                100% {
                  transform: translate3d(-50%, 0, 0);
                }
              }
              .brand-loop-track {
                display: flex;
                width: max-content;
                animation: logoLoopScroll 22s linear infinite;
                will-change: transform;
              }
              .brand-loop-container:hover .brand-loop-track {
                animation-play-state: paused;
              }
            `}</style>

            <div
              className={`brand-loop-container relative mt-5 overflow-hidden py-1 ${
                isHeroActive
                  ? '[mask-image:linear-gradient(to_right,transparent,white_8%,white_92%,transparent)]'
                  : '[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]'
              }`}
            >
              <div className="brand-loop-track items-center">
                <BrandLogosGroup dark={isHeroActive} />
                <BrandLogosGroup ariaHidden dark={isHeroActive} />
              </div>
            </div>
          </section>
        </ScrollReveal>
      </div>

      {/* ================= SHOWCASE SECTION (Map UI & Dashboard) ================= */}
      <section className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <ScrollReveal variant="large-soft" threshold={0.06}>
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-b from-white via-purple-50/25 to-slate-50/80 p-4 shadow-xl backdrop-blur-xl sm:p-8">
            <div className="mb-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
              <ScrollReveal variant="slide-right" delayMs={80} threshold={0.08}>
                <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-800 shadow-sm">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-600 text-white">
                    <span className="h-2 w-2 animate-ping rounded-full bg-white" />
                  </span>
                  <span className="text-sm font-semibold">Partner app</span>
                  <span className="rounded-full bg-purple-50 px-2 py-0.5 text-[10px] font-bold uppercase text-purple-600">
                    iOS / Android
                  </span>
                </div>
              </ScrollReveal>

              <div className="text-center text-xs font-semibold text-slate-500">
                Live route guidance, dispatch map &amp; customer ETA
              </div>

              <ScrollReveal variant="slide-left" delayMs={80} threshold={0.08}>
                <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-800 shadow-sm">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500 text-slate-950">
                    <span className="h-2 w-2 animate-ping rounded-full bg-slate-950" />
                  </span>
                  <span className="text-sm font-semibold">Live tracker</span>
                  <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-700">
                    Live link
                  </span>
                </div>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 lg:grid-cols-12">
              <ScrollReveal variant="slide-right" delayMs={140} threshold={0.08} className="lg:col-span-3">
                <div className="relative mx-auto w-full max-w-[340px] rounded-[44px] border-4 border-slate-800 bg-slate-900 p-3.5 shadow-2xl md:max-w-none">
                  <div className="absolute left-1/2 top-5 z-20 flex h-5 w-28 -translate-x-1/2 transform items-center justify-end rounded-full bg-black px-2.5">
                    <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-purple-500/80" />
                  </div>

                  <div className="mt-5 space-y-3 rounded-[32px] border border-slate-100 bg-white p-3.5 text-xs text-slate-900 shadow-inner">
                    <div className="flex items-center justify-between px-1 pt-1 text-[10px] text-slate-400">
                      <span className="font-semibold text-slate-700">9:41</span>
                      <span>5G 🔋</span>
                    </div>

                    <div className="rounded-2xl border border-purple-100 bg-purple-50/90 p-3">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-bold text-purple-700">Stop #4 of 32</p>
                        <span className="rounded-full bg-purple-600 px-2 py-0.5 text-[9px] font-bold text-white">
                          1.8 km
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] font-medium text-slate-700">
                        📍 8 W 47th St, New York
                      </p>
                      <div className="mt-2 flex items-center justify-between gap-2 text-[10px]">
                        <span className="font-semibold text-slate-500">ETA 10:15 AM</span>
                        <span className="inline-flex items-center gap-1 font-bold text-purple-700">
                          <Navigation className="h-3 w-3" /> Left in 240m
                        </span>
                      </div>
                    </div>

                    <div className="relative h-44 overflow-hidden rounded-2xl border border-slate-200 bg-[#EEF2FF]">
                      <svg className="h-full w-full" viewBox="0 0 240 180" fill="none">
                        <rect x="0" y="0" width="240" height="180" fill="#F8FAFC" />
                        <rect x="14" y="14" width="62" height="44" rx="6" fill="#E2E8F0" />
                        <rect x="92" y="14" width="66" height="44" rx="6" fill="#E2E8F0" />
                        <rect x="174" y="14" width="52" height="44" rx="6" fill="#E2E8F0" />
                        <rect x="14" y="74" width="62" height="40" rx="6" fill="#E2E8F0" />
                        <rect x="92" y="74" width="66" height="40" rx="6" fill="#EDE9FE" />
                        <rect x="174" y="74" width="52" height="40" rx="6" fill="#E2E8F0" />
                        <rect x="14" y="130" width="96" height="36" rx="6" fill="#E2E8F0" />
                        <rect x="126" y="130" width="100" height="36" rx="6" fill="#E2E8F0" />

                        <path
                          d="M44 150 L84 66 L166 66 L196 36"
                          stroke="#CBD5E1"
                          strokeWidth="3.5"
                          strokeDasharray="5 4"
                          strokeLinecap="round"
                        />
                        <path
                          d="M44 150 L84 122 L84 66 L166 66"
                          stroke="#7C3AED"
                          strokeWidth="5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        <circle cx="84" cy="122" r="5" fill="#7C3AED" stroke="#FFF" strokeWidth="2" />
                        <circle cx="196" cy="36" r="5" fill="#94A3B8" stroke="#FFF" strokeWidth="2" />
                        <circle cx="84" cy="122" r="11" fill="#7C3AED" opacity="0.2" />
                        <circle cx="84" cy="122" r="6" fill="#7C3AED" stroke="#FFF" strokeWidth="2.5" />
                        <circle cx="166" cy="66" r="7" fill="#F59E0B" stroke="#FFF" strokeWidth="2.5" />
                      </svg>

                      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between rounded-xl border border-slate-200/90 bg-white/95 px-2.5 py-1.5 text-[10px] shadow-xs backdrop-blur-xs">
                        <span className="font-bold text-slate-800">5th Ave → W 47th</span>
                        <span className="font-bold text-purple-600">On route</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="w-full rounded-xl bg-purple-600 py-2.5 font-bold text-white shadow-md transition-colors hover:bg-purple-700"
                    >
                      Start navigation
                    </button>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="large-soft" delayMs={200} threshold={0.06} className="md:col-span-2 lg:col-span-6">
                <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-xl sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="rounded-xl bg-slate-100 px-3 py-1.5 font-bold text-slate-900">
                        Routes
                      </span>
                      <span className="font-medium text-slate-500">📅 Wed, Nov 18</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-slate-600">
                      <button
                        type="button"
                        onClick={() => setSelectedRouteId(null)}
                        className={`rounded-xl border px-3 py-1.5 font-semibold transition-colors ${
                          selectedRouteId === null
                            ? 'border-indigo-200 bg-indigo-50 text-indigo-700'
                            : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        🗺️ All 6 Routes
                      </button>
                      <span className="rounded-xl bg-purple-600 px-3 py-1.5 font-bold text-white shadow-md">
                        Plan routes
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {DISPATCH_ROUTES.map((route, idx) => {
                      const isSelected = activeRoute.id === route.id;
                      return (
                        <ScrollReveal
                          key={route.id}
                          variant="square-pop"
                          delayMs={70 + idx * 60}
                          threshold={0.04}
                        >
                          <button
                            type="button"
                            onClick={() => setSelectedRouteId(route.id)}
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold transition-all ${
                              isSelected
                                ? 'border-purple-600 bg-purple-50 text-purple-700 shadow-2xs'
                                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                            }`}
                          >
                            <span
                              className="h-2 w-2 rounded-full"
                              style={{ backgroundColor: route.color }}
                            />
                            <span>{route.name}</span>
                          </button>
                        </ScrollReveal>
                      );
                    })}
                  </div>

                  <div className="relative mt-3 h-48 overflow-hidden rounded-2xl border border-slate-200 bg-[#F8FAFC] shadow-inner sm:h-52">
                    <svg className="h-full w-full" viewBox="0 0 560 220" fill="none">
                      <rect width="560" height="220" fill="#F8FAFC" />

                      <rect x="16" y="16" width="84" height="44" rx="7" fill="#FFFFFF" stroke="#E2E8F0" />
                      <rect x="116" y="16" width="84" height="44" rx="7" fill="#EEF2FF" stroke="#E0E7FF" />
                      <rect x="216" y="16" width="84" height="44" rx="7" fill="#FFFFFF" stroke="#E2E8F0" />
                      <rect x="316" y="16" width="104" height="44" rx="7" fill="#F5F3FF" stroke="#EDE9FE" />
                      <rect x="436" y="16" width="108" height="44" rx="7" fill="#FFFFFF" stroke="#E2E8F0" />

                      <rect x="16" y="76" width="84" height="44" rx="7" fill="#F5F3FF" stroke="#EDE9FE" />
                      <rect x="116" y="76" width="84" height="44" rx="7" fill="#FFFFFF" stroke="#E2E8F0" />
                      <rect x="216" y="76" width="84" height="44" rx="7" fill="#EEF2FF" stroke="#E0E7FF" />
                      <rect x="316" y="76" width="104" height="44" rx="7" fill="#FFFFFF" stroke="#E2E8F0" />
                      <rect x="436" y="76" width="108" height="44" rx="7" fill="#EEF2FF" stroke="#E0E7FF" />

                      <rect x="16" y="136" width="84" height="66" rx="7" fill="#FFFFFF" stroke="#E2E8F0" />
                      <rect x="116" y="136" width="84" height="66" rx="7" fill="#FFFFFF" stroke="#E2E8F0" />
                      <rect x="216" y="136" width="84" height="66" rx="7" fill="#F5F3FF" stroke="#EDE9FE" />
                      <rect x="316" y="136" width="104" height="66" rx="7" fill="#FFFFFF" stroke="#E2E8F0" />
                      <rect x="436" y="136" width="108" height="66" rx="7" fill="#F5F3FF" stroke="#EDE9FE" />

                      {DISPATCH_ROUTES.map((route) => {
                        const dimmed =
                          selectedRouteId !== null && selectedRouteId !== route.id;
                        return (
                          <g key={route.id} opacity={dimmed ? 0.22 : 1}>
                            <path
                              d={route.path}
                              stroke={route.color}
                              strokeWidth={activeRoute.id === route.id ? '5' : '3.5'}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            {route.nodes.map((node) => (
                              <g key={node.label}>
                                <circle
                                  cx={node.x}
                                  cy={node.y}
                                  r="7.5"
                                  fill={route.color}
                                  stroke="#FFFFFF"
                                  strokeWidth="2"
                                />
                                <text
                                  x={node.x}
                                  y={node.y + 3}
                                  textAnchor="middle"
                                  fill="#FFFFFF"
                                  fontSize="7.5"
                                  fontWeight="bold"
                                >
                                  {node.label}
                                </text>
                              </g>
                            ))}
                          </g>
                        );
                      })}
                    </svg>

                    <div className="absolute left-2.5 top-2.5 max-w-[92%] truncate rounded-xl border border-slate-200/90 bg-white/95 px-2.5 py-1 text-[10px] font-bold text-slate-800 shadow-xs backdrop-blur-xs sm:left-3 sm:px-3 sm:text-[11px]">
                      {activeRoute.corridor} • {activeRoute.stops} Stops
                    </div>
                    <div className="hidden rounded-xl border border-purple-200 bg-purple-50/95 px-3 py-1 text-[11px] font-bold text-purple-700 shadow-xs sm:block sm:absolute sm:bottom-2.5 sm:right-3">
                      6 Active Corridors • Zero Overlap
                    </div>
                  </div>

                  <div className="mt-3 text-xs">
                    <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200/80 bg-slate-50 px-3 py-2.5 text-slate-700 sm:px-3.5">
                      <span className="font-bold text-purple-600">
                        ● {activeRoute.name}
                      </span>
                      <span className="font-medium">Partner: {activeRoute.partner}</span>
                      <span className="font-medium">Stops: {activeRoute.stops}</span>
                      <span className="font-medium">{activeRoute.distance}</span>
                      <span className="rounded-md bg-emerald-50 px-2 py-0.5 font-bold text-emerald-600">
                        {activeRoute.status}
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="slide-left" delayMs={140} threshold={0.08} className="lg:col-span-3">
                <div className="relative mx-auto w-full max-w-[340px] rounded-[44px] border-4 border-slate-800 bg-slate-900 p-3.5 shadow-2xl md:max-w-none">
                  <div className="absolute left-1/2 top-5 z-20 flex h-5 w-28 -translate-x-1/2 transform items-center justify-end rounded-full bg-black px-2.5">
                    <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-amber-400" />
                  </div>

                  <div className="mt-5 space-y-3 rounded-[32px] border border-slate-100 bg-white p-3.5 text-xs text-slate-900 shadow-inner">
                    <div className="flex items-center justify-between px-1 pt-1 text-[10px] text-slate-400">
                      <span className="font-semibold text-slate-700">9:41</span>
                      <span>Wi-Fi 📶</span>
                    </div>

                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-3">
                      <p className="flex items-center gap-1.5 font-bold text-emerald-700">
                        <CheckCircle2 className="h-4 w-4 shrink-0" /> Successfully delivered
                      </p>
                      <p className="mt-1 text-[10px] text-slate-600">
                        Nov 18 at 3:45 PM • Left at front door
                      </p>
                    </div>

                    <div className="relative h-36 overflow-hidden rounded-2xl border border-slate-200 bg-[#FFFBEB]">
                      <svg className="h-full w-full" viewBox="0 0 240 150" fill="none">
                        <rect width="240" height="150" fill="#F8FAFC" />
                        <rect x="16" y="16" width="68" height="44" rx="6" fill="#E2E8F0" />
                        <rect x="100" y="16" width="124" height="44" rx="6" fill="#FEF3C7" opacity="0.5" />
                        <rect x="16" y="76" width="104" height="54" rx="6" fill="#E2E8F0" />
                        <rect x="136" y="76" width="88" height="54" rx="6" fill="#ECFDF5" />

                        <path
                          d="M36 122 C 76 118, 92 52, 142 54 C 176 56, 184 96, 204 96"
                          stroke="#D97706"
                          strokeWidth="4.5"
                          strokeLinecap="round"
                        />

                        <circle cx="36" cy="122" r="5" fill="#64748B" stroke="#FFF" strokeWidth="2" />
                        <circle cx="204" cy="96" r="7" fill="#10B981" stroke="#FFF" strokeWidth="2.5" />
                      </svg>

                      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between rounded-xl border border-slate-200/90 bg-white/95 px-2.5 py-1.5 text-[10px] shadow-xs backdrop-blur-xs">
                        <span className="inline-flex items-center gap-1 font-bold text-slate-800">
                          <MapPin className="h-3 w-3 text-emerald-600" /> Doorstep pin
                        </span>
                        <span className="font-bold text-emerald-600">Completed</span>
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5">
                      <p className="text-[10px] font-bold uppercase text-slate-400">
                        Proof of delivery
                      </p>
                      <div className="mt-1 flex items-center justify-between text-[11px] text-slate-700">
                        <span className="font-medium">Signature verified ✓</span>
                        <span className="font-bold text-emerald-600">Passed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ================= STREET-MAP ROUTE COMPARISON WITH ANIMATED CORRIDOR ================= */}
      <section className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <ScrollReveal variant="slide-up" threshold={0.08}>
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Tired of tangled routes?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-lg">
              Delivery partners trust routes that make sense on the road. Deliver it builds clean sequences with no backtracking and no overlapping partner zones.
            </p>
            <div className="mt-4">
              <Link
                href="/smart-optimization"
                className="inline-flex items-center gap-2 text-sm font-bold text-purple-600 transition-colors hover:text-purple-700"
              >
                <span>Discover smart route planning</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="large-soft" threshold={0.06}>
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-3.5 shadow-xl sm:p-6">
            <div className="relative grid grid-cols-1 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-md md:grid-cols-2">
              <style>{`
                @keyframes flowPulse {
                  0% {
                    stroke-dashoffset: 120;
                  }
                  100% {
                    stroke-dashoffset: 0;
                  }
                }
                @keyframes vehicleMove {
                  0% {
                    offset-distance: 0%;
                  }
                  100% {
                    offset-distance: 100%;
                  }
                }
                @keyframes conflictFlash {
                  0%, 100% {
                    opacity: 0.35;
                    transform: scale(0.9);
                  }
                  50% {
                    opacity: 1;
                    transform: scale(1.2);
                  }
                }
                .route-flow-line {
                  stroke-dasharray: 10 10;
                  animation: flowPulse 1.6s linear infinite;
                }
                .moving-courier-dot {
                  offset-path: path('M 58 214 L 58 148 L 164 148 L 164 84 L 284 84 L 366 84 L 366 52');
                  animation: vehicleMove 6.5s linear infinite;
                }
                .conflict-ping {
                  transform-box: fill-box;
                  transform-origin: center;
                  animation: conflictFlash 2s ease-in-out infinite;
                }
              `}</style>

              <div className="relative flex flex-col justify-between border-b border-slate-200 bg-[#F8FAFC] p-4 sm:p-5 md:border-b-0 md:border-r">
                <div className="z-10 flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm sm:px-3.5">
                    <Check className="h-3.5 w-3.5 shrink-0" /> Deliver it (1 Clean Path)
                  </span>
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                    Zero overlap
                  </span>
                </div>

                <div className="my-4 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                  <svg className="h-52 w-full sm:h-64" viewBox="0 0 430 250" fill="none">
                    <rect width="430" height="250" fill="#F1F5F9" />

                    <rect x="20" y="20" width="96" height="52" rx="8" fill="#FFFFFF" stroke="#E2E8F0" />
                    <rect x="132" y="20" width="104" height="52" rx="8" fill="#FFFFFF" stroke="#E2E8F0" />
                    <rect x="252" y="20" width="102" height="52" rx="8" fill="#FFFFFF" stroke="#E2E8F0" />
                    <rect x="370" y="20" width="40" height="52" rx="8" fill="#E2E8F0" opacity="0.6" />

                    <rect x="20" y="96" width="96" height="40" rx="8" fill="#F5F3FF" stroke="#DDD6FE" />
                    <rect x="132" y="96" width="104" height="40" rx="8" fill="#FFFFFF" stroke="#E2E8F0" />
                    <rect x="252" y="96" width="102" height="40" rx="8" fill="#F5F3FF" stroke="#DDD6FE" />
                    <rect x="370" y="96" width="40" height="40" rx="8" fill="#E2E8F0" opacity="0.6" />

                    <rect x="20" y="160" width="96" height="66" rx="8" fill="#FFFFFF" stroke="#E2E8F0" />
                    <rect x="132" y="160" width="104" height="66" rx="8" fill="#FFFFFF" stroke="#E2E8F0" />
                    <rect x="252" y="160" width="102" height="66" rx="8" fill="#FFFFFF" stroke="#E2E8F0" />
                    <rect x="370" y="160" width="40" height="66" rx="8" fill="#E2E8F0" opacity="0.6" />

                    <text x="150" y="88" fill="#94A3B8" fontSize="8" fontWeight="600">
                      OAK STREET
                    </text>
                    <text x="272" y="152" fill="#94A3B8" fontSize="8" fontWeight="600">
                      MAPLE AVE
                    </text>

                    <path
                      d="M 58 214 L 58 148 L 164 148 L 164 84 L 284 84 L 366 84 L 366 52"
                      stroke="#C4B5FD"
                      strokeWidth="7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 58 214 L 58 148 L 164 148 L 164 84 L 284 84 L 366 84 L 366 52"
                      stroke="#7C3AED"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 58 214 L 58 148 L 164 148 L 164 84 L 284 84 L 366 84 L 366 52"
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="route-flow-line"
                    />

                    <circle cx="58" cy="214" r="10" fill="#0F172A" stroke="#FFFFFF" strokeWidth="2.5" />
                    <text x="58" y="217" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">
                      1
                    </text>

                    <circle cx="164" cy="148" r="9" fill="#7C3AED" stroke="#FFFFFF" strokeWidth="2.5" />
                    <text x="164" y="151" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">
                      2
                    </text>

                    <circle cx="284" cy="84" r="9" fill="#7C3AED" stroke="#FFFFFF" strokeWidth="2.5" />
                    <text x="284" y="87" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">
                      3
                    </text>

                    <circle cx="366" cy="52" r="10" fill="#10B981" stroke="#FFFFFF" strokeWidth="2.5" />
                    <text x="366" y="55" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">
                      4
                    </text>

                    <g className="moving-courier-dot">
                      <circle r="11" fill="#F59E0B" opacity="0.28" />
                      <circle r="6" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2" />
                    </g>
                  </svg>
                </div>

                <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-xs">
                  <h3 className="text-sm font-bold text-slate-900">Single Dedicated Corridor</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">
                    Partners follow one smooth, step-by-step path along real streets without doubling back.
                  </p>
                </div>
              </div>

              <div className="relative flex flex-col justify-between bg-[#FFFBFB] p-4 sm:p-5">
                <div className="z-10 flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm sm:px-3.5">
                    <ShieldAlert className="h-3.5 w-3.5 shrink-0" /> Basic Planners (Zigzag Chaos)
                  </span>
                  <span className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-bold text-rose-600">
                    Criss-crossing
                  </span>
                </div>

                <div className="my-4 overflow-hidden rounded-2xl border border-rose-200/70 bg-white shadow-xs">
                  <svg className="h-52 w-full sm:h-64" viewBox="0 0 430 250" fill="none">
                    <rect width="430" height="250" fill="#F8FAFC" />

                    <rect x="20" y="20" width="96" height="52" rx="8" fill="#FFFFFF" stroke="#E2E8F0" />
                    <rect x="132" y="20" width="104" height="52" rx="8" fill="#FFFFFF" stroke="#E2E8F0" />
                    <rect x="252" y="20" width="102" height="52" rx="8" fill="#FFFFFF" stroke="#E2E8F0" />
                    <rect x="370" y="20" width="40" height="52" rx="8" fill="#E2E8F0" opacity="0.6" />

                    <rect x="20" y="96" width="96" height="40" rx="8" fill="#FFF1F2" stroke="#FECDD3" />
                    <rect x="132" y="96" width="104" height="40" rx="8" fill="#FFFFFF" stroke="#E2E8F0" />
                    <rect x="252" y="96" width="102" height="40" rx="8" fill="#FFF1F2" stroke="#FECDD3" />
                    <rect x="370" y="96" width="40" height="40" rx="8" fill="#E2E8F0" opacity="0.6" />

                    <rect x="20" y="160" width="96" height="66" rx="8" fill="#FFFFFF" stroke="#E2E8F0" />
                    <rect x="132" y="160" width="104" height="66" rx="8" fill="#FFFFFF" stroke="#E2E8F0" />
                    <rect x="252" y="160" width="102" height="66" rx="8" fill="#FFFFFF" stroke="#E2E8F0" />
                    <rect x="370" y="160" width="40" height="66" rx="8" fill="#E2E8F0" opacity="0.6" />

                    <path
                      d="M 52 214 L 52 84 L 244 84 L 244 196 L 348 196 L 348 44"
                      stroke="#E11D48"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 356 214 L 124 214 L 124 44 L 296 44 L 296 148 L 68 148"
                      stroke="#FB7185"
                      strokeWidth="3.5"
                      strokeDasharray="6 4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <g className="conflict-ping">
                      <circle cx="124" cy="148" r="11" fill="#E11D48" opacity="0.22" />
                      <circle cx="124" cy="148" r="6" fill="#E11D48" stroke="#FFFFFF" strokeWidth="2" />
                    </g>
                    <g className="conflict-ping">
                      <circle cx="244" cy="84" r="11" fill="#E11D48" opacity="0.22" />
                      <circle cx="244" cy="84" r="6" fill="#E11D48" stroke="#FFFFFF" strokeWidth="2" />
                    </g>
                    <g className="conflict-ping">
                      <circle cx="296" cy="148" r="11" fill="#E11D48" opacity="0.22" />
                      <circle cx="296" cy="148" r="6" fill="#E11D48" stroke="#FFFFFF" strokeWidth="2" />
                    </g>
                  </svg>
                </div>

                <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-xs">
                  <h3 className="text-sm font-bold text-slate-900">Overlapping Territory</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">
                    Partners cross paths repeatedly across the same blocks, driving up fuel spend, delays, and confusion.
                  </p>
                </div>
              </div>

              <div className="pointer-events-none absolute left-1/2 top-1/2 z-30 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-slate-900 text-xs font-extrabold tracking-wider text-white shadow-xl md:flex">
                VS
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ================= BUSINESS INSIGHTS BENTO GRID SECTION ================= */}
      <section className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <ScrollReveal variant="slide-up" threshold={0.08}>
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Level up with partner insights
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-lg">
              Track delivery performance, compare schedules with real finish times, and spot ways to save every week.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <ScrollReveal variant="large-soft" delayMs={60} threshold={0.06} className="lg:col-span-6">
            <div className="flex h-full flex-col justify-between rounded-3xl border border-indigo-100/80 bg-[#F4F6FC] p-5 sm:p-7">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                    Partner performance
                  </h3>
                  <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700">
                    Coming soon
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600 sm:text-base">
                  Review partner completion rates, stop counts, and distance to support better shifts.
                </p>
              </div>

              <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-100 bg-white p-4 shadow-lg shadow-slate-900/5 sm:p-5">
                <div className="min-w-[340px]">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900">Partners</span>
                    <span className="text-xs font-medium text-slate-400">This week</span>
                  </div>

                  <div className="grid grid-cols-12 border-b border-slate-100 pb-2.5 text-[11px] font-medium text-slate-400">
                    <div className="col-span-5">Partner</div>
                    <div className="col-span-4">Success rate</div>
                    <div className="col-span-1 text-right">Orders</div>
                    <div className="col-span-2 text-right">Distance</div>
                  </div>

                  <div className="divide-y divide-slate-100 text-xs">
                    <div className="grid grid-cols-12 items-center gap-2 py-3">
                      <div className="col-span-5 flex min-w-0 items-center gap-2.5">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                          MC
                        </span>
                        <span className="truncate font-semibold text-slate-800">Maya Chen</span>
                      </div>
                      <div className="col-span-4 flex items-center gap-2">
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                          <div className="h-full w-[99%] rounded-full bg-blue-600" />
                        </div>
                        <span className="font-semibold text-slate-700">99%</span>
                      </div>
                      <div className="col-span-1 text-right font-medium text-slate-600">142</div>
                      <div className="col-span-2 whitespace-nowrap text-right font-medium text-slate-600">
                        386 km
                      </div>
                    </div>

                    <div className="grid grid-cols-12 items-center gap-2 py-3">
                      <div className="col-span-5 flex min-w-0 items-center gap-2.5">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-slate-900">
                          EY
                        </span>
                        <span className="truncate font-semibold text-slate-800">Eren Yeager</span>
                      </div>
                      <div className="col-span-4 flex items-center gap-2">
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                          <div className="h-full w-[97%] rounded-full bg-blue-600" />
                        </div>
                        <span className="font-semibold text-slate-700">97%</span>
                      </div>
                      <div className="col-span-1 text-right font-medium text-slate-600">128</div>
                      <div className="col-span-2 whitespace-nowrap text-right font-medium text-slate-600">
                        412 km
                      </div>
                    </div>

                    <div className="grid grid-cols-12 items-center gap-2 py-3">
                      <div className="col-span-5 flex min-w-0 items-center gap-2.5">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-[10px] font-bold text-slate-900">
                          LO
                        </span>
                        <span className="truncate font-semibold text-slate-800">Luis Ortega</span>
                      </div>
                      <div className="col-span-4 flex items-center gap-2">
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                          <div className="h-full w-[95%] rounded-full bg-blue-600" />
                        </div>
                        <span className="font-semibold text-slate-700">95%</span>
                      </div>
                      <div className="col-span-1 text-right font-medium text-slate-600">117</div>
                      <div className="col-span-2 whitespace-nowrap text-right font-medium text-slate-600">
                        351 km
                      </div>
                    </div>

                    <div className="grid grid-cols-12 items-center gap-2 pt-3">
                      <div className="col-span-5 flex min-w-0 items-center gap-1.5">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-pink-400 text-[10px] font-bold text-white">
                          SP
                        </span>
                        <span className="truncate font-semibold text-slate-800">Sam Patterson</span>
                        <span className="shrink-0 rounded bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold text-amber-800">
                          Coach
                        </span>
                      </div>
                      <div className="col-span-4 flex items-center gap-2">
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                          <div className="h-full w-[86%] rounded-full bg-amber-400" />
                        </div>
                        <span className="font-semibold text-slate-700">86%</span>
                      </div>
                      <div className="col-span-1 text-right font-medium text-slate-600">96</div>
                      <div className="col-span-2 whitespace-nowrap text-right font-medium text-slate-600">
                        298 km
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="flex flex-col gap-6 lg:col-span-6">
            <ScrollReveal variant="large-soft" delayMs={150} threshold={0.06}>
              <div className="grid flex-1 grid-cols-1 items-center gap-5 rounded-3xl border border-indigo-100/80 bg-[#F4F6FC] p-5 sm:grid-cols-12 sm:p-6">
                <div className="sm:col-span-5">
                  <h3 className="text-xl font-extrabold tracking-tight text-slate-900">
                    Planned vs actuals
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Compare planned route timing against actual completion to sharpen future schedules.
                  </p>
                </div>

                <div className="sm:col-span-7">
                  <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-lg shadow-slate-900/5">
                    <div className="mb-3 flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="h-3.5 w-1 rounded-full bg-indigo-600" />
                        <span className="text-xs font-bold text-slate-800">Route 4 • Eren Y.</span>
                      </div>
                      <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-800">
                        +18 min
                      </span>
                    </div>

                    <div className="space-y-2.5 text-[11px]">
                      <div className="flex items-center justify-between gap-3">
                        <span className="w-12 shrink-0 font-medium text-slate-400">Planned</span>
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                          <div className="h-full w-[82%] rounded-full bg-pink-500" />
                        </div>
                        <span className="whitespace-nowrap font-semibold text-slate-600">
                          3:00 pm
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        <span className="w-12 shrink-0 font-medium text-slate-400">Actual</span>
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                          <div className="h-full w-[94%] rounded-full bg-blue-600" />
                        </div>
                        <span className="whitespace-nowrap font-semibold text-slate-600">
                          3:18 pm
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="large-soft" delayMs={230} threshold={0.06}>
              <div className="relative grid flex-1 grid-cols-1 items-center gap-5 overflow-hidden rounded-3xl border border-indigo-100/80 bg-[#F4F6FC] p-5 sm:grid-cols-12 sm:p-6">
                <div className="z-10 sm:col-span-6">
                  <h3 className="text-xl font-extrabold tracking-tight text-slate-900">
                    Download CSVs
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Export completed delivery logs into spreadsheets for custom reporting and partner payouts.
                  </p>
                </div>

                <div className="relative sm:col-span-6">
                  <div className="translate-y-1 rotate-2 transform overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-lg shadow-slate-900/10 sm:translate-x-2">
                    <div className="flex items-center gap-1.5 bg-emerald-600 px-3 py-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
                      <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
                      <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
                    </div>
                    <div className="text-[9px] text-slate-600">
                      <div className="grid grid-cols-3 border-b border-emerald-100 bg-emerald-50/90 px-2.5 py-1.5 font-bold text-emerald-950">
                        <span>Route name</span>
                        <span>Scheduled date</span>
                        <span>Partner name</span>
                      </div>
                      <div className="divide-y divide-slate-100">
                        {[1, 2, 3, 4, 5].map((row) => (
                          <div
                            key={row}
                            className="grid grid-cols-3 whitespace-nowrap px-2.5 py-1.5"
                          >
                            <span className="font-medium text-slate-700">HQ Route</span>
                            <span className="text-slate-500">2026-10-01</span>
                            <span className="text-slate-700">Oliver Smith</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================= WORKS WITH YOUR STACK SECTION ================= */}
      <section className="relative border-t border-indigo-100/60 bg-[#F5F7FF] py-12 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="slide-up" threshold={0.08}>
            <div className="mx-auto mb-9 max-w-3xl text-center">
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Works with your stack
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-lg">
                Connect Deliver it with the storefronts, automations, and APIs your operation already uses.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <ScrollReveal variant="large-soft" delayMs={0} threshold={0.08}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-md shadow-indigo-950/[0.03] transition-all duration-200 hover:-translate-y-1 hover:border-indigo-200 sm:p-6">
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <ScrollReveal variant="square-pop" delayMs={70} threshold={0.06}>
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-100 bg-white shadow-xs">
                        <svg className="h-6 w-6" viewBox="0 0 32 32" fill="none">
                          <path
                            d="M23.6 8.3C23.5 8.2 23.3 8.1 23.1 8.1C22.9 8.1 21.4 8 21.4 8C21.4 8 20.1 6.7 20 6.6C19.8 6.4 19.5 6.5 19.3 6.5L18.4 6.8C17.9 5.3 17 3.9 15.3 3.9H15.1C14.6 3.3 14 3 13.4 3C9.6 3 7.8 7.7 7.2 10.1L4.4 11C3.5 11.3 3.5 11.3 3.4 12.2C3.3 12.9 1 30.6 1 30.6L19.6 34L27.5 32.3C27.5 32.3 23.7 8.5 23.6 8.3ZM17.3 7.1L14.5 8C14.5 6.4 14.2 4.8 13.4 3.9C15.1 4.1 16.5 5.4 17.3 7.1ZM12.3 4.2C13 5.1 13.4 6.6 13.4 8.3L9.4 9.5C10.1 7 11.2 4.7 12.3 4.2Z"
                            fill="#95BF47"
                          />
                          <path
                            d="M23.1 8.1C22.9 8.1 21.4 8 21.4 8C21.4 8 20.1 6.7 20 6.6C19.9 6.5 19.8 6.5 19.6 6.5V34L27.5 32.3C27.5 32.3 23.7 8.5 23.6 8.3C23.5 8.2 23.3 8.1 23.1 8.1Z"
                            fill="#5E8E3E"
                          />
                          <path
                            d="M15.4 14.3L14.3 17.6C14.3 17.6 13.3 17.1 12.1 17.1C10.3 17.1 10.2 18.2 10.2 18.5C10.2 20 14.1 20.6 14.1 24.1C14.1 26.9 12.3 28.7 9.9 28.7C7.1 28.7 5.6 26.9 5.6 26.9L6.4 24.4C6.4 24.4 7.9 25.7 9.2 25.7C10.1 25.7 10.4 25 10.4 24.5C10.4 22.6 7.2 22.5 7.2 19.3C7.2 16.6 9.2 14 13.1 14C14.6 14 15.4 14.3 15.4 14.3Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                    </ScrollReveal>
                    <h3 className="text-lg font-extrabold text-slate-900">Shopify</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600">
                    Two-way sync: send orders to Deliver it for route planning and delivery statuses back to Shopify.
                  </p>
                </div>
                <div className="mt-5">
                  <Link
                    href="/integrations/shopify"
                    className="group inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 transition-colors hover:text-blue-700"
                  >
                    <span>Learn more</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="large-soft" delayMs={100} threshold={0.08}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-md shadow-indigo-950/[0.03] transition-all duration-200 hover:-translate-y-1 hover:border-indigo-200 sm:p-6">
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <ScrollReveal variant="square-pop" delayMs={150} threshold={0.06}>
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FF4F00] text-white shadow-xs">
                        <span className="text-[11px] font-extrabold tracking-tight">zapier</span>
                      </div>
                    </ScrollReveal>
                    <h3 className="text-lg font-extrabold text-slate-900">Zapier</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600">
                    Connect 9,000+ apps without code, including WooCommerce, Magento, and Squarespace.
                  </p>
                </div>
                <div className="mt-5">
                  <Link
                    href="/integrations/zapier"
                    className="group inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 transition-colors hover:text-blue-700"
                  >
                    <span>Learn more</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="large-soft" delayMs={200} threshold={0.08}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-md shadow-indigo-950/[0.03] transition-all duration-200 hover:-translate-y-1 hover:border-indigo-200 sm:p-6">
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <ScrollReveal variant="square-pop" delayMs={230} threshold={0.06}>
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-100 bg-white shadow-xs">
                        <svg className="h-6 w-6" viewBox="0 0 32 32" fill="none">
                          <polygon points="16,4 22,7.5 22,14.5 16,18 10,14.5 10,7.5" fill="#FACC15" />
                          <polygon points="22,11 28,14.5 28,21.5 22,25 16,21.5 16,14.5" fill="#3B82F6" />
                          <polygon points="10,11 16,14.5 16,21.5 10,25 4,21.5 4,14.5" fill="#1E3A8A" />
                          <polygon points="16,16 22,19.5 22,26.5 16,30 10,26.5 10,19.5" fill="#F97316" />
                        </svg>
                      </div>
                    </ScrollReveal>
                    <h3 className="text-lg font-extrabold leading-snug text-slate-900">
                      API &amp; webhooks
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600">
                    Send orders in from your own systems and get route progress and delivery updates back.
                  </p>
                </div>
                <div className="mt-5">
                  <Link
                    href="/developers"
                    className="group inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 transition-colors hover:text-blue-700"
                  >
                    <span>Learn more</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="large-soft" delayMs={300} threshold={0.08}>
              <div className="relative flex h-full flex-col justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-md shadow-indigo-950/[0.03] transition-all duration-200 hover:-translate-y-1 hover:border-indigo-200 sm:p-6">
                <span className="absolute right-4 top-4 rounded-full bg-amber-100/80 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-amber-800">
                  NEW
                </span>

                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <ScrollReveal variant="square-pop" delayMs={310} threshold={0.06}>
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-100 bg-white shadow-xs">
                        <svg className="h-6 w-6" viewBox="0 0 32 32" fill="none">
                          <circle
                            cx="13"
                            cy="13"
                            r="6"
                            stroke="#1E293B"
                            strokeWidth="1.6"
                            strokeDasharray="3 2"
                          />
                          <circle cx="13" cy="13" r="3" stroke="#1E293B" strokeWidth="1.4" />
                          <path
                            d="M21 16V26M16 21H26M17.5 17.5L24.5 24.5M24.5 17.5L17.5 24.5"
                            stroke="#D97757"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    </ScrollReveal>
                    <h3 className="text-lg font-extrabold text-slate-900">MCP server</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600">
                    Optimize routes straight from Claude, ChatGPT, or any AI agent.
                  </p>
                </div>
                <div className="mt-5">
                  <Link
                    href="/mcp"
                    className="group inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 transition-colors hover:text-blue-700"
                  >
                    <span>Connect your agent</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================= WORKS ESPECIALLY WELL FOR THESE INDUSTRIES ================= */}
      <section className="relative border-t border-indigo-100/60 bg-[#F6F7FE] py-12 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="slide-up" threshold={0.08}>
            <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-2xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-4xl">
                  Works especially well for these industries
                </h2>
                <p className="mt-2.5 text-sm text-slate-600 sm:text-base">
                  Deliver it is built for local delivery partners. See how it fits your operation.
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => scrollByCards('left')}
                  disabled={!canScrollLeft}
                  aria-label="Scroll industries left"
                  className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all ${
                    canScrollLeft
                      ? 'border-slate-200 bg-white text-slate-800 shadow-sm hover:border-indigo-300 hover:bg-indigo-50/50 active:scale-95'
                      : 'cursor-not-allowed border-slate-200/70 bg-white/60 text-slate-300'
                  }`}
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => scrollByCards('right')}
                  disabled={!canScrollRight}
                  aria-label="Scroll industries right"
                  className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all ${
                    canScrollRight
                      ? 'border-slate-200 bg-white text-slate-800 shadow-sm hover:border-indigo-300 hover:bg-indigo-50/50 active:scale-95'
                      : 'cursor-not-allowed border-slate-200/70 bg-white/60 text-slate-300'
                  }`}
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </ScrollReveal>

          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {INDUSTRIES.map((industry, idx) => (
              <ScrollReveal
                key={industry.id}
                variant="large-soft"
                delayMs={idx * 95}
                threshold={0.06}
                className="w-[85%] shrink-0 snap-start sm:w-[47%] lg:w-[23.6%]"
              >
                <article className="group relative h-[330px] w-full overflow-hidden rounded-3xl bg-slate-900 shadow-md transition-transform duration-300 hover:-translate-y-1 sm:h-[350px]">
                  <img
                    src={industry.image}
                    alt={industry.title}
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/55 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-5 text-white">
                    <h3 className="text-xl font-extrabold tracking-tight">{industry.title}</h3>
                    <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-slate-200 sm:text-sm">
                      {industry.description}
                    </p>
                    <Link
                      href={industry.href}
                      className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-900 shadow-sm transition-all hover:bg-slate-100 active:scale-95"
                    >
                      <span>Explore</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PRE-FOOTER DEMO CTA ================= */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <ScrollReveal variant="large-soft" threshold={0.08}>
          <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-slate-200 bg-white px-5 py-7 text-center shadow-lg sm:px-10 sm:py-8 md:flex-row md:text-left">
            <div>
              <h2 className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-xl font-extrabold tracking-tight text-transparent sm:text-3xl">
                Ready to clean up your delivery routes?
              </h2>
              <p className="mt-1.5 bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600 bg-clip-text text-sm font-medium text-transparent sm:text-base">
                See how Deliver it cuts drive time, stops backtracking, and keeps every partner on schedule.
              </p>
            </div>

            <div className="flex w-full shrink-0 flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center">
              <Link
                href="/demo"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-center text-sm font-semibold text-slate-700 shadow-xs transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-95 sm:w-auto sm:px-7 sm:py-4 sm:text-base"
              >
                <span>Get the demo</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/signup"
                className="inline-flex w-full items-center justify-center rounded-xl border border-indigo-200 bg-indigo-50/70 px-5 py-3.5 text-sm font-semibold text-indigo-700 transition-colors hover:bg-indigo-100 sm:w-auto"
              >
                Start free trial
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ================= FOOTER ================= */}
      <ScrollReveal variant="slide-up" threshold={0.08}>
        <footer className="border-t border-slate-100 bg-white py-7">
          <div className="mx-auto max-w-7xl px-4 text-center text-xs text-slate-500 sm:px-6 lg:px-8">
            <p>&copy; 2026 Deliver it. All rights reserved.</p>
            <p className="mt-1.5">Reliable routing and dispatch for delivery partners.</p>
          </div>
        </footer>
      </ScrollReveal>
    </main>
  );
}