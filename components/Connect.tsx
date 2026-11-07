'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Check, Copy } from 'lucide-react'
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

export default function Connect() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('anwarmousa100@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.section
      id="connect"
      className="pt-12 sm:pt-16 pb-24 border-t border-black/10 dark:border-white/[0.08] mt-8 relative group overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
    >
      {/* Sword Watermark strictly framed inside Connect section */}
      <img
        src="/assets/images/sword-watermark.png"
        alt=""
        aria-hidden="true"
        className="absolute w-[clamp(320px,46vw,600px)] opacity-25 grayscale-[80%] saturate-50 transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:grayscale-0 group-hover:saturate-100 z-0 pointer-events-none"
        style={{
          right: 'clamp(-4rem, -5vw, 0rem)',
          top: '55%',
          transform: 'translateY(-50%) rotate(180deg)',
          userSelect: 'none',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
        }}
      />

      <div className="space-y-6 max-w-3xl relative z-10">
        {/* Handwritten Headline adapting gracefully to light/dark mode */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-handwritten text-zinc-900 dark:text-[#C6F36A] leading-tight tracking-wide dark:drop-shadow-[0_0_12px_rgba(198,243,106,0.15)]">
          Let&apos;s build something that has to stay up.
        </h2>

        {/* Interactive Contact & Direct Outreach Bar */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          {/* 1-Click Copy Email Pill */}
          <button
            onClick={copyEmail}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/5 dark:bg-white/[0.04] border border-black/10 dark:border-white/10 hover:border-zinc-900/30 dark:hover:border-[#C6F36A]/40 text-xs sm:text-sm font-mono text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-all duration-200 group/btn shadow-sm"
            title="Click to copy email address"
          >
            <Mail className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400 group-hover/btn:text-zinc-900 dark:group-hover/btn:text-[#C6F36A] transition-colors" />
            <span>anwarmousa100@gmail.com</span>
            {copied ? (
              <span className="flex items-center gap-1 text-emerald-600 dark:text-[#C6F36A] text-xs font-semibold pl-1">
                <Check className="w-3.5 h-3.5" />
                <span>Copied!</span>
              </span>
            ) : (
              <Copy className="w-3 h-3 text-zinc-400 opacity-60 group-hover/btn:opacity-100 transition-opacity" />
            )}
          </button>

          {/* Minimal Social & Messaging Links */}
          <div className="flex items-center gap-1">
            <a
              href="https://wa.me/201144162459"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="p-2 rounded-full text-zinc-500 dark:text-zinc-400 hover:text-[#25D366] hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200"
              title="Chat on WhatsApp"
            >
              <FaWhatsapp className="w-4 h-4" />
            </a>

            <a
              href="https://github.com/Anwaribra"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-full text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200"
              title="GitHub"
            >
              <FaGithub className="w-4 h-4" />
            </a>

            <a
              href="https://www.linkedin.com/in/anwar-mousa/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-full text-zinc-500 dark:text-zinc-400 hover:text-[#0A66C2] hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200"
              title="LinkedIn"
            >
              <FaLinkedin className="w-4 h-4" />
            </a>

            <a
              href="https://x.com/_vincenzzo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="p-2 rounded-full text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200"
              title="X / Twitter"
            >
              <FaXTwitter className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
