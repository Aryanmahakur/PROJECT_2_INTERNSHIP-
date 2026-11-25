'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  CheckCircle2,
  LogOut,
} from 'lucide-react';

const SESSION_KEY = 'deliver_it_current_session';
const SAVED_USERS_KEY = 'deliver_it_stored_accounts';

type AuthRecord = {
  name: string;
  email: string;
  password: string;
  loggedInAt: string;
};

export default function SignInPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [currentUser, setCurrentUser] = useState<AuthRecord | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load current session if already signed in during this session
  useEffect(() => {
    try {
      const rawSession =
        sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY);
      if (!rawSession) return;

      const parsed: AuthRecord = JSON.parse(rawSession);
      if (parsed?.name && parsed?.email) {
        setCurrentUser(parsed);
        setName(parsed.name);
        setEmail(parsed.email);
        setPassword(parsed.password || '');
      }
    } catch {
      // Ignore malformed storage data
    }
  }, []);

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setFeedback(null);

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName || !cleanEmail || !password) {
      setError('Please enter your name, Gmail/email, and password.');
      return;
    }

    const record: AuthRecord = {
      name: cleanName,
      email: cleanEmail,
      password,
      loggedInAt: new Date().toISOString(),
    };

    try {
      // 1. Store active session (sessionStorage + localStorage so other tabs/pages can read it too)
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(record));
      localStorage.setItem(SESSION_KEY, JSON.stringify(record));

      // 2. Store user credentials in saved accounts map by email
      const rawAccounts = localStorage.getItem(SAVED_USERS_KEY);
      const accounts: Record<string, AuthRecord> = rawAccounts
        ? JSON.parse(rawAccounts)
        : {};
      accounts[cleanEmail] = record;
      localStorage.setItem(SAVED_USERS_KEY, JSON.stringify(accounts));

      // 3. Update active user state -> shows "Hey, {cleanName}"
      setCurrentUser(record);
      setFeedback(`Hey, ${cleanName}! Logged in and session saved.`);

      setTimeout(() => {
        router.push('/');
      }, 650);
    } catch {
      setError('Unable to save login data in browser storage.');
    }
  };

  // Auto-fill stored name & password if user types a previously saved Gmail/email
  const handleEmailChange = (value: string) => {
    setEmail(value);
    const lookupKey = value.trim().toLowerCase();
    if (!lookupKey) return;

    try {
      const rawAccounts = localStorage.getItem(SAVED_USERS_KEY);
      if (!rawAccounts) return;
      const accounts: Record<string, AuthRecord> = JSON.parse(rawAccounts);
      const matched = accounts[lookupKey];
      if (matched) {
        setName(matched.name);
        setPassword(matched.password);
      }
    } catch {
      // Ignore lookup errors
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_KEY);
    setCurrentUser(null);
    setFeedback('Session cleared.');
  };

  return (
    <main className="relative flex min-h-dvh w-full flex-col justify-center overflow-x-clip bg-black px-3 py-8 text-white sm:px-6 sm:py-12 lg:px-8">
      {/* Subtle ambient glow */}
      <div className="pointer-events-none absolute -left-28 top-16 h-64 w-64 rounded-full bg-purple-600/20 blur-[120px] sm:h-80 sm:w-80 sm:blur-[130px]" />
      <div className="pointer-events-none absolute -right-24 bottom-12 h-64 w-64 rounded-full bg-amber-400/15 blur-[120px] sm:h-80 sm:w-80 sm:blur-[130px]" />

      <div className="relative z-10 mx-auto w-full max-w-md min-w-0">
        <Link
          href="/"
          className="mb-4 inline-flex items-center gap-2 text-xs font-medium text-zinc-400 transition-colors hover:text-white sm:mb-6 sm:text-sm"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" />
          <span>Back to Home</span>
        </Link>

        <div className="rounded-3xl border border-white/10 bg-zinc-900/85 p-5 shadow-2xl backdrop-blur-xl sm:p-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="grid h-7 w-7 shrink-0 grid-cols-2 gap-0.5 rounded-md p-0.5">
                <div className="rounded-[3px] bg-purple-500" />
                <div className="rounded-[3px] bg-amber-400" />
                <div className="rounded-[3px] bg-purple-400" />
                <div className="rounded-[3px] bg-amber-500" />
              </div>
              <span className="text-base font-extrabold tracking-tight text-white sm:text-lg">
                Deliver it
              </span>
            </div>

            {currentUser && (
              <span className="max-w-full truncate rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-300">
                Hey, {currentUser.name}
              </span>
            )}
          </div>

          <h1 className="break-words text-xl font-extrabold tracking-tight text-white sm:text-3xl">
            {currentUser ? `Hey, ${currentUser.name}` : 'Sign in'}
          </h1>
          <p className="mt-1.5 text-xs leading-relaxed text-zinc-400 sm:text-sm">
            {currentUser
              ? `Signed in as ${currentUser.email} for this session.`
              : 'Enter your name, Gmail, and password to store and start your session.'}
          </p>

          <form onSubmit={handleLogin} className="mt-5 space-y-4 sm:mt-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-300"
              >
                Name
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Aryan"
                  className="w-full min-w-0 rounded-xl border border-white/10 bg-zinc-950/80 py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-amber-400 sm:py-3"
                />
              </div>
            </div>

            {/* Gmail / Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-300"
              >
                Gmail
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  placeholder="aryan@gmail.com"
                  className="w-full min-w-0 rounded-xl border border-white/10 bg-zinc-950/80 py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-amber-400 sm:py-3"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-300"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full min-w-0 rounded-xl border border-white/10 bg-zinc-950/80 py-2.5 pl-10 pr-11 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-amber-400 sm:py-3"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer p-1 text-zinc-400 transition-colors hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3.5 py-2.5 text-xs font-medium text-rose-300">
                {error}
              </p>
            )}

            {feedback && (
              <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2.5 text-xs font-medium text-emerald-300">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>{feedback}</span>
              </div>
            )}

            <div className="flex flex-col gap-2.5 pt-1">
              <button
                type="submit"
                className="w-full cursor-pointer rounded-xl bg-amber-400 py-3 text-sm font-bold text-zinc-950 shadow-lg shadow-amber-500/20 transition-all hover:-translate-y-0.5 hover:bg-amber-300 active:scale-[0.99] sm:py-3.5"
              >
                {currentUser ? `Continue as ${currentUser.name}` : 'Login & Save'}
              </button>

              {currentUser && (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 bg-zinc-800/70 py-2.5 text-xs font-semibold text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
                >
                  <LogOut className="h-3.5 w-3.5 shrink-0" />
                  <span>End session</span>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}