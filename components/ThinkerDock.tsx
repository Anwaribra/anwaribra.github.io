'use client'

import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { revealTheme } from '@/lib/themeReveal'
import { FileText, Mail, Sun, Moon } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { MaterialDock } from '@/components/thinker-ui/MaterialDock'

export default function ThinkerDock() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isDark = mounted ? resolvedTheme !== 'light' : true

  const items = [
    { id: 'github', label: 'GitHub', icon: <FaGithub size={20} /> },
    { id: 'linkedin', label: 'LinkedIn', icon: <FaLinkedin size={20} /> },
    { id: 'resume', label: 'Resume', icon: <FileText size={20} /> },
    { id: 'email', label: 'Email me', icon: <Mail size={20} /> },
    { id: 'theme', label: isDark ? 'Light mode' : 'Dark mode', icon: isDark ? <Sun size={20} /> : <Moon size={20} /> },
  ]

  const go = async (id: string) => {
    if (id === 'github') window.open('https://github.com/Anwaribra', '_blank', 'noopener')
    if (id === 'linkedin') window.open('https://www.linkedin.com/in/anwar-mousa/', '_blank', 'noopener')
    if (id === 'resume') window.open('/assets/docs/CV.pdf', '_blank', 'noopener')
    if (id === 'theme') {
      const next = isDark ? 'light' : 'dark'
      // Origin of the reveal: the toggle button that was just pressed.
      const btn = (document.activeElement as HTMLElement | null)?.closest?.('button') ||
        document.querySelector('[aria-label="Links and theme"] button[aria-label$=" mode"]')
      const rect = btn?.getBoundingClientRect()
      const x = rect ? (rect.left + rect.width / 2) : window.innerWidth / 2
      const y = rect ? (rect.top + rect.height / 2) : window.innerHeight
      revealTheme(setTheme, next, x, y)
    }
    if (id === 'email') window.location.href = 'mailto:anwarmousa100@gmail.com?subject=Opportunity%20for%20Anwar%20Mousa'
  }

  return (
    <div className="fixed inset-x-0 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-50 flex justify-center pointer-events-none select-none px-2">
      <div className="pointer-events-auto shrink-0 origin-bottom scale-[0.72] [&_[role=group]]:!flex-nowrap [&_[role=group]]:!gap-[6px] [&_[role=group]]:!p-[10px]">
        <MaterialDock items={items} value="" onChange={go} label="Links and theme" showLabel={false} />
      </div>
    </div>
  )
}
