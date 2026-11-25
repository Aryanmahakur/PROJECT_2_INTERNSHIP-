'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check } from 'lucide-react';

type Inquiry = {
  id: string;
  name: string;
  email: string;
  topic: string;
  message: string;
  time: string;
};

const TOPICS = ['Demo', 'Pricing', 'Integrations', 'Support'];

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState(TOPICS[0]);
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState<Inquiry | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please complete all fields.');
      return;
    }

    const item: Inquiry = {
      id: `#${Math.floor(1000 + Math.random() * 9000)}`,
      name: name.trim(),
      email: email.trim(),
      topic,
      message: message.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    try {
      const saved = JSON.parse(
        localStorage.getItem('deliver_it_messages') || '[]'
      );
      saved.unshift(item);
      localStorage.setItem('deliver_it_messages', JSON.stringify(saved));
    } catch {
      // Ignore storage errors
    }

    setSent(item);
    setMessage('');
  };

  return (
    <main className="flex min-h-dvh w-full flex-col justify-between overflow-x-clip bg-black text-zinc-100 selection:bg-amber-400/20 selection:text-amber-200">
      {/* Minimal Top Nav */}
      <header className="w-full border-b border-zinc-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6 sm:py-5 lg:px-10">
          <Link
            href="/"
            className="inline-flex shrink-0 items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" />
            <span>Home</span>
          </Link>

          <Link href="/" className="flex shrink-0 items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <span className="text-sm font-semibold tracking-wide text-white">
              Deliver it
            </span>
          </Link>
        </div>
      </header>

      {/* Full-Height Centered Content */}
      <section className="mx-auto flex w-full max-w-6xl flex-1 items-center px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-12">
        <div className="grid w-full grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left Column */}
          <div className="flex min-w-0 flex-col justify-between space-y-7 sm:space-y-10 lg:col-span-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-300/80">
                Contact
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-5xl">
                Start a{' '}
                <span className="bg-gradient-to-r from-purple-300 via-violet-200 to-amber-200 bg-clip-text text-transparent">
                  conversation
                </span>
              </h1>
              <p className="mt-3.5 text-sm leading-relaxed text-zinc-400 sm:mt-4 sm:text-base">
                Simple route planning, live tracking, and integrations tailored to
                how you deliver.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 border-t border-zinc-800/80 pt-6 text-sm sm:grid-cols-3 sm:gap-5 sm:pt-7 lg:grid-cols-1">
              <div className="min-w-0">
                <p className="text-xs text-zinc-500">Email</p>
                <p className="mt-0.5 break-all font-medium text-zinc-200">
                  hello@deliverit.app
                </p>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-zinc-500">Hours</p>
                <p className="mt-0.5 font-medium text-zinc-200">
                  Mon – Sat · 7:00 AM – 9:00 PM
                </p>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-zinc-500">Location</p>
                <p className="mt-0.5 font-medium text-zinc-200">
                  New York · Remote
                </p>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="min-w-0 lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-between space-y-5 rounded-3xl border border-zinc-800/90 bg-zinc-950 p-4 sm:space-y-6 sm:p-8 lg:p-9"
            >
              {/* Topic Pills */}
              <div className="flex flex-wrap gap-2">
                {TOPICS.map((item) => {
                  const active = topic === item;
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setTopic(item)}
                      className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-medium transition sm:px-4 ${
                        active
                          ? 'bg-amber-400 font-semibold text-zinc-950'
                          : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                <div className="min-w-0">
                  <label htmlFor="name" className="block text-xs text-zinc-400">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Aryan"
                    className="mt-2 w-full min-w-0 rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition focus:border-purple-400/70"
                  />
                </div>

                <div className="min-w-0">
                  <label
                    htmlFor="email"
                    className="block text-xs text-zinc-400"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="aryan@gmail.com"
                    className="mt-2 w-full min-w-0 rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition focus:border-purple-400/70"
                  />
                </div>
              </div>

              <div className="min-w-0">
                <label
                  htmlFor="message"
                  className="block text-xs text-zinc-400"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you're working on..."
                  className="mt-2 w-full min-w-0 rounded-xl border border-zinc-800 bg-zinc-900/70 p-4 text-sm text-white placeholder-zinc-600 outline-none transition focus:border-purple-400/70"
                />
              </div>

              {error && <p className="text-xs text-rose-400">{error}</p>}

              {sent && (
                <div className="flex items-start gap-2.5 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-300 sm:items-center">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 sm:mt-0" />
                  <span className="break-words">
                    Sent {sent.id} · Thanks, {sent.name} ({sent.topic},{' '}
                    {sent.time})
                  </span>
                </div>
              )}

              <div className="pt-1">
                <button
                  type="submit"
                  className="w-full cursor-pointer rounded-xl bg-amber-400 px-6 py-3.5 text-sm font-bold text-zinc-950 transition hover:bg-amber-300 sm:w-auto"
                >
                  Send message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Bottom Footer Anchored to Viewport Bottom */}
      <footer className="w-full border-t border-zinc-900">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-center text-xs text-zinc-500 sm:flex-row sm:px-6 sm:text-left lg:px-10">
          <span>© 2026 Deliver it</span>
          <span>Reliable routing &amp; live tracking</span>
        </div>
      </footer>
    </main>
  );
}