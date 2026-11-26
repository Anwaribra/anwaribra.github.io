'use client'

import React, { useLayoutEffect, useRef, useState } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'

type Item = { name: string; href: string }

// Header remounts on every route change, so remember where the blob was last.
let last: { l: number; r: number; i: number } | null = null

const LEAD = { type: 'spring', stiffness: 520, damping: 30, mass: 0.7 } as const
const LAG = { type: 'spring', stiffness: 85, damping: 13, mass: 0.9 } as const

/**
 * Two separate soft pills. The active highlight is a blob whose two edges are independent springs:
 * the leading edge snaps across the gap, the trailing edge lags and stretches, the blob thins in the
 * middle like a pulled strand, then snaps onto the new tab. An SVG goo filter merges it with the pills.
 */
export default function GooeyNav({ items, active, onSelect }: { items: Item[]; active: number; onSelect: (i: number) => void }) {
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const left = useMotionValue(0)
  const right = useMotionValue(0)
  const targetW = useRef(1)
  const width = useTransform([left, right], ([l, r]: number[]) => Math.max(0, r - l))
  const thin = useTransform([left, right], ([l, r]: number[]) => Math.max(0.45, 1 - Math.max(0, r - l - targetW.current) / (targetW.current * 3.2)))
  const first = useRef(true)
  const prev = useRef(active)
  const [ready, setReady] = useState(false)
  const [pos, setPos] = useState<{ l: number; w: number }[]>([])

  useLayoutEffect(() => {
    const el = refs.current[active]
    if (!el) return
    setPos(refs.current.map((r) => ({ l: r?.offsetLeft ?? 0, w: r?.offsetWidth ?? 0 })))
    const nl = el.offsetLeft, nr = nl + el.offsetWidth
    targetW.current = el.offsetWidth
    const start = last
    last = { l: nl, r: nr, i: active }
    if (first.current) {
      first.current = false
      if (start && start.i !== active) {
        left.jump(start.l); right.jump(start.r); setReady(true)
        const goingRight = active > start.i
        const a = animate(left, nl, goingRight ? LAG : LEAD)
        const b = animate(right, nr, goingRight ? LEAD : LAG)
        return () => { a.stop(); b.stop() }
      }
      left.jump(nl); right.jump(nr); setReady(true); return
    }
    const goingRight = active > prev.current
    prev.current = active
    const a = animate(left, nl, goingRight ? LAG : LEAD)
    const b = animate(right, nr, goingRight ? LEAD : LAG)
    return () => { a.stop(); b.stop() }
  }, [active, left, right])

  return (
    <nav aria-label="Main navigation" className="gooey-nav relative flex items-center gap-3">
      <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
        <defs>
          <filter id="gooey-nav-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="b" />
            <feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10" result="g" />
            <feComposite in="SourceGraphic" in2="g" operator="atop" />
          </filter>
        </defs>
      </svg>
      <div className="gooey-layer absolute inset-0 pointer-events-none" style={{ filter: 'url(#gooey-nav-filter)' }} aria-hidden="true">
        {items.map((_, i) => (
          <span key={i} className="gooey-shape absolute top-0 bottom-0 rounded-full" style={{ left: pos[i]?.l ?? 0, width: pos[i]?.w ?? 0 }} />
        ))}
        {ready && <motion.span className="gooey-blob absolute top-0 bottom-0 rounded-full" style={{ x: left, width, scaleY: thin }} />}
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
