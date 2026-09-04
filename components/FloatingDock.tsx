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
  Home,
  FolderGit2,
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
  { id: 'about', label: 'Home', icon: Home, href: '#about' },
  { id: 'projects', label: 'Projects', icon: FolderGit2, href: '#projects' },
  { id: 'github', label: 'GitHub', icon: FaGithub, href: 'https://github.com/Anwaribra', external: true },
  { id: 'linkedin', label: 'LinkedIn', icon: FaLinkedin, href: 'https://www.linkedin.com/in/anwar-mousa/', external: true },
]

export default function FloatingDock() {
  const mouseX = useMotionValue(Infinity)

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 md:hidden pointer-events-none px-3 select-none max-w-full">
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
        className="pointer-events-auto flex h-14 items-end gap-2.5 sm:gap-3 rounded-full bg-[#0d0d12]/85 border border-white/20 px-3 pb-2.5 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.2)]"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      >
        {/* Liquid top border highlight */}
        <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

        {dockItems.map((item) => (
          <React.Fragment key={item.id}>
            {/* Insert subtle divider before social links */}
            {item.id === 'github' && (
              <div className="h-5 w-[1px] bg-white/15 mx-0.5 self-center" aria-hidden="true" />
            )}
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
  const [isHovered, setIsHovered] = useState(false)

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  // Magic UI Dock spring interpolation
  const widthSync = useTransform(distance, [-120, 0, 120], [34, 52, 34])
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 180, damping: 12 })

  const iconSizeSync = useTransform(distance, [-120, 0, 120], [16, 24, 16])
  const iconSize = useSpring(iconSizeSync, { mass: 0.1, stiffness: 180, damping: 12 })

  const IconComponent = item.icon

  const handleScrollTo = (href: string) => {
    const targetId = href.replace('#', '')
    const el = document.getElementById(targetId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const content = (
    <motion.div
      ref={ref}
      style={{ width, height: width }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => {
        setIsHovered(true)
        setTimeout(() => setIsHovered(false), 1200)
      }}
      className="relative flex items-center justify-center rounded-full bg-white/[0.06] border border-white/10 hover:border-white/30 hover:bg-white/[0.12] text-zinc-300 hover:text-white transition-colors cursor-pointer shadow-sm active:scale-90"
    >
      <motion.div style={{ width: iconSize, height: iconSize }} className="flex items-center justify-center">
        <IconComponent className="w-full h-full stroke-[1.8]" />
      </motion.div>

      {/* Magic UI Dock Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.85 }}
            animate={{ opacity: 1, y: -40, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.85 }}
            transition={{ duration: 0.15 }}
            className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-1 text-[11px] font-mono font-medium text-white bg-[#141418] border border-white/20 rounded-lg shadow-xl backdrop-blur-xl whitespace-nowrap pointer-events-none"
          >
            {item.label}
          </motion.div>
        )}
      </AnimatePresence>
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
