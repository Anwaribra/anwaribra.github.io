'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaAws, FaExternalLinkAlt } from 'react-icons/fa'
import { SiGoogle, SiGooglecloud } from 'react-icons/si'
import { Certification } from '@/data/portfolio'

interface CertificationsProps {
  certifications: Certification[]
}

const ISSUER_META: Record<string, { icon: React.ReactNode; glowBg: string; border: string }> = {
  "Amazon Web Services": {
    icon: <FaAws className="text-4xl text-[#FF9900]" />,
    glowBg: "bg-[#FF9900]/20",
    border: "border-[#FF9900]/20",
  },
  Google: {
    icon: <SiGoogle className="text-3xl text-[#4285F4]" />,
    glowBg: "bg-[#4285F4]/20",
    border: "border-[#4285F4]/20",
  },
  "Digital Egypt Pioneers Initiative (DEPI)": {
    icon: (
      <div className="flex items-center leading-none">
        <span className="text-xs font-mono font-bold tracking-widest text-[#00D2FF]">DEPI</span>
      </div>
    ),
    glowBg: "bg-[#00D2FF]/20",
    border: "border-[#00D2FF]/25",
  },
}

export default function Certifications({ certifications }: CertificationsProps) {
  return (
    <motion.section
      id="certifications"
      className="py-8 sm:py-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="section-heading mb-8 sm:mb-10">Certifications</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-4">
        {certifications.map((cert, index) => {
          const meta = ISSUER_META[cert.issuer] ?? {
            icon: <SiGooglecloud className="text-3xl text-zinc-300" />,
            glowBg: "bg-white/10",
            border: "border-white/10",
          }

          const CardContent = (
            <div
              className={`glow-card group p-6 sm:p-7 flex flex-col justify-between h-full bg-[#111111]/90 backdrop-blur-xl border border-white/[0.08] rounded-2xl transition-all duration-[220ms] ease-out hover:-translate-y-[6px] hover:bg-[#161616] hover:border-white/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.85)] ${
                cert.url ? 'cursor-pointer' : ''
              }`}
            >
              <div>
                {/* Large Logo Container with Subtle Radial Icon Glow */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#181818] border border-white/10 flex items-center justify-center mb-6 overflow-hidden transition-colors duration-200 group-hover:border-white/20">
                  <div 
                    className={`absolute inset-0 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none ${meta.glowBg}`}
                    aria-hidden="true" 
                  />
                  <div className="relative z-10">
                    {meta.icon}
                  </div>
                </div>

                {/* Typography Hierarchy */}
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug tracking-tight mb-1.5 group-hover:text-white transition-colors duration-200">
                  {cert.name}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-[#A3A3A3] mb-6">
                  {cert.issuer}
                </p>
              </div>

              {/* Minimal Credential Action Link */}
              {cert.url && (
                <div className="flex items-center justify-between pt-4 border-t border-[#1F1F1F] mt-auto">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#A3A3A3] group-hover:text-white transition-colors duration-200">
                    View Credential
                    <FaExternalLinkAlt className="text-[10px] text-[#A3A3A3] group-hover:text-white transition-colors duration-200" />
                  </span>
                </div>
              )}
            </div>
          )

          return cert.url ? (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="h-full"
            >
              <Link
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${cert.name} credential`}
                className="block h-full"
              >
                {CardContent}
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="h-full"
            >
              {CardContent}
            </motion.div>
          )
        })}
      </div>
    </motion.section>
  )
}
