'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { FaGithub, FaLinkedin, FaWhatsapp, FaTwitter } from 'react-icons/fa'

export default function Connect() {
  return (
    <motion.section
      id="connect"
      className="py-12 sm:py-16 border-t border-white/[0.08] mt-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-6 max-w-2xl">
        {/* Headline matching user screenshot */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight font-sans">
          Let&apos;s build something that has to stay up.
        </h2>

        {/* Minimalist Icon Bar matching user screenshot */}
        <div className="flex items-center gap-5 sm:gap-6 pt-2">
          <a
            href="mailto:anwarmousa100@gmail.com"
            aria-label="Email"
            className="text-zinc-400 hover:text-white transition-all duration-200 hover:scale-110"
          >
            <Mail className="w-5 h-5 stroke-[1.8]" />
          </a>

          <a
            href="https://wa.me/201144162459"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="text-zinc-400 hover:text-white transition-all duration-200 hover:scale-110"
          >
            <FaWhatsapp className="w-5 h-5" />
          </a>

          <a
            href="https://github.com/Anwaribra"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-zinc-400 hover:text-white transition-all duration-200 hover:scale-110"
          >
            <FaGithub className="w-5 h-5" />
          </a>

          <a
            href="https://www.linkedin.com/in/anwar-mousa/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-zinc-400 hover:text-white transition-all duration-200 hover:scale-110"
          >
            <FaLinkedin className="w-5 h-5" />
          </a>

          <a
            href="https://x.com/_vincenzzo"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            className="text-zinc-400 hover:text-white transition-all duration-200 hover:scale-110"
          >
            <FaTwitter className="w-5 h-5" />
          </a>
        </div>
      </div>
    </motion.section>
  )
}
