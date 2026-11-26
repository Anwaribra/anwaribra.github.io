'use client'

import React from 'react'
import VisitorCounter from '@/components/VisitorCounter'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { SegmentControl } from '@/components/thinker-ui/AgenticControls'

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const isAbout = pathname === '/'
  const isProjects = pathname === '/projects'

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

        <VisitorCounter />
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
          <span className="text-sm sm:text-base font-medium tracking-tight text-zinc-900 dark:text-zinc-100 flex items-baseline">
            {'anwarmousa'.split('').map((ch, i) => (
              <motion.span key={i} initial={{ opacity: 0, y: 4, filter: 'blur(3px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.35, delay: 0.5 + i * 0.04 }}>{ch}</motion.span>
            ))}
            <motion.span className="text-[#9333EA] dark:text-[#C084FC]" initial={{ opacity: 0, y: 4, filter: 'blur(3px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.35, delay: 1 }}>.me</motion.span>
          </span>
        </Link>

        <SegmentControl
          label="Main navigation"
          options={['About', 'Projects']}
          value={isProjects ? 'Projects' : 'About'}
          onChange={(v) => router.push(v === 'About' ? '/' : '/projects')}
        />
      </div>
    </header>
  )
}
