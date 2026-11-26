'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import { revealTheme } from '@/lib/themeReveal'

/**
 * A corner spider web (radial strands + sagging rings) sits faintly in the top-right corner.
 * Grab the web, pull it down and across: the strands stretch like a real web and turn red.
 * Release past the threshold (or flick) and the theme switches with a circular reveal from the
 * release point; the web springs back. Only a small grab spot takes input, so scrolling is never blocked.
 */
const RADII = [30, 58, 88, 122, 158, 190]   // ring radii in web units (web is 200 units wide)
const NR = 8                                  // radial strands, from straight down toward left (stops short of the top edge so nothing hugs or clips at the screen top)
const GRAB = { ring: 2, radial: 6 }
const THRESHOLD = 42    // small pull is enough (raw finger travel in px)
const MAX = 190
const SAG = 0.1

type Seg = { a: [number, number]; b: [number, number]; kind: 'radial' | 'ring'; w: number }

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
    const scale = () => (W() < 600 ? 0.5 : 0.9)

    // rest-space nodes (web units, origin at the corner anchor, x grows left, y grows down)
    const node = (k: number, j: number): [number, number] => {
      const th = (j * 11.25) * Math.PI / 180
      return [-Math.sin(th) * RADII[k], Math.cos(th) * RADII[k]]
    }
    const gp = node(GRAB.ring, GRAB.radial)
    const SIGMA = 85
    const weight = (k: number, j: number) => {
      const [x, y] = node(k, j)
      const d = Math.hypot(x - gp[0], y - gp[1])
      return Math.exp(-((d / SIGMA) ** 2)) * Math.min(1, RADII[k] / 110)
    }
    const wgt: number[][] = RADII.map((_, k) => Array.from({ length: NR }, (_, j) => weight(k, j)))

    // build path elements once
    const els: { el: SVGPathElement; kind: 'radial' | 'ring'; w: number; a: [number, number, number]; b: [number, number, number] }[] = []
    const mk = (kind: 'radial' | 'ring', a: [number, number, number], b: [number, number, number], w: number) => {
      const el = document.createElementNS(NS, 'path')
      el.setAttribute('fill', 'none'); el.setAttribute('stroke-linecap', 'round')
      g.appendChild(el); els.push({ el, kind, w, a, b })
    }
    // a/b = [k, j, isAnchor] ; k=-1 means the corner anchor
    for (let j = 0; j < NR; j++) {
      mk('radial', [-1, j, 1], [0, j, 0], wgt[0][j])
      for (let k = 0; k < RADII.length - 1; k++) mk('radial', [k, j, 0], [k + 1, j, 0], (wgt[k][j] + wgt[k + 1][j]) / 2)
    }
    for (let k = 0; k < RADII.length; k++) for (let j = 0; j < NR - 1; j++) mk('ring', [k, j, 0], [k, j + 1, 0], (wgt[k][j] + wgt[k][j + 1]) / 2)

    let ox = 0, oy = 0, vx = 0, vy = 0      // grab offset in px (and its spring velocity)
    let dragging = false, raf = 0, last = 0, crossed = false, peak = 0, tx = 0, ty = 0
    let sx = 0, sy = 0, pvx = 0, pvy = 0, lpx = 0, lpy = 0, lt = 0
    const isDark = () => document.documentElement.classList.contains('dark')
    const mix = (t: number) => {
      const base = isDark() ? [235, 235, 240] : [24, 24, 30]
      const red = [226, 54, 54]
      return `rgb(${base.map((b, i) => Math.round(b + (red[i] - b) * t))})`
    }

    const draw = () => {
      const s = scale(), cx = W(), cy = 0
      const stretch = Math.hypot(ox, oy)
      const t = Math.min(1, stretch / THRESHOLD)
      const col = mix(t)
      const P = (k: number, j: number, anchor: number): [number, number] => {
        if (anchor) return [cx, cy]
        const [x, y] = node(k, j)
        const w = wgt[k][j]
        return [cx + x * s + ox * w, cy + y * s + oy * w]
      }
      for (const e of els) {
        const A = P(e.a[0], e.a[1], e.a[2]), B = P(e.b[0], e.b[1], e.b[2])
        let d: string
        if (e.kind === 'ring') {
          const mx = (A[0] + B[0]) / 2, my = (A[1] + B[1]) / 2
          // sag toward the corner anchor, a little more when the web is slack
          d = `M${A[0]} ${A[1]}Q${mx + (cx - mx) * SAG} ${my + (cy - my) * SAG} ${B[0]} ${B[1]}`
        } else d = `M${A[0]} ${A[1]}L${B[0]} ${B[1]}`
        e.el.setAttribute('d', d)
        e.el.style.stroke = col
        e.el.style.strokeWidth = e.kind === 'radial' ? '1.1' : '1'
        e.el.style.strokeOpacity = String((isDark() ? 0.10 : 0.09) + t * (0.25 + 0.6 * Math.min(1, e.w * 1.6)))
      }
    }

    const step = (now: number) => {
      const dt = Math.min(0.032, (now - last) / 1000 || 0.016); last = now
      if (dragging) {
        // the web trails the finger a little: smooth rubber-band follow
        const f = 1 - Math.exp(-dt * 28)
        ox += (tx - ox) * f; oy += (ty - oy) * f
      } else {
        const k = 190, c = 8.5   // springy: a couple of visible overshoots
        vx += (-ox * k - vx * c) * dt; vy += (-oy * k - vy * c) * dt
        ox += vx * dt; oy += vy * dt
        if (Math.abs(ox) < 0.1 && Math.abs(oy) < 0.1 && Math.hypot(vx, vy) < 2) { ox = oy = vx = vy = 0; draw(); raf = 0; return }
      }
      draw(); raf = requestAnimationFrame(step)
    }
    const kick = () => { if (!raf) { last = performance.now(); raf = requestAnimationFrame(step) } }
    const rubber = (dx: number, dy: number) => {
      const d = Math.hypot(dx, dy); if (d < 0.5) return [0, 0]
      const m = MAX * Math.tanh(1.3 * d / MAX); return [dx / d * m, dy / d * m]
    }

    const down = (e: PointerEvent) => {
      dragging = true; crossed = false; peak = 0; btn.setPointerCapture(e.pointerId)
      sx = e.clientX; sy = e.clientY; tx = ox; ty = oy
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
      const over = raw >= THRESHOLD
      if (over && !crossed && navigator.vibrate) { try { navigator.vibrate(8) } catch {} }
      crossed = over
    }
    const up = (e: PointerEvent) => {
      if (!dragging) return
      dragging = false
      try { btn.releasePointerCapture(e.pointerId) } catch {}
      const stretch = Math.hypot(ox, oy), speed = Math.hypot(pvx, pvy)
      const fling = peak > 12 && speed > 450
      vx = Math.max(-1500, Math.min(1500, pvx * 0.3)); vy = Math.max(-1500, Math.min(1500, pvy * 0.3))
      if (peak >= THRESHOLD || fling) {
        const s = scale(); const [gx, gy] = node(GRAB.ring, GRAB.radial)
        const x = Math.min(Math.max(W() + gx * s + ox, 0), W()), y = Math.max(0, gy * s + oy)
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

    btn.addEventListener('pointerdown', down); btn.addEventListener('pointermove', move)
    btn.addEventListener('pointerup', up); btn.addEventListener('pointercancel', up); btn.addEventListener('keydown', key)
    window.addEventListener('resize', resize)
    draw()
    const hint = reduce ? 0 : window.setTimeout(() => { if (!dragging) { vy = 240; vx = -80; kick() } }, 2200)
    return () => {
      btn.removeEventListener('pointerdown', down); btn.removeEventListener('pointermove', move)
      btn.removeEventListener('pointerup', up); btn.removeEventListener('pointercancel', up); btn.removeEventListener('keydown', key)
      window.removeEventListener('resize', resize)
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
