'use client'

import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { FileText, Mail, Check, Sun, Moon } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { Glass, Button } from 'glisse'

interface DockItemData {
  id: string
  label: string
  icon: React.ElementType
  href: string
  external?: boolean
}

const dockItems: DockItemData[] = [
  { id: 'github', label: 'GitHub', icon: FaGithub, href: 'https://github.com/Anwaribra', external: true },
  { id: 'linkedin', label: 'LinkedIn', icon: FaLinkedin, href: 'https://www.linkedin.com/in/anwar-mousa/', external: true },
  { id: 'resume', label: 'Resume', icon: FileText, href: '/assets/docs/CV.pdf', external: true },
  { id: 'contact', label: 'Contact', icon: Mail, href: 'mailto:anwarmousa100@gmail.com', external: false },
]

export default function FloatingDock() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (resolvedTheme) {
      document.documentElement.setAttribute('data-theme', resolvedTheme)
    }
  }, [resolvedTheme])

  const isDark = mounted ? resolvedTheme === 'dark' : true

  const toggleTheme = () => {
    const nextTheme = isDark ? 'light' : 'dark'
    setTheme(nextTheme)
    document.documentElement.setAttribute('data-theme', nextTheme)
  }

  const handleContactClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      await navigator.clipboard.writeText('anwarmousa100@gmail.com')
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch {
      window.location.href = 'mailto:anwarmousa100@gmail.com'
    }
  }

  return (
    <div className="fixed bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 z-50 pointer-events-none px-2 select-none max-w-full">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
        className="pointer-events-auto"
      >
        <Glass
          data-theme={mounted ? (resolvedTheme || 'dark') : 'dark'}
          className="dock-liquid-glass flex h-11 sm:h-12 items-center gap-0.5 sm:gap-1 rounded-full px-1.5 sm:px-2 py-1 shadow-2xl"
        >
          {dockItems.map((item) => {
            const Icon = item.icon

            if (item.external) {
              return (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="inline-flex rounded-full"
                >
                  <Button
                    variant="glass"
                    className="dock-item-btn"
                    aria-label={item.label}
                    icon={<Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.8]" />}
                  />
                </a>
              )
            }

            return (
              <Button
                key={item.id}
                variant="glass"
                className="dock-item-btn"
                aria-label={item.label}
                onClick={handleContactClick}
                icon={
                  isCopied ? (
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 dark:text-emerald-400 stroke-[2.2]" />
                  ) : (
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.8]" />
                  )
                }
              />
            )
          })}

          {/* Minimalist Slim Liquid Glass Divider */}
          <div className="w-[1px] h-4 bg-black/10 dark:bg-white/10 mx-0.5 rounded-full shrink-0" />

          {/* Theme Toggle Button */}
          <Button
            variant="glass"
            className="dock-item-btn"
            aria-label="Toggle theme"
            onClick={toggleTheme}
            icon={
              !mounted ? (
                <div className="w-3.5 h-3.5" />
              ) : isDark ? (
                <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-300 hover:text-white stroke-[1.8] transition-transform duration-300 hover:rotate-45" />
              ) : (
                <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-600 hover:text-zinc-950 stroke-[1.8] transition-transform duration-300 hover:-rotate-12" />
              )
            }
          />
        </Glass>
      </motion.div>
    </div>
  )
}
