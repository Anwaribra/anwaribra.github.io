'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import { flushSync } from 'react-dom'
import { revealTheme } from '@/lib/themeReveal'

/**
 * A corner spider web (radial strands + sagging rings) sits faintly in the top-right corner.
 * Grab the web, pull it down and across: the strands stretch like a real web and turn red.
 * Release past the threshold (or flick) and the theme switches with a circular reveal from the
 * release point; the web springs back. Only a small grab spot takes input, so scrolling is never blocked.
 */
const RADII = [16, 30, 46, 64, 84, 106, 130, 156, 184]   // ring radii in web units (web is about 200 units wide)
const NR = 11                                             // main radial strands, from straight down toward the left; they stop short of the top edge so nothing hugs or clips there
const ANG_MAX = 84
const THRESHOLD = 42    // fallback (no View Transitions): finger travel needed to switch
const COMMIT_R = 90     // drag reveal: release past this reveal radius (px) to commit the switch
const REVEAL_GAIN = 1.8 // reveal radius grows this much per px the finger moves away from the corner
const SIGMA = 85        // how far (web units) a pull spreads through the web

type Pt = { x: number; y: number; w: number; r: number }

export default function WebPull() {
  const { resolvedTheme, setTheme } = useTheme()
  const themeRef = useRef({ resolvedTheme, setTheme })
  themeRef.current = { resolvedTheme, setTheme }
  const gRef = useRef<SVGGElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const g = gRef.current, btn = btnRef.current
    if (!g || !btn) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const NS = 'http://www.w3.org/2000/svg'
    const W = () => document.documentElement.clientWidth
    // Web size: small and clear of the header buttons on phones, a big corner web on desktop
    const scale = () => { const w = W(); return w < 600 ? 0.55 : w < 1024 ? 1.0 : 1.8 }
    const maxPull = () => 190 * Math.max(1, scale() * 0.9)
    const pullGain = () => 1.3 * Math.max(1, scale() * 0.7)

    // tiny deterministic random so the web has the same slight irregularity every load
    const rnd = (seed: number) => { let a = seed; return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296 } }
    const R = rnd(11)
    const gpA = 67 * Math.PI / 180
    const gp = [-Math.sin(gpA) * 88, Math.cos(gpA) * 88]
    const mkPt = (deg: number, r: number): Pt => {
      const th = deg * Math.PI / 180
      const x = -Math.sin(th) * r, y = Math.cos(th) * r
      const d = Math.hypot(x - gp[0], y - gp[1])
      return { x, y, r, w: Math.exp(-((d / SIGMA) ** 2)) * Math.min(1, r / 110) * Math.min(1, y / 55) }
    }
    const corner: Pt = { x: 0, y: 0, w: 0, r: 0 }
    const angles = Array.from({ length: NR }, (_, j) => j * (ANG_MAX / (NR - 1)) + (j > 0 && j < NR - 1 ? (R() - 0.5) * 2.6 : 0))
    const grid: Pt[][] = RADII.map(r => angles.map(a => mkPt(a, r * (1 + (R() - 0.5) * 0.05))))

    type El = { el: SVGPathElement; a: Pt; b: Pt; ring: boolean; lw: number; mul: number; w: number; fade: number; col: string; op: string }
    const els: El[] = []
    const mk = (a: Pt, b: Pt, ring: boolean, lw: number, mul: number) => {
      const el = document.createElementNS(NS, 'path')
      el.setAttribute('fill', 'none'); el.setAttribute('stroke-linecap', 'round')
      el.style.strokeWidth = String(lw)
      g.appendChild(el)
      els.push({ el, a, b, ring, lw, mul, w: (a.w + b.w) / 2, fade: 1 - 0.55 * Math.min(1, (a.r + b.r) / 2 / 190), col: '', op: '' })
    }
    // main radials: corner -> every ring
    for (let j = 0; j < NR; j++) {
      mk(corner, grid[0][j], false, 0.85, 1)
      for (let k = 0; k < RADII.length - 1; k++) mk(grid[k][j], grid[k + 1][j], false, 0.85 - k * 0.025, 1)
    }
    // rings, every segment sags like a hanging thread (frame and hub threads a touch heavier)
    for (let k = 0; k < RADII.length; k++) for (let j = 0; j < NR - 1; j++) mk(grid[k][j], grid[k][j + 1], true, k === RADII.length - 1 || k === 0 ? 0.8 : 0.55, 1)
    // anchor threads: the outer frame is tied to the browser ceiling and stays pinned there while the rest stretches
    for (let j = NR - 4; j < NR; j++) {
      for (const k of [3, 5, 7, RADII.length - 1]) {
        const n = grid[k][j]
        mk(n, { x: n.x - (6 + R() * 16), y: 0, w: 0, r: n.r }, false, 0.5, 0.9)
      }
    }
    // fine secondary threads between the main radials, outer half only
    for (let j = 0; j < NR - 1; j++) {
      const a = (angles[j] + angles[j + 1]) / 2 + (R() - 0.5) * 1.5
      let prev: Pt | null = null
      for (let k = 3; k < RADII.length; k++) {
        const pt = mkPt(a, RADII[k] * (1 + (R() - 0.5) * 0.05))
        if (prev) mk(prev, pt, false, 0.32, 0.6)
        prev = pt
      }
    }
    // dewdrops on a few nodes
    type Drop = { c: SVGCircleElement; h: SVGCircleElement; p: Pt; r: number }
    const drops: Drop[] = []
    const used = new Set<string>()
    while (drops.length < 8) {
      const k = 2 + Math.floor(R() * 6), j = 1 + Math.floor(R() * (NR - 2)), key = k + ':' + j
      if (used.has(key)) continue
      used.add(key)
      const c = document.createElementNS(NS, 'circle'), h = document.createElementNS(NS, 'circle')
      c.setAttribute('fill', 'none'); h.setAttribute('r', '0.5')
      g.appendChild(c); g.appendChild(h)
      drops.push({ c, h, p: grid[k][j], r: 1.1 + R() * 1.1 })
    }

    // tiny silk beads where the rings cross the strands: a quiet sparkle of depth
    const beads: { c: SVGCircleElement; p: Pt }[] = []
    for (let k = 1; k < RADII.length; k++) for (let j = 1; j < NR - 1; j += (k % 2 ? 1 : 2)) {
      const c = document.createElementNS(NS, 'circle'); g.appendChild(c); beads.push({ c, p: grid[k][j] })
    }

    type VT = { ready: Promise<void>; finished: Promise<void>; skipTransition: () => void }
    type VTDoc = Document & { startViewTransition?: (cb: () => void) => VT }
    const vtSupported = !!(document as VTDoc).startViewTransition && !reduce
    type Reveal = { vt: VT; anim: Animation | null; prev: string; next: string; maxR: number; frac: number }
    let rev: Reveal | null = null, busy = false, r0 = 0
    const pullRadius = (px: number, py: number) => Math.max(0, Math.hypot(W() - px, py) - r0) * REVEAL_GAIN
    const setFrac = (f: number) => { if (!rev) return; rev.frac = Math.min(1, Math.max(0, f)); if (rev.anim) rev.anim.currentTime = rev.frac * 1000 }
    // Start a paused view transition: the other theme is the "new" layer, clipped to a circle at the corner that we scrub with the finger.
    const beginReveal = () => {
      const { resolvedTheme: cur, setTheme: set } = themeRef.current
      const prev = cur === 'light' ? 'light' : 'dark', next = prev === 'light' ? 'dark' : 'light'
      const maxR = Math.hypot(W(), window.innerHeight)
      const vt = (document as VTDoc).startViewTransition!(() => { flushSync(() => set(next)) })
      const st: Reveal = { vt, anim: null, prev, next, maxR, frac: 0 }
      rev = st
      vt.ready.then(() => {
        if (rev !== st) return
        st.anim = document.documentElement.animate(
          { clipPath: [`circle(0px at ${W()}px 0px)`, `circle(${maxR}px at ${W()}px 0px)`] },
          { duration: 1000, easing: 'linear', fill: 'both', pseudoElement: '::view-transition-new(root)' })
        st.anim.pause(); st.anim.currentTime = st.frac * 1000
      }).catch(() => { if (rev === st) rev = null })
      vt.finished.finally(() => {
        // drop the scrubbed clip animation so it can never leak into a later transition
        try { st.anim?.cancel() } catch {}
        if (rev === st) { rev = null; busy = false }
      })
    }
    const tweenFrac = (st: Reveal, to: number, ms: number, done: () => void) => {
      const from = st.frac, t0 = performance.now()
      const stepT = (now: number) => {
        const k = Math.min(1, (now - t0) / ms), e = 1 - Math.pow(1 - k, 3)
        if (rev !== st) return
        setFrac(from + (to - from) * e)
        if (k < 1) requestAnimationFrame(stepT); else done()
      }
      requestAnimationFrame(stepT)
    }
    const endReveal = (commit: boolean) => {
      const st = rev; if (!st) return
      busy = true
      const run = () => {
        if (commit) tweenFrac(st, 1, 300, () => { try { st.anim?.finish() } catch {} ; try { st.vt.skipTransition() } catch {} })
        else tweenFrac(st, 0, 260, () => {
          // back to the starting theme, then drop the transition without a flash
          flushSync(() => themeRef.current.setTheme(st.prev))
          try { st.vt.skipTransition() } catch {}
        })
      }
      if (st.anim) run(); else st.vt.ready.then(run).catch(() => { rev = null; busy = false })
    }

    let ox = 0, oy = 0, vx = 0, vy = 0      // grab offset in px (and its spring velocity)
    let dragging = false, raf = 0, last = 0, crossed = false, peak = 0, tx = 0, ty = 0
    let sx = 0, sy = 0, pvx = 0, pvy = 0, lpx = 0, lpy = 0, lt = 0
    const isDark = () => document.documentElement.classList.contains('dark')
    const mix = (t: number) => {
      const base = isDark() ? [236, 236, 242] : [30, 30, 38]
      const red = [208, 72, 84]
      return `rgb(${base.map((b, i) => Math.round(b + (red[i] - b) * t))})`
    }
    let glowKey = -1

    const draw = () => {
      const s = scale(), cx = W(), cy = 0
      const dark = isDark()
      const size = s < 1 ? 1 : 1.25
      const stretch = Math.hypot(ox, oy)
      const t = Math.min(1, stretch / THRESHOLD)
      const P = (p: Pt): [number, number] => p === corner ? [cx, cy] : [cx + p.x * s + ox * p.w, cy + p.y * s + oy * p.w]
      const rest = dark ? 0.24 : 0.2
      for (const e of els) {
        const A = P(e.a), B = P(e.b)
        let d: string
        if (e.ring) {
          // natural catenary-like sag toward the hub: longer threads hang lower, a taut web hangs less
          const mx = (A[0] + B[0]) / 2, my = (A[1] + B[1]) / 2
          const chord = Math.hypot(B[0] - A[0], B[1] - A[1])
          const dx = cx - mx, dy = cy - my, dl = Math.hypot(dx, dy) || 1
          const sag = chord * ((0.2 + 0.1 * Math.min(1, e.fade < 0.5 ? 0.5 : 1 - e.fade)) - 0.15 * t)
          d = `M${A[0].toFixed(1)} ${A[1].toFixed(1)}Q${(mx + dx / dl * sag).toFixed(1)} ${(my + dy / dl * sag).toFixed(1)} ${B[0].toFixed(1)} ${B[1].toFixed(1)}`
        } else d = `M${A[0].toFixed(1)} ${A[1].toFixed(1)}L${B[0].toFixed(1)} ${B[1].toFixed(1)}`
        e.el.setAttribute('d', d)
        // red climbs from the pulled spot outward: strands near the finger go reddest
        const tt = t * (0.25 + 0.75 * Math.min(1, e.w * 1.5))
        const col = mix(tt)
        const op = String(Math.min(0.95, rest * e.fade * e.mul + t * (0.3 + 0.55 * Math.min(1, e.w * 1.6)) * (0.5 + 0.5 * e.fade)).toFixed(3))
        if (col !== e.col) { e.el.style.stroke = col; e.col = col }
        if (op !== e.op) { e.el.style.strokeOpacity = op; e.op = op }
      }
      // dewdrops
      for (const dr of drops) {
        const [x, y] = P(dr.p), r = dr.r * size
        dr.c.setAttribute('cx', x.toFixed(1)); dr.c.setAttribute('cy', y.toFixed(1)); dr.c.setAttribute('r', r.toFixed(2))
        dr.h.setAttribute('cx', (x - r * 0.35).toFixed(1)); dr.h.setAttribute('cy', (y - r * 0.35).toFixed(1)); dr.h.setAttribute('r', (r * 0.3).toFixed(2))
        const f = 1 - 0.5 * Math.min(1, dr.p.r / 190)
        dr.c.style.stroke = dark ? 'rgb(236,236,242)' : 'rgb(60,60,80)'
        dr.c.style.strokeWidth = '0.6'
        dr.c.style.strokeOpacity = String((dark ? 0.42 : 0.34) * f * (1 - t * 0.6))
        dr.c.style.fill = dark ? 'rgba(255,255,255,0.07)' : 'rgba(80,80,110,0.05)'
        dr.h.style.fill = '#fff'
        dr.h.style.fillOpacity = String((dark ? 0.8 : 0.95) * f * (1 - t * 0.6))
      }
      for (const b of beads) {
        const [x, y] = P(b.p)
        b.c.setAttribute('cx', x.toFixed(1)); b.c.setAttribute('cy', y.toFixed(1)); b.c.setAttribute('r', (0.75 * size).toFixed(2))
        b.c.style.fill = dark ? 'rgb(236,236,242)' : 'rgb(60,60,80)'
        b.c.style.fillOpacity = String(((dark ? 0.34 : 0.26) * (1 - 0.55 * Math.min(1, b.p.r / 190)) + t * 0.35).toFixed(3))
      }
      // soft red glow while pulled
      const gk = Math.round(t * 8)
      if (gk !== glowKey) { glowKey = gk; g.style.filter = gk ? `drop-shadow(0 0 ${(2 + 5 * t).toFixed(1)}px rgba(208,72,84,${(0.38 * t).toFixed(2)}))` : '' }
    }

    const step = (now: number) => {
      const dt = Math.min(0.032, (now - last) / 1000 || 0.016); last = now
      if (dragging) {
        // the web trails the finger a little: smooth rubber-band follow
        const f = 1 - Math.exp(-dt * 28)
        ox += (tx - ox) * f; oy += (ty - oy) * f
      } else {
        const k = 150, c = 6.5   // springy: several visible overshoots
        vx += (-ox * k - vx * c) * dt; vy += (-oy * k - vy * c) * dt
        ox += vx * dt; oy += vy * dt
        if (Math.abs(ox) < 0.1 && Math.abs(oy) < 0.1 && Math.hypot(vx, vy) < 2) { ox = oy = vx = vy = 0; draw(); raf = 0; return }
      }
      draw(); raf = requestAnimationFrame(step)
    }
    const kick = () => { if (!raf) { last = performance.now(); raf = requestAnimationFrame(step) } }
    const rubber = (dx: number, dy: number) => {
      const d = Math.hypot(dx, dy); if (d < 0.5) return [0, 0]
      const M = maxPull(), m = M * Math.tanh(pullGain() * d / M); return [dx / d * m, dy / d * m]
    }

    const down = (e: PointerEvent) => {
      dragging = true; crossed = false; peak = 0; btn.setPointerCapture(e.pointerId)
      if (busy) { dragging = false; return }
      sx = e.clientX; sy = e.clientY; tx = ox; ty = oy; r0 = Math.hypot(W() - sx, sy)
      lpx = e.clientX; lpy = e.clientY; lt = e.timeStamp; pvx = pvy = 0; vx = vy = 0; kick()
    }
    const move = (e: PointerEvent) => {
      if (!dragging) return
      const dt = (e.timeStamp - lt) / 1000
      if (dt > 0) { pvx = (e.clientX - lpx) / dt; pvy = (e.clientY - lpy) / dt; lpx = e.clientX; lpy = e.clientY; lt = e.timeStamp }
      const raw = Math.hypot(e.clientX - sx, e.clientY - sy)
      peak = Math.max(peak, raw)
      const [rx, ry] = rubber(e.clientX - sx, e.clientY - sy)
      tx = rx; ty = ry
      if (vtSupported && !rev && !busy && raw >= 6) beginReveal()
      if (rev) setFrac(pullRadius(e.clientX, e.clientY) / rev.maxR)
      const over = vtSupported ? pullRadius(e.clientX, e.clientY) >= COMMIT_R : raw >= THRESHOLD
      if (over && !crossed && navigator.vibrate && (navigator as Navigator & { userActivation?: { hasBeenActive: boolean } }).userActivation?.hasBeenActive !== false) { try { navigator.vibrate(8) } catch {} }
      crossed = over
    }
    const up = (e: PointerEvent) => {
      if (!dragging) return
      dragging = false
      root.classList.remove('web-dragging'); justDragged = performance.now()
      try { btn.releasePointerCapture(e.pointerId) } catch {}
      const stretch = Math.hypot(ox, oy), speed = Math.hypot(pvx, pvy)
      const fling = peak > 12 && speed > 450
      vx = Math.max(-1500, Math.min(1500, pvx * 0.3)); vy = Math.max(-1500, Math.min(1500, pvy * 0.3))
      if (rev) endReveal(pullRadius(e.clientX, e.clientY) >= COMMIT_R || fling && e.type === 'pointerup')
      else if (!vtSupported && (peak >= THRESHOLD || fling)) {
        const x = Math.min(Math.max(e.clientX, 0), W()), y = Math.max(0, e.clientY)
        const { resolvedTheme: cur, setTheme: set } = themeRef.current
        revealTheme(set, cur === 'light' ? 'dark' : 'light', x, y)
      }
      if (reduce) { ox = oy = vx = vy = 0; draw(); return }
      kick()
    }
    const key = (e: KeyboardEvent) => {
      if (e.key !== 'Enter' && e.key !== ' ') return
      e.preventDefault()
      const { resolvedTheme: cur, setTheme: set } = themeRef.current
      revealTheme(set, cur === 'light' ? 'dark' : 'light', W() - 90, 90)
      if (!reduce) { vy = 700; vx = -200; kick() }
    }
    const resize = () => draw()

    // The whole web is the grab area: any point inside the web's quarter-disc that is not an interactive element.
    const INTERACTIVE = 'a,button,input,textarea,select,summary,label,[role="button"],[role="link"],[contenteditable="true"]'
    const inWeb = (x: number, y: number) => {
      if (busy) return false
      const dx = W() - x
      return dx >= 0 && y >= 0 && Math.hypot(dx, y) <= 190 * scale() * 1.02
    }
    const grabbable = (x: number, y: number) => {
      if (!inWeb(x, y)) return false
      const el = document.elementFromPoint(x, y) as HTMLElement | null
      const hit = el?.closest?.(INTERACTIVE) as HTMLElement | null
      return !hit || hit.hasAttribute('data-web-grab')
    }
    const root = document.documentElement
    let hoverGrab = false
    const winDown = (e: PointerEvent) => {
      if (dragging || e.button !== 0 || !e.isPrimary) return
      if (!grabbable(e.clientX, e.clientY)) return
      e.preventDefault()
      root.classList.add('web-dragging')
      down(e)
    }
    const winTouch = (e: TouchEvent) => {
      if (e.touches.length !== 1) return
      const t = e.touches[0]
      if (grabbable(t.clientX, t.clientY)) e.preventDefault()   // no scroll or tap-through when you grab the web
    }
    const winMouse = (e: MouseEvent) => { if (e.button === 0 && !dragging && grabbable(e.clientX, e.clientY)) e.preventDefault() }  // no text selection
    const winHover = (e: PointerEvent) => {
      if (dragging || e.pointerType === 'touch') return
      const on = grabbable(e.clientX, e.clientY)
      if (on !== hoverGrab) { hoverGrab = on; root.style.cursor = on ? 'grab' : '' }
    }
    let justDragged = 0
    const winClick = (e: MouseEvent) => { if (performance.now() - justDragged < 350) { e.preventDefault(); e.stopPropagation() } }
    window.addEventListener('pointerdown', winDown, true)
    window.addEventListener('touchstart', winTouch, { capture: true, passive: false })
    window.addEventListener('mousedown', winMouse, true)
    window.addEventListener('pointermove', winHover, true)
    window.addEventListener('click', winClick, true)
    btn.addEventListener('pointerdown', down); btn.addEventListener('pointermove', move)
    btn.addEventListener('pointerup', up); btn.addEventListener('pointercancel', up); btn.addEventListener('keydown', key)
    window.addEventListener('resize', resize)
    draw()
    const hint = reduce ? 0 : window.setTimeout(() => { if (!dragging) { vy = 240 * Math.max(1, scale()); vx = -80 * Math.max(1, scale()); kick() } }, 2200)
    return () => {
      btn.removeEventListener('pointerdown', down); btn.removeEventListener('pointermove', move)
      btn.removeEventListener('pointerup', up); btn.removeEventListener('pointercancel', up); btn.removeEventListener('keydown', key)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointerdown', winDown, true); window.removeEventListener('touchstart', winTouch, true)
      window.removeEventListener('mousedown', winMouse, true); window.removeEventListener('pointermove', winHover, true); window.removeEventListener('click', winClick, true)
      root.style.cursor = ''; root.classList.remove('web-dragging')
      if (raf) cancelAnimationFrame(raf)
      if (hint) clearTimeout(hint)
      while (g.firstChild) g.removeChild(g.firstChild)
    }
  }, [])

  return (
    <div className="web-pull">
      <svg className="web-pull-svg" width="100%" height="100%" aria-hidden="true"><g ref={gRef} /></svg>
      <button ref={btnRef} type="button" className="web-pull-knot" aria-label="Pull the web to switch light and dark theme" title="Pull the web" />
    </div>
  )
}
