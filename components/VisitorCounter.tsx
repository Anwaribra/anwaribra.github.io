'use client'

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import { usePathname } from 'next/navigation'

// Public site code only, never an API key. An explicitly empty override disables tracking.
const siteCode = process.env.NEXT_PUBLIC_GOATCOUNTER_SITE?.trim() ?? 'anwarmousa'
const base = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(siteCode)
  ? `https://${siteCode}.goatcounter.com`
  : null

type GoatCounter = {
  count: (data: { path: string; title: string; referrer: string }) => void
  filter: () => string | false
}

export default function VisitorCounter() {
  const pathname = usePathname()
  const [ready, setReady] = useState(false)
  const [count, setCount] = useState<string | null>(null)
  const lastPath = useRef<string | null>(null)

  useEffect(() => {
    if (!base || !ready) return
    const goatcounter = (window as Window & { goatcounter?: GoatCounter }).goatcounter
    if (goatcounter && lastPath.current !== pathname) {
      // Omit query strings/referrers and leave session deduplication enabled.
      if (!goatcounter.filter()) {
        goatcounter.count({ path: pathname, title: document.title, referrer: '' })
      }
      lastPath.current = pathname
    }

    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 5000)
    fetch(`${base}/counter/TOTAL.json`, {
      signal: controller.signal,
      credentials: 'omit',
      referrerPolicy: 'no-referrer',
    })
      .then((response) => {
        if (!response.ok) throw new Error('Counter unavailable')
        return response.json()
      })
      .then((data: { count?: unknown }) => {
        if (typeof data.count !== 'string' || !/^\d[\d, .\u00a0\u202f]*$/.test(data.count)) {
          throw new Error('Invalid counter response')
        }
        if (!controller.signal.aborted) setCount(data.count)
      })
      .catch(() => {
        if (!controller.signal.aborted) setCount(null)
      })
      .finally(() => window.clearTimeout(timeout))

    return () => {
      window.clearTimeout(timeout)
      controller.abort()
    }
  }, [pathname, ready])

  if (!base) return null

  return (
    <>
      <Script
        id="goatcounter"
        src="https://gc.zgo.at/count.js"
        strategy="afterInteractive"
        data-goatcounter={`${base}/count`}
        data-goatcounter-settings={JSON.stringify({ no_onload: true })}
        onReady={() => setReady(true)}
        onError={() => { setReady(false); setCount(null) }}
      />
      {count !== null && (
        <span
          className="absolute right-0 -top-1 sm:-top-1.5 text-[9px] sm:text-[10px] font-mono text-zinc-500/70 dark:text-zinc-400/60 select-none tracking-widest pointer-events-none"
          title="Approximate site visits since tracking began. Updates may be delayed by up to four hours."
        >
          {count} visits
        </span>
      )}
    </>
  )
}
