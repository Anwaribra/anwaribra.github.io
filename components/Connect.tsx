'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Check, FileText } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

export default function Connect() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('anwarmousa100@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const socialLinks = [
    {
      name: 'X (Twitter)',
      href: 'https://x.com/_vincenzzo',
      icon: FaXTwitter,
    },
    {
      name: 'GitHub',
      href: 'https://github.com/Anwaribra',
      icon: FaGithub,
    },
    {
      name: 'Resume',
      href: '/assets/docs/CV.pdf',
      icon: FileText,
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/anwar-mousa/',
      icon: FaLinkedin,
    },
  ]

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
        {/* Handwritten Headline in Katana Purple */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-handwritten text-[#9333EA] dark:text-[#C084FC] leading-tight tracking-wide drop-shadow-[0_0_12px_rgba(168,85,247,0.25)]">
          Let&apos;s build something that has to stay up.
        </h2>

        {/* Apple-style Tactile Icon Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          {/* Email button with 1-click copy */}
          <button
            onClick={copyEmail}
            type="button"
            className="apple-icon-btn group relative"
            title="Click to copy email"
            aria-label="Copy Email"
          >
            {copied ? (
              <Check className="w-4 h-4 text-[#A855F7] stroke-[2.5]" />
            ) : (
              <Mail className="w-4 h-4 text-zinc-700 dark:text-zinc-400 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors" />
            )}
          </button>

          {socialLinks.map((item) => {
            const Icon = item.icon
            return (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.name}
                title={item.name}
                className="apple-icon-btn group relative"
              >
                <Icon className="w-4 h-4 text-zinc-700 dark:text-zinc-400 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors" />
              </a>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}
