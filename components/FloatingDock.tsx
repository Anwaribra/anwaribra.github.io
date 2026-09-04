'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, FolderGit2, Mail } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const dockItems = [
  { id: 'about', label: 'Home', icon: Home, href: '#about' },
  { id: 'projects', label: 'Projects', icon: FolderGit2, href: '#projects' },
  { id: 'divider-1', isDivider: true },
  { id: 'github', label: 'GitHub', icon: FaGithub, href: 'https://github.com/Anwaribra', external: true },
  { id: 'linkedin', label: 'LinkedIn', icon: FaLinkedin, href: 'https://www.linkedin.com/in/anwar-mousa/', external: true },
  { id: 'divider-2', isDivider: true },
  { id: 'connect', label: 'Contact', icon: Mail, href: '#connect' },
]

export default function FloatingDock() {
  const [activeSection, setActiveSection] = useState<string>('about')
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const connectEl = document.getElementById('connect')
      const projectsEl = document.getElementById('projects')

      if (connectEl && connectEl.getBoundingClientRect().top <= window.innerHeight * 0.55) {
        setActiveSection('connect')
      } else if (projectsEl && projectsEl.getBoundingClientRect().top <= window.innerHeight * 0.45 && projectsEl.getBoundingClientRect().bottom > 150) {
        setActiveSection('projects')
      } else {
        setActiveSection('about')
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScrollTo = (href: string) => {
    const targetId = href.replace('#', '')
    const el = document.getElementById(targetId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden pointer-events-none px-4 select-none">
      <motion.nav
        className="pointer-events-auto relative flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#0d0d12]/85 border border-white/20 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.2)] overflow-hidden"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      >
        {/* Subtle top liquid glare */}
        <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

        {dockItems.map((item) => {
          if (item.isDivider) {
            return (
              <div
                key={item.id}
                className="h-3.5 w-[1px] bg-white/15 mx-1 shrink-0"
                aria-hidden="true"
              />
            )
          }

          const IconComponent = item.icon!
          const isActive = !item.external && activeSection === item.id

          const buttonContent = (
            <motion.div
              className={`relative flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 ${
                isActive
                  ? 'bg-white/20 text-white shadow-[0_0_12px_rgba(255,255,255,0.2)]'
                  : 'text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.88 }}
              onMouseEnter={() => setActiveTooltip(item.id)}
              onMouseLeave={() => setActiveTooltip(null)}
              onTouchStart={() => setActiveTooltip(item.id)}
              onTouchEnd={() => setTimeout(() => setActiveTooltip(null), 800)}
            >
              <IconComponent className="w-4 h-4 stroke-[1.8]" />

              {/* Minimal active glow dot */}
              {isActive && (
                <motion.span
                  layoutId="active-dock-dot"
                  className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}

              {/* Floating Tooltip */}
              <AnimatePresence>
                {activeTooltip === item.id && (
                  <motion.div
                    className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 text-[10px] font-mono font-bold tracking-wider text-zinc-100 bg-[#16161c] border border-white/25 rounded-full backdrop-blur-2xl whitespace-nowrap shadow-2xl pointer-events-none"
                    initial={{ opacity: 0, y: 4, scale: 0.88 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 3, scale: 0.88 }}
                    transition={{ duration: 0.12 }}
                  >
                    {item.label}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )

          if (item.external) {
            return (
              <Link
                key={item.id}
                href={item.href!}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="relative flex items-center justify-center"
              >
                {buttonContent}
              </Link>
            )
          }

          return (
            <button
              key={item.id}
              onClick={() => handleScrollTo(item.href!)}
              aria-label={item.label}
              type="button"
              className="relative flex items-center justify-center"
            >
              {buttonContent}
            </button>
          )
        })}
      </motion.nav>
    </div>
  )
}




