'use client'

import React, { useRef, useState } from 'react'
import Link from 'next/link'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  MotionValue,
} from 'framer-motion'
import {
  FileText,
  Mail,
  Check
} from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

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
  { id: 'contact', label: 'Contact', icon: Mail, href: 'mailto:anwarmousa100@gmail.com', external: true },
]

export default function FloatingDock() {
  const mouseX = useMotionValue(Infinity)

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 pointer-events-none px-3 select-none max-w-full">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        onTouchStart={(e) => {
          if (e.touches[0]) mouseX.set(e.touches[0].pageX)
        }}
        onTouchMove={(e) => {
          if (e.touches[0]) mouseX.set(e.touches[0].pageX)
        }}
        onTouchEnd={() => mouseX.set(Infinity)}
        className="pointer-events-auto flex h-12 items-center gap-3 sm:gap-4 rounded-2xl bg-white/[0.03] border border-white/10 px-4 backdrop-blur-xl shadow-2xl shadow-black/50"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      >
        {/* Subtle inner top highlight */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none rounded-t-2xl" />

        {dockItems.map((item) => (
          <React.Fragment key={item.id}>
            <DockIcon mouseX={mouseX} item={item} />
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  )
}

function DockIcon({
  mouseX,
  item,
}: {
  mouseX: MotionValue
  item: DockItemData
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isCopied, setIsCopied] = useState(false)

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  // Magic UI Dock spring interpolation
  const widthSync = useTransform(distance, [-120, 0, 120], [34, 52, 34])
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 180, damping: 12 })

  const iconSizeSync = useTransform(distance, [-120, 0, 120], [16, 24, 16])
  const iconSize = useSpring(iconSizeSync, { mass: 0.1, stiffness: 180, damping: 12 })

  const IconComponent = isCopied && item.id === 'contact' ? Check : item.icon

  const handleScrollTo = (href: string) => {
    const targetId = href.replace('#', '')
    const el = document.getElementById(targetId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleAction = async (e: React.MouseEvent) => {
    if (item.id === 'contact') {
      e.preventDefault()
      try {
        const email = item.href.replace('mailto:', '')
        await navigator.clipboard.writeText(email)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy', err)
      }
    }
  }

  const content = (
    <motion.div
      ref={ref}
      style={{ width, height: width }}
      onClick={handleAction}
      className="relative flex items-center justify-center rounded-xl bg-transparent hover:bg-white/[0.08] text-zinc-400 hover:text-white transition-all cursor-pointer group active:scale-95"
    >
      <motion.div style={{ width: iconSize, height: iconSize }} className="flex items-center justify-center drop-shadow-md group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all">
        <IconComponent className="w-full h-full stroke-[1.5]" />
      </motion.div>
    </motion.div>
  )

  if (item.external) {
    return (
      <Link href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.label}>
        {content}
      </Link>
    )
  }

  return (
    <button type="button" onClick={() => handleScrollTo(item.href)} aria-label={item.label}>
      {content}
    </button>
  )
}
