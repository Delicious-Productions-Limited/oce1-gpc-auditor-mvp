'use client'

import { useState, useMemo, type FormEvent } from 'react'

const PLANS = [
  { label: 'Starter', price: '49', priceId: '49' },
  { label: 'Pro', price: '99', priceId: '99' },
  { label: 'Agency', price: '199', priceId: '199' },
]

function normalizeUrl(raw: string): string {
  if (!raw) return ''
  let u = raw.trim()
  if (!/^https?:\/\//i.test(u)) u = 'https://' + u
  try {
    return new URL(u).toString()
  } catch {
    return u
  }
}

export function CheckoutForm({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const [url, setUrl] = useState('')
  const [selectedPlan, setSelectedPlan] = useState('49')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const normalized = useMemo(() => normalizeUrl(url), [url])

  const handleSubmit = async (e: FormEvent, confirmLive = false) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: normalized, priceId: selectedPlan, confirmLive }),
      })
      const data = await res.json()
      if (data.needsLiveConfirm) {
        if (confirm('Test keys missing. Use LIVE keys?')) {
          return handleSubmit(e, true)
        }
        setLoading(false)
        return
      }
      if (!res.ok) throw new Error(data.error || 'Checkout failed')
      if (data.url) window.location.href = data.url
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const isDark = variant === 'dark'

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-2xl border p-6 ${isDark ? 'bg-zinc-800/60 border-white/10' : 'bg-white border-zinc-200'}`}
    >
      <div className="mb-4">
        <label className={`mb-1.5 block text-sm font-medium ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
          Site URL
        </label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="example.com"
          className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:ring-2 ${isDark ? 'bg-zinc-900/60 border-white/10 text-white placeholder:text-zinc-500 focus:ring-white/20' : 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:ring-blue-500/20'}`}
          required
        />
        {url && (
          <p className={`mt-1.5 truncate text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
            Normalized: {normalized}
          </p>
        )}
      </div>
      <div className="mb-5">
        <label className={`mb-1.5 block text-sm font-medium ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
          Plan
        </label>
        <div className="grid grid-cols-3 gap-2">
          {PLANS.map((plan) => (
            <button
              key={plan.priceId}
              type="button"
              onClick={() => setSelectedPlan(plan.priceId)}
              className={`rounded-lg border px-3 py-2 text-center text-sm font-medium transition ${
                selectedPlan === plan.priceId
                  ? 'border-blue-500 bg-blue-500 text-white'
                  : isDark
                    ? 'border-white/10 text-zinc-300 hover:border-white/20'
                    : 'border-zinc-200 text-zinc-700 hover:border-zinc-300'
              }`}
            >
              {'$'}{plan.price}/mo
            </button>
          ))}
        </div>
      </div>
      {error && (
        <p className="mb-3 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">{error}</p>
      )}
      <button
        type="submit"
        disabled={loading || !url}
        className="w-full rounded-lg bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Redirecting...' : 'Unlock audit'}
      </button>
    </form>
  )
}
