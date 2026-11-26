'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Glass } from 'glisse'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const links = [
  { name: 'GitHub', href: 'https://github.com/Anwaribra', icon: FaGithub },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/anwar-mousa/', icon: FaLinkedin },
  { name: 'X', href: 'https://x.com/_vincenzzo', icon: FaXTwitter },
]

export default function Connect() {
  return (
    <motion.section
      id="connect"
      className="!mt-4 !mb-2 py-2"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
    >
      <div className="space-y-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-handwritten text-[#9333EA] dark:text-[#C084FC] leading-tight tracking-wide">
          Let&apos;s build something that has to stay up.
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          {links.map(({ name, href, icon: Icon }) => (
            <Glass key={name} className="dock-liquid-glass rounded-full">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                title={name}
                className="dock-item-btn rounded-full cursor-pointer"
              >
                <Icon className="w-4 h-4" />
              </a>
            </Glass>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
