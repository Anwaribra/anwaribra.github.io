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
    <header className="w-full pt-6 sm:pt-8 pb-5 flex flex-col gap-3 sm:gap-4">
      {/* Horizontal Katana Slash positioned directly across the top */}
      <motion.div
        initial={{ opacity: 0, x: -70, scaleX: 0.94 }}
        animate={{ opacity: 1, x: 0, scaleX: 1 }}
        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        className="w-full select-none pointer-events-none relative flex items-center justify-center overflow-hidden"
      >
        <Image
          src="/assets/images/sword-horizontal.webp"
          alt="Katana accent"
          width={1295}
          height={126}
          priority
          className="w-full h-auto object-contain max-h-[24px] sm:max-h-[30px] opacity-75 dark:opacity-90 drop-shadow-[0_0_10px_rgba(168,85,247,0.35)] dark:drop-shadow-[0_0_14px_rgba(168,85,247,0.5)] transition-all duration-300"
        />
      </motion.div>

      {/* Main Header Row: Avatar + Name on left, Nav Tabs on right */}
      <div className="w-full flex items-center justify-between">
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
      </div>
    </header>
  )
}
