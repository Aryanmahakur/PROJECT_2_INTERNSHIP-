'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Menu, X, RotateCcw } from 'lucide-react';

mapboxgl.accessToken =
  'pk.eyJ1IjoibWFoYWt1cmFyeWFuIiwiYSI6ImNtd2praXgyNTA0dGMyeHM4Z3M1ZTRya3EifQ.Ajxe9WO0Pwn1LgDXHx5Tmw';

type LocationOption = {
  label: string;
  coords: string;
};

type PredictionResult = {
  originName: string;
  destName: string;
  distanceKm: string;
  travelMins: number;
  prepMins: number;
  totalMins: number;
  etaClock: string;
};

const REGISTERED_RESTAURANTS: LocationOption[] = [
  { label: 'Ghazal Restaurant — Sector 17', coords: '30.7398, 76.7827' },
  { label: 'Chawlas 2 Dhaba — Sector 22', coords: '30.7345, 76.7752' },
  { label: 'Katani Dhaba — Sector 8', coords: '30.7524, 76.7875' },
  { label: 'Amritsari Zaika — Sector 37', coords: '30.7258, 76.7684' },
  { label: 'Buffet Hut — Sector 9', coords: '30.7462, 76.7918' },
  { label: 'Anpurna Rasoi — Sector 32', coords: '30.7289, 76.7745' },
  { label: 'Amu Rasoi — Sector 23', coords: '30.7376, 76.7662' },
  { label: 'Goldies Roost — Sector 8B', coords: '30.7489, 76.7782' },
  { label: 'City Heart 2 — Sector 22B', coords: '30.7318, 76.7812' },
  { label: 'Khalbelly Restaurant — Sector 33', coords: '30.7224, 76.7788' },
  { label: 'Jeet Chinese Food — Sector 19', coords: '30.7354, 76.7860' },
  { label: 'Kumar Rasoi — Sector 37C', coords: '30.7272, 76.7615' },
  { label: 'Icon Kitchen — Sector 8C', coords: '30.7445, 76.7852' },
  { label: 'Dil Desi — Sector 32D', coords: '30.7305, 76.7640' },
  { label: '20-20 Punjabi Restaurant — Sector 22D', coords: '30.7382, 76.7718' },
];

const REGISTERED_FLATS: LocationOption[] = [
  { label: 'Shivalik Enclave Flats — Sector 22', coords: '30.7333, 76.7794' },
  { label: 'Rosewood Apartments — Sector 16', coords: '30.7415, 76.7895' },
  { label: 'Sukanya Residency Flats — Sector 35', coords: '30.7265, 76.7720' },
  { label: 'Sukhna View Flats — Sector 7', coords: '30.7480, 76.7950' },
  { label: 'Green Valley Flats — Sector 38', coords: '30.7210, 76.7655' },
  { label: 'Panchsheel Heights — Sector 10', coords: '30.7535, 76.7820' },
  { label: 'Aroma Greens Flats — Sector 20', coords: '30.7295, 76.7865' },
  { label: 'Harmony Residency — Sector 44', coords: '30.7185, 76.7740' },
  { label: 'Kailash Enclave Flats — Sector 15', coords: '30.7432, 76.7725' },
  { label: 'Silver Oak Flats — Sector 34', coords: '30.7248, 76.7842' },
  { label: 'Tagore Garden Flats — Sector 11', coords: '30.7502, 76.7710' },
  { label: 'Lotus Towers Flats — Sector 46', coords: '30.7165, 76.7815' },
  { label: 'Citi Crown Flats — Sector 18', coords: '30.7368, 76.7928' },
  { label: 'Vrindavan Flats — Sector 42', coords: '30.7198, 76.7605' },
  { label: 'Oakwood Chambers — Sector 14', coords: '30.7458, 76.7665' },
];

function parseLatLng(input: string): [number, number] | null {
  const parts = input.split(',').map((s) => parseFloat(s.trim()));
  if (parts.length < 2 || Number.isNaN(parts[0]) || Number.isNaN(parts[1])) {
    return null;
  }
  return [parts[0], parts[1]];
}

function formatArrivalClock(totalMinutes: number): string {
  const arrival = new Date(Date.now() + totalMinutes * 60000);
  const formatted = arrival
    .toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
    .toUpperCase();
  return `~${formatted}`;
}

export default function LiveMapPage(): React.ReactElement {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const restMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const custMarkerRef = useRef<mapboxgl.Marker | null>(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [mode, setMode] = useState<'registered' | 'custom'>('registered');
  const [selectedRestaurantIdx, setSelectedRestaurantIdx] = useState(0);
  const [selectedFlatIdx, setSelectedFlatIdx] = useState(0);

  const [restaurantCoords, setRestaurantCoords] = useState(
    REGISTERED_RESTAURANTS[0].coords
  );
  const [customerCoords, setCustomerCoords] = useState(
    REGISTERED_FLATS[0].coords
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const mapInstance = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [76.7794, 30.7333],
      zoom: 12.5,
    });

    mapInstance.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      'top-right'
    );

    const rMarker = new mapboxgl.Marker({ color: '#22c55e', draggable: true })
      .setLngLat([76.7827, 30.7398])
      .addTo(mapInstance);

    const cMarker = new mapboxgl.Marker({ color: '#f43f5e', draggable: true })
      .setLngLat([76.7794, 30.7333])
      .addTo(mapInstance);

    const handleDragEnd = () => {
      const rPos = rMarker.getLngLat();
      const cPos = cMarker.getLngLat();
      setRestaurantCoords(`${rPos.lat.toFixed(4)}, ${rPos.lng.toFixed(4)}`);
      setCustomerCoords(`${cPos.lat.toFixed(4)}, ${cPos.lng.toFixed(4)}`);
      setMode('custom');
      setResult(null);
      setError(null);
    };

    rMarker.on('dragend', handleDragEnd);
    cMarker.on('dragend', handleDragEnd);

    mapRef.current = mapInstance;
    restMarkerRef.current = rMarker;
    custMarkerRef.current = cMarker;

    return () => {
      mapInstance.remove();
      mapRef.current = null;
      restMarkerRef.current = null;
      custMarkerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      mapRef.current?.resize();
    }, 50);
    return () => clearTimeout(timer);
  }, [result]);

  const syncMarkersFromCoords = (rStr: string, cStr: string) => {
    const rParsed = parseLatLng(rStr);
    const cParsed = parseLatLng(cStr);
    if (rParsed && restMarkerRef.current) {
      restMarkerRef.current.setLngLat([rParsed[1], rParsed[0]]);
    }
    if (cParsed && custMarkerRef.current) {
      custMarkerRef.current.setLngLat([cParsed[1], cParsed[0]]);
    }
  };

  const handleSelectRestaurant = (idx: number) => {
    setSelectedRestaurantIdx(idx);
    const nextCoords = REGISTERED_RESTAURANTS[idx].coords;
    setRestaurantCoords(nextCoords);
    setResult(null);
    setError(null);
    syncMarkersFromCoords(nextCoords, customerCoords);
  };

  const handleSelectFlat = (idx: number) => {
    setSelectedFlatIdx(idx);
    const nextCoords = REGISTERED_FLATS[idx].coords;
    setCustomerCoords(nextCoords);
    setResult(null);
    setError(null);
    syncMarkersFromCoords(restaurantCoords, nextCoords);
  };

  const handleReset = () => {
    setError(null);
    setResult(null);
    setMode('registered');
    setSelectedRestaurantIdx(0);
    setSelectedFlatIdx(0);

    const defaultR = REGISTERED_RESTAURANTS[0].coords;
    const defaultC = REGISTERED_FLATS[0].coords;
    setRestaurantCoords(defaultR);
    setCustomerCoords(defaultC);

    restMarkerRef.current?.setLngLat([76.7827, 30.7398]);
    custMarkerRef.current?.setLngLat([76.7794, 30.7333]);

    const mapInstance = mapRef.current;
    if (mapInstance && mapInstance.getSource('route')) {
      (mapInstance.getSource('route') as mapboxgl.GeoJSONSource).setData({
        type: 'FeatureCollection',
        features: [],
      });
    }
    mapInstance?.flyTo({ center: [76.7794, 30.7333], zoom: 12.5 });
  };

  const handleCalculateAndPredict = async () => {
    setError(null);

    const rParsed = parseLatLng(restaurantCoords);
    const cParsed = parseLatLng(customerCoords);

    if (!rParsed || !cParsed) {
      setError('Enter valid latitude and longitude coordinates.');
      return;
    }

    const [rLat, rLng] = rParsed;
    const [cLat, cLng] = cParsed;

    setLoading(true);
    try {
      restMarkerRef.current?.setLngLat([rLng, rLat]);
      custMarkerRef.current?.setLngLat([cLng, cLat]);

      const mapboxUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${rLng},${rLat};${cLng},${cLat}?geometries=geojson&access_token=${mapboxgl.accessToken}`;
      const mapboxRes = await fetch(mapboxUrl);
      const mapboxData = await mapboxRes.json();

      if (!mapboxData.routes || mapboxData.routes.length === 0) {
        setError('No route found between these points.');
        return;
      }

      const route = mapboxData.routes[0];
      const distanceKm = route.distance / 1000;
      const travelMins = Math.round(route.duration / 60);

      const mapInstance = mapRef.current;
      if (mapInstance) {
        const geojson: GeoJSON.Feature<GeoJSON.LineString> = {
          type: 'Feature',
          properties: {},
          geometry: route.geometry,
        };

        if (mapInstance.getSource('route')) {
          (mapInstance.getSource('route') as mapboxgl.GeoJSONSource).setData(geojson);
        } else if (mapInstance.isStyleLoaded()) {
          mapInstance.addLayer({
            id: 'route',
            type: 'line',
            source: { type: 'geojson', data: geojson },
            layout: { 'line-join': 'round', 'line-cap': 'round' },
            paint: { 'line-color': '#a855f7', 'line-width': 5 },
          });
        }

        const bounds = new mapboxgl.LngLatBounds();
        for (const coord of route.geometry.coordinates as [number, number][]) {
          bounds.extend(coord);
        }
        mapInstance.fitBounds(bounds, { padding: 60, maxZoom: 15 });
      }

      const mlRes = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          restaurant_lat: rLat,
          restaurant_lng: rLng,
          customer_lat: cLat,
          customer_lng: cLng,
          distance_km: distanceKm,
        }),
      });

      if (!mlRes.ok) {
        throw new Error('Backend error');
      }

      const mlData = await mlRes.json();
      const prepMins = Math.round(Number(mlData.prep_time_minutes) || 0);
      const totalMins = Math.round(route.duration / 60 + prepMins);

      const originName =
        mode === 'registered'
          ? REGISTERED_RESTAURANTS[selectedRestaurantIdx].label
          : `Pickup (${restaurantCoords.trim()})`;
      const destName =
        mode === 'registered'
          ? REGISTERED_FLATS[selectedFlatIdx].label
          : `Dropoff (${customerCoords.trim()})`;

      setResult({
        originName,
        destName,
        distanceKm: `${distanceKm.toFixed(2)} km`,
        travelMins,
        prepMins,
        totalMins,
        etaClock: formatArrivalClock(totalMins),
      });
    } catch (err) {
      console.error(err);
      setError('Could not reach prediction server on port 8000.');
    } finally {
      setLoading(false);
    }
  };

  const selectClass =
    'h-[46px] w-full min-w-0 cursor-pointer appearance-none rounded-2xl border border-white/10 bg-zinc-950/90 bg-[url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23a1a1aa%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpath d=%27m6 9 6 6 6-6%27/%3E%3C/svg%3E")] bg-[length:16px_16px] bg-[right_14px_center] bg-no-repeat pl-3.5 pr-9 text-[13px] font-semibold text-white outline-none transition-all duration-200 hover:border-white/20 focus:border-amber-400/70 focus:bg-zinc-950 focus:ring-4 focus:ring-amber-400/15 sm:pl-4 sm:pr-10';

  const inputClass =
    'h-[46px] w-full min-w-0 rounded-2xl border border-white/10 bg-zinc-950/90 px-3.5 font-mono text-xs text-white outline-none transition-all duration-200 hover:border-white/20 focus:border-amber-400/70 focus:bg-zinc-950 focus:ring-4 focus:ring-amber-400/15 sm:px-4';

  return (
    <main className="relative flex min-h-screen w-full flex-col overflow-x-clip bg-[#09090b] font-sans text-zinc-100 antialiased selection:bg-amber-400 selection:text-zinc-950">
      <style jsx global>{`
        @keyframes panFlip {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          40% {
            transform: translateY(-7px) rotate(-9deg);
          }
          70% {
            transform: translateY(-3px) rotate(5deg);
          }
        }
        @keyframes steamRise {
          0% {
            transform: translateY(4px) scale(0.85);
            opacity: 0;
          }
          45% {
            opacity: 0.75;
          }
          100% {
            transform: translateY(-10px) scale(1.1);
            opacity: 0;
          }
        }
        .animate-pan-flip {
          animation: panFlip 1.4s ease-in-out infinite;
          transform-origin: center;
        }
        .animate-steam-1 {
          animation: steamRise 1.7s ease-out infinite;
        }
        .animate-steam-2 {
          animation: steamRise 1.7s ease-out 0.55s infinite;
        }
        .animate-steam-3 {
          animation: steamRise 1.7s ease-out 1.1s infinite;
        }
      `}</style>

      {/* Subtle Top Radial Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(ellipse_75%_50%_at_50%_-10%,rgba(139,92,246,0.24),rgba(245,158,11,0.08),transparent)]"
      />

      {/* ================= NON-STICKY DARK GLASS HEADER ================= */}
      <header className="relative z-50 mx-auto w-full max-w-6xl px-3 pt-3 sm:px-6 sm:pt-4 lg:px-8">
        <div className="flex items-center justify-between gap-2 rounded-full border border-white/10 bg-zinc-900/80 px-3.5 py-2.5 shadow-2xl backdrop-blur-xl sm:px-6 sm:py-3">
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
            <Link href="/capabilities" className="whitespace-nowrap transition-colors hover:text-white">
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

          <div className="flex shrink-0 items-center gap-2 sm:gap-4 lg:gap-5">
            <Link
              href="/demo"
              className="hidden whitespace-nowrap text-sm font-medium text-zinc-400 transition-colors hover:text-white sm:inline-block"
            >
              Book a demo
            </Link>
            <a
              href="#predictor"
              className="whitespace-nowrap rounded-full bg-amber-400 px-3.5 py-2 text-xs font-bold text-zinc-950 shadow-lg shadow-amber-500/20 transition-all hover:-translate-y-0.5 hover:bg-amber-300 sm:px-5 sm:text-sm"
            >
              Try Live Demo
            </a>
            <button
              type="button"
              aria-label="Toggle Menu"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/15 text-zinc-300 md:hidden"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="mt-2 rounded-3xl border border-white/10 bg-zinc-900/95 p-5 shadow-2xl backdrop-blur-xl md:hidden">
            <div className="flex flex-col space-y-3 text-sm font-medium text-zinc-300">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
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
              <a
                href="#predictor"
                onClick={() => setMobileMenuOpen(false)}
                className="pt-2 font-semibold text-white"
              >
                Try Live Demo →
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ================= HERO ================= */}
      <section className="mx-auto mt-6 w-full max-w-[780px] px-4 pb-5 text-center sm:mt-8 sm:px-5 sm:pb-6">
        <h1 className="text-[26px] font-extrabold leading-[1.12] tracking-[-0.025em] text-white sm:text-[42px]">
          Predict real delivery time along
          <span className="mt-1 block bg-gradient-to-r from-violet-300 via-purple-200 to-amber-200 bg-clip-text text-transparent">
            every delivery path
          </span>
        </h1>
        <p className="mx-auto mt-3 max-w-[560px] text-xs leading-relaxed text-zinc-400 sm:text-sm">
          Mapbox driving routes paired with food preparation estimates to forecast total arrival time.
        </p>
      </section>

      {/* ================= WORKBENCH ================= */}
      <section id="predictor" className="mx-auto w-full max-w-6xl flex-1 px-3 pb-10 sm:px-6 sm:pb-12 lg:px-8">
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-zinc-900/70 p-3 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:p-5">
          {/* Subtle corner accent glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-purple-600/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 right-1/3 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl"
          />

          <div className="relative grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-[1fr_1.18fr]">
            {/* Top-Aligned Controls & Results Panel */}
            <div className="flex min-w-0 flex-col justify-start gap-4 rounded-[22px] border border-white/10 bg-gradient-to-b from-white/[0.04] to-zinc-950/80 p-4 sm:gap-5 sm:p-6">
              <div className="flex flex-col gap-3.5 sm:gap-4">
                {/* Mode Segmented Control + Reset */}
                <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap sm:gap-2.5">
                  <div
                    role="tablist"
                    className="grid w-full flex-1 grid-cols-2 gap-1 rounded-full border border-white/10 bg-zinc-950 p-1 sm:w-auto"
                  >
                    <button
                      type="button"
                      role="tab"
                      aria-selected={mode === 'registered'}
                      onClick={() => {
                        setMode('registered');
                        setError(null);
                        setResult(null);
                        const r = REGISTERED_RESTAURANTS[selectedRestaurantIdx].coords;
                        const c = REGISTERED_FLATS[selectedFlatIdx].coords;
                        setRestaurantCoords(r);
                        setCustomerCoords(c);
                        syncMarkersFromCoords(r, c);
                      }}
                      className={`cursor-pointer rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
                        mode === 'registered'
                          ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-md shadow-purple-600/25'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      Registered
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={mode === 'custom'}
                      onClick={() => {
                        setMode('custom');
                        setError(null);
                        setResult(null);
                      }}
                      className={`cursor-pointer rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
                        mode === 'custom'
                          ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-md shadow-purple-600/25'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      Custom
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleReset}
                    title="Reset route & pins"
                    className="inline-flex h-[34px] shrink-0 cursor-pointer items-center gap-1.5 rounded-full border border-white/10 bg-zinc-950 px-3.5 text-xs font-semibold text-zinc-400 transition-all hover:border-white/25 hover:text-white"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Reset</span>
                  </button>
                </div>

                {/* Inputs */}
                {mode === 'registered' ? (
                  <div className="flex flex-col gap-3.5">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="registered-restaurant"
                        className="flex items-center justify-between gap-2 text-[11px] font-bold uppercase tracking-[0.06em] text-zinc-400"
                      >
                        <span className="flex items-center gap-2">
                          <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
                          <span>Restaurant</span>
                        </span>
                        <span className="font-mono text-[10px] font-normal text-zinc-500">
                          PICKUP
                        </span>
                      </label>
                      <select
                        id="registered-restaurant"
                        value={selectedRestaurantIdx}
                        onChange={(e) => handleSelectRestaurant(Number(e.target.value))}
                        className={selectClass}
                      >
                        {REGISTERED_RESTAURANTS.map((item, idx) => (
                          <option key={item.label} value={idx} className="bg-zinc-950 text-white">
                            {item.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="registered-flat"
                        className="flex items-center justify-between gap-2 text-[11px] font-bold uppercase tracking-[0.06em] text-zinc-400"
                      >
                        <span className="flex items-center gap-2">
                          <span className="h-2 w-2 shrink-0 rounded-full bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.7)]" />
                          <span>Residence</span>
                        </span>
                        <span className="font-mono text-[10px] font-normal text-zinc-500">
                          DROPOFF
                        </span>
                      </label>
                      <select
                        id="registered-flat"
                        value={selectedFlatIdx}
                        onChange={(e) => handleSelectFlat(Number(e.target.value))}
                        className={selectClass}
                      >
                        {REGISTERED_FLATS.map((item, idx) => (
                          <option key={item.label} value={idx} className="bg-zinc-950 text-white">
                            {item.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3.5">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="restaurant-coords"
                        className="flex items-center justify-between gap-2 text-[11px] font-bold uppercase tracking-[0.06em] text-zinc-400"
                      >
                        <span className="flex items-center gap-2">
                          <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
                          <span>Pickup (lat, lng)</span>
                        </span>
                        <span className="font-mono text-[10px] font-normal text-zinc-500">
                          ORIGIN
                        </span>
                      </label>
                      <input
                        id="restaurant-coords"
                        type="text"
                        value={restaurantCoords}
                        onChange={(e) => {
                          setRestaurantCoords(e.target.value);
                          setResult(null);
                        }}
                        className={inputClass}
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="customer-coords"
                        className="flex items-center justify-between gap-2 text-[11px] font-bold uppercase tracking-[0.06em] text-zinc-400"
                      >
                        <span className="flex items-center gap-2">
                          <span className="h-2 w-2 shrink-0 rounded-full bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.7)]" />
                          <span>Dropoff (lat, lng)</span>
                        </span>
                        <span className="font-mono text-[10px] font-normal text-zinc-500">
                          DESTINATION
                        </span>
                      </label>
                      <input
                        id="customer-coords"
                        type="text"
                        value={customerCoords}
                        onChange={(e) => {
                          setCustomerCoords(e.target.value);
                          setResult(null);
                        }}
                        className={inputClass}
                      />
                    </div>
                  </div>
                )}

                {/* Primary CTA */}
                <button
                  type="button"
                  disabled={loading}
                  onClick={handleCalculateAndPredict}
                  className="mt-1 h-[46px] w-full cursor-pointer rounded-2xl bg-amber-400 px-5 text-sm font-extrabold text-zinc-950 shadow-lg shadow-amber-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-300 disabled:cursor-wait disabled:opacity-70"
                >
                  {loading ? 'Flipping the Tawa...' : 'Calculate & Predict'}
                </button>

                {error && (
                  <div
                    role="alert"
                    className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-3.5 py-2.5 text-xs font-semibold text-rose-300"
                  >
                    {error}
                  </div>
                )}
              </div>

              {/* Funny "We Cooking" Placeholder When No Result Yet */}
              {!result && (
                <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-zinc-950/60 px-4 py-6 text-center">
                  {/* Animated Steam + Tawa/Pan */}
                  <div className="relative mb-2 flex h-12 w-14 flex-col items-center justify-end">
                    <div className="mb-0.5 flex gap-2">
                      <span className="animate-steam-1 h-2.5 w-1 rounded-full bg-purple-300/80" />
                      <span className="animate-steam-2 h-3 w-1 rounded-full bg-amber-300/80" />
                      <span className="animate-steam-3 h-2.5 w-1 rounded-full bg-purple-300/80" />
                    </div>
                    <svg
                      viewBox="0 0 64 28"
                      fill="none"
                      className="animate-pan-flip h-6 w-12"
                      aria-hidden="true"
                    >
                      <ellipse
                        cx="26"
                        cy="14"
                        rx="18"
                        ry="6"
                        fill="#27272a"
                        stroke="#a855f7"
                        strokeWidth="2.2"
                      />
                      <ellipse
                        cx="26"
                        cy="12"
                        rx="13"
                        ry="3.5"
                        fill="#fbbf24"
                        fillOpacity="0.85"
                      />
                      <path
                        d="M44 14L59 17"
                        stroke="#fbbf24"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  <p className="text-xs font-extrabold tracking-wide text-white">
                    {loading
                      ? 'We cooking, please wait... 🔥'
                      : 'We cooking, please wait... (or hit Calculate!)'}
                  </p>
                  <p className="mt-1 max-w-[250px] text-[11px] leading-relaxed text-zinc-400">
                    {loading
                      ? 'Tossing masala into the ML model & checking traffic signals.'
                      : 'Pick your spot and press Calculate & Predict before the rider eats your fries.'}
                  </p>
                </div>
              )}

              {result && (
                <div
                  className="flex flex-col gap-3 border-t border-white/10 pt-4"
                  aria-live="polite"
                >
                  <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-zinc-950/80 px-3.5 py-3">
                    <div className="flex items-center gap-2.5 text-xs font-semibold text-white">
                      <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
                      <span className="truncate">{result.originName}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs font-semibold text-white">
                      <span className="h-2 w-2 shrink-0 rounded-full bg-rose-400" />
                      <span className="truncate">{result.destName}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                    <div className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-zinc-950/80 px-3 py-2.5">
                      <span className="text-[10px] font-bold uppercase tracking-[0.06em] text-zinc-500">
                        Distance
                      </span>
                      <span className="font-mono text-xs font-bold text-white">
                        {result.distanceKm}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-zinc-950/80 px-3 py-2.5">
                      <span className="text-[10px] font-bold uppercase tracking-[0.06em] text-zinc-500">
                        Travel
                      </span>
                      <span className="font-mono text-xs font-bold text-white">
                        {result.travelMins} min
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-zinc-950/80 px-3 py-2.5">
                      <span className="text-[10px] font-bold uppercase tracking-[0.06em] text-zinc-500">
                        Prep
                      </span>
                      <span className="font-mono text-xs font-bold text-white">
                        {result.prepMins} min
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 rounded-2xl border border-amber-400/30 bg-gradient-to-r from-purple-950/70 via-zinc-900 to-amber-950/40 px-4 py-3.5">
                    <div className="flex min-w-0 flex-col gap-1">
                      <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-amber-300">
                        Estimated Delivery Time
                      </span>
                      <span className="font-mono text-xs font-bold tracking-wide text-white sm:text-sm">
                        Arrival {result.etaClock}
                      </span>
                    </div>
                    <div className="flex shrink-0 flex-col items-end">
                      <span className="text-[10px] font-bold uppercase tracking-[0.06em] text-zinc-400">
                        Total Duration
                      </span>
                      <span className="font-mono text-lg font-extrabold text-amber-400 sm:text-xl">
                        {result.totalMins} min
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Interactive Mapbox Canvas */}
            <div className="relative min-h-[360px] min-w-0 overflow-hidden rounded-[22px] border border-white/10 bg-zinc-950 sm:min-h-[460px] lg:min-h-[540px]">
              <div
                ref={mapContainerRef}
                className="h-full min-h-[360px] w-full sm:min-h-[460px] lg:min-h-[540px]"
              />

              {/* Top-left floating pin legend */}
              <div className="pointer-events-none absolute left-3 top-3 z-10 flex flex-wrap items-center gap-2 rounded-full border border-white/15 bg-zinc-950/85 px-3 py-1.5 text-[11px] font-semibold text-zinc-200 shadow-lg backdrop-blur-md sm:left-3.5 sm:top-3.5 sm:gap-3 sm:px-3.5">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span>Restaurant </span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-rose-400" />
                  <span>Dropoff</span>
                </span>
                <span className="hidden text-zinc-500 sm:inline">• Drag pins</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 px-4 py-6 text-center text-xs text-zinc-500">
        <div>&copy; 2026 Deliver it. All rights reserved.</div>
        <div className="mt-1">Reliable routing and dispatch for delivery partners.</div>
      </footer>
    </main>
  );
}