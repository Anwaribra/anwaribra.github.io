'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  const isAbout = pathname === '/'
  const isProjects = pathname === '/projects'

  return (
    <header className="w-full pt-8 sm:pt-12 pb-6 flex items-center justify-between">
      {/* Left: Avatar + Domain */}
      <Link
        href="/"
        className="flex items-center gap-2.5 group select-none"
        aria-label="Anwar Ibrahim - Home"
      >
        <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-black/10 dark:border-white/10 shrink-0">
          <Image
            src="https://github.com/Anwaribra.png"
            alt="Anwar Ibrahim"
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

      {/* Right: Clean Navigation Tabs (About & Projects) */}
      <nav className="flex items-center gap-6 sm:gap-7 text-sm sm:text-base font-normal" aria-label="Main Navigation">
        <Link
          href="/"
          className={`transition-colors relative py-1 ${
            isAbout
              ? 'text-zinc-950 dark:text-white font-medium underline underline-offset-[10px] decoration-[1.5px] decoration-[#C6F36A]'
              : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
          }`}
        >
          About
        </Link>
        <Link
          href="/projects"
          className={`transition-colors relative py-1 ${
            isProjects
              ? 'text-zinc-950 dark:text-white font-medium underline underline-offset-[10px] decoration-[1.5px] decoration-[#C6F36A]'
              : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
          }`}
        >
          Projects
        </Link>
      </nav>
    </header>
  )
}
