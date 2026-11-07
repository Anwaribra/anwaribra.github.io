'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Glass } from 'glisse'

export default function Header() {
  const pathname = usePathname()
  const isAbout = pathname === '/'
  const isProjects = pathname === '/projects'

  const [views, setViews] = useState<number | null>(null)

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('has_counted_view')
    const method = hasVisited ? 'GET' : 'POST'

    fetch('/api/views', { method })
      .then((res) => res.json())
      .then((data) => {
        if (data?.views) {
          setViews(data.views)
          sessionStorage.setItem('has_counted_view', 'true')
        }
      })
      .catch(() => setViews(1843))
  }, [])

  const navItems = [
    { name: 'About', href: '/', active: isAbout },
    { name: 'Projects', href: '/projects', active: isProjects },
  ]

  return (
    <header className="w-full pt-4 sm:pt-6 pb-5 flex flex-col gap-2">
      {/* Horizontal Katana Slash - ONLY the sword glides in visibly from the LEFT */}
      <div className="w-full relative flex items-center justify-center overflow-visible py-1 select-none">
        {/* Animated Sword: visible while moving, sweeps from left off-screen into place */}
        <motion.div
          initial={{ x: '-100vw', opacity: 0.95 }}
          animate={{ x: 0, opacity: 0.85 }}
          transition={{
            duration: 0.85,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="w-full flex items-center justify-center"
        >
          <Link
            href="/"
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            onContextMenu={(e) => e.preventDefault()}
            className="block w-full cursor-pointer pointer-events-auto"
            title="Snow Flower (설화) · Inspired by Legend of the Northern Blade"
          >
            <Image
              src="/assets/images/sword-horizontal.webp"
              alt=""
              aria-hidden="true"
              width={2590}
              height={253}
              priority
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
              className="w-full h-auto object-contain max-h-[44px] sm:max-h-[54px] drop-shadow-[0_0_6px_rgba(168,85,247,0.15)] dark:drop-shadow-[0_0_8px_rgba(168,85,247,0.22)] select-none pointer-events-none"
            />
          </Link>
        </motion.div>

        {/* Secret Visitor Counter Hint - Static, does NOT slide with sword */}
        <span
          className="absolute right-0 -top-1 sm:-top-1.5 text-[9px] sm:text-[10px] font-mono text-zinc-500/70 dark:text-zinc-400/60 select-none tracking-widest pointer-events-none"
        >
          {views !== null ? `#${views.toLocaleString()}` : '#1,843'}
        </span>
      </div>

      {/* Main Header Row: Avatar + Name on left, Glisse Liquid Glass Nav Tabs on right */}
      <div className="w-full flex items-center justify-between pt-1">
        {/* Left: Avatar + Domain */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group select-none"
          aria-label="Anwar Mousa - Home"
        >
          <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-black/10 dark:border-white/10 shrink-0">
            <Image
              src="https://github.com/Anwaribra.png"
              alt="Anwar Mousa"
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
              priority
              unoptimized
            />
          </div>
          <span className="text-sm sm:text-base font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-black dark:group-hover:text-white transition-colors">
            Anwar Mousa
          </span>
        </Link>

        {/* Right: Clean Animated Navigation Tabs with Glisse Liquid Glass */}
        <Glass
          className="dock-liquid-glass flex items-center gap-1 p-1 rounded-full shadow-lg border border-black/10 dark:border-white/10"
          aria-label="Main Navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative px-3.5 py-1 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 select-none ${
                item.active
                  ? 'text-zinc-950 dark:text-white'
                  : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
              }`}
            >
              {item.active && (
                <motion.span
                  layoutId="activeNavTab"
                  className="absolute inset-0 rounded-full bg-white/80 dark:bg-white/[0.16] shadow-[0_2px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.25)] border border-white/20 dark:border-white/15"
                  transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.name}</span>
            </Link>
          ))}
        </Glass>
      </div>
    </header>
  )
}
