'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

export default function Connect() {
  return (
    <motion.section
      id="connect"
      className="pt-12 sm:pt-16 pb-24 border-t border-white/[0.08] mt-8 relative group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
    >
      {/* Sword Watermark placed on the right side */}
      <img
        src="/assets/images/sword-watermark.png"
        alt="Decorative sword"
        className="absolute w-[clamp(300px,45vw,600px)] opacity-25 grayscale-[80%] saturate-50 transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:grayscale-0 group-hover:saturate-100 z-0 pointer-events-none"
        style={{
          right: 'clamp(-4rem, -5vw, 0rem)', // Pushed further to the right edge
          top: '50%',
          transform: 'translateY(-50%) rotate(180deg)', // Rotated exactly 180 degrees to put the hilt on top-right
          userSelect: 'none',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
        }}
      />

      <div className="space-y-6 max-w-2xl relative z-10">
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
            aria-label="X"
            className="text-zinc-400 hover:text-white transition-all duration-200 hover:scale-110"
          >
            <FaXTwitter className="w-5 h-5" />
          </a>
        </div>
      </div>
    </motion.section>
  )
}
