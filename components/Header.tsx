'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export default function Header() {
  const pathname = usePathname()
  const isAbout = pathname === '/'
  const isProjects = pathname === '/projects'

  const navItems = [
    { name: 'About', href: '/', active: isAbout },
    { name: 'Projects', href: '/projects', active: isProjects },
  ]

  return (
    <header className="w-full pt-8 sm:pt-12 pb-6 flex items-center justify-between">
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

      {/* Right: Clean Animated Navigation Tabs */}
      <nav
        className="flex items-center gap-1 p-1 rounded-full bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/[0.08]"
        aria-label="Main Navigation"
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`relative px-3.5 py-1 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 ${
              item.active
                ? 'text-zinc-950 dark:text-white'
                : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
            }`}
          >
            {item.active && (
              <motion.span
                layoutId="activeNavTab"
                className="absolute inset-0 rounded-full bg-white dark:bg-white/10 shadow-sm border border-black/5 dark:border-white/10"
                transition={{ type: 'spring', stiffness: 420, damping: 30 }}
              />
            )}
            <span className="relative z-10">{item.name}</span>
          </Link>
        ))}
      </nav>
    </header>
  )
}
