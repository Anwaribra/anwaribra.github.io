import { flushSync } from 'react-dom'

type VT = Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } }

/** Switch theme with a circular reveal that starts at (x, y). Falls back to a plain switch. */
export function revealTheme(setTheme: (t: string) => void, next: string, x: number, y: number) {
  const doc = document as VT
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!doc.startViewTransition || reduce) { setTheme(next); return }
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
  const t = doc.startViewTransition(() => { flushSync(() => setTheme(next)) })
  t.ready.then(() => {
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      { duration: 650, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', pseudoElement: '::view-transition-new(root)' }
    )
  }).catch(() => {})
}
