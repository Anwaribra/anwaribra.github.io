'use client'

import React, { useLayoutEffect, useRef, useState } from 'react'
import { animate, motion, useMotionValue } from 'framer-motion'

type Item = { name: string; href: string }

/**
 * Two separate glass pills. The active highlight is a blob that stretches across the gap
 * (SVG goo filter merges it with the pill shapes), then settles on the new tab.
 */
export default function GooeyNav({ items, active, onSelect }: { items: Item[]; active: number; onSelect: (i: number) => void }) {
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const x = useMotionValue(0)
  const w = useMotionValue(0)
  const first = useRef(true)
  const prev = useRef(active)
  const [ready, setReady] = useState(false)
  const [pos, setPos] = useState<{ l: number; w: number }[]>([])

  useLayoutEffect(() => {
    const el = refs.current[active]
    if (!el) return
    setPos(refs.current.map((r) => ({ l: r?.offsetLeft ?? 0, w: r?.offsetWidth ?? 0 })))
    const nx = el.offsetLeft, nw = el.offsetWidth
    if (first.current) {
      x.set(nx); w.set(nw); first.current = false; setReady(true); return
    }
    const from = refs.current[prev.current]
    prev.current = active
    if (!from) { x.set(nx); w.set(nw); return }
    const ox = x.get(), ow = w.get()
    const left = Math.min(ox, nx), right = Math.max(ox + ow, nx + nw)
    // Stretch to cover both pills, then contract onto the target.
    const a = animate(w, [ow, right - left, nw], { duration: 0.55, times: [0, 0.45, 1], ease: 'easeInOut' })
    const b = animate(x, [ox, left, nx], { duration: 0.55, times: [0, 0.45, 1], ease: 'easeInOut' })
    return () => { a.stop(); b.stop() }
  }, [active, x, w])

  return (
    <nav aria-label="Main navigation" className="gooey-nav relative flex items-center gap-3">
      <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
        <defs>
          <filter id="gooey-nav-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="b" />
            <feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9" result="g" />
            <feComposite in="SourceGraphic" in2="g" operator="atop" />
          </filter>
        </defs>
      </svg>
      {/* goo layer: pill shapes + moving blob */}
      <div className="gooey-layer absolute inset-0 pointer-events-none" style={{ filter: 'url(#gooey-nav-filter)' }} aria-hidden="true">
        {items.map((_, i) => (
          <span key={i} className="gooey-shape absolute top-0 bottom-0 rounded-full" style={{ left: pos[i]?.l ?? 0, width: pos[i]?.w ?? 0 }} />
        ))}
        {ready && <motion.span className="gooey-blob absolute top-0 bottom-0 rounded-full" style={{ x, width: w }} />}
      </div>
      {items.map((it, i) => (
        <button
          key={it.name}
          ref={(el) => { refs.current[i] = el }}
          type="button"
          onClick={() => i !== active && onSelect(i)}
          aria-current={i === active ? 'page' : undefined}
          className={`gooey-tab relative z-10 rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-300 ${i === active ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'}`}
        >
          {it.name}
        </button>
      ))}
    </nav>
  )
}
