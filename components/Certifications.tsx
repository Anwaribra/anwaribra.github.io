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

const ISSUER_META: Record<string, { icon: React.ReactNode; bg: string; border: string }> = {
  "Amazon Web Services": {
    icon: <FaAws className="text-3xl text-[#FF9900]" />,
    bg: "bg-[#FF9900]/5",
    border: "border-[#FF9900]/20",
  },
  Google: {
    icon: <SiGoogle className="text-2xl text-[#4285F4]" />,
    bg: "bg-[#4285F4]/5",
    border: "border-[#4285F4]/20",
  },
  "Digital Egypt Pioneers Initiative (DEPI)": {
    icon: (
      <div className="flex items-center leading-none">
        <span className="text-[10px] font-bold tracking-wide text-[#2B8AC6]">DEPI</span>
      </div>
    ),
    bg: "bg-[#2B8AC6]/10",
    border: "border-[#2B8AC6]/30",
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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mt-4">
        {certifications.map((cert, index) => {
          const meta = ISSUER_META[cert.issuer] ?? {
            icon: <SiGooglecloud className="text-2xl text-gray-400" />,
            bg: "bg-white/5",
            border: "border-white/10",
          }

          const CardContent = (
            <motion.div
              className={`glow-card p-5 sm:p-6 flex flex-col gap-4 h-full ${cert.url ? 'cursor-pointer' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={cert.url ? { y: -4 } : undefined}
            >
              {/* Icon badge */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${meta.bg} ${meta.border}`}>
                {meta.icon}
              </div>

              {/* Text */}
              <div className="flex-1">
                <h3 className="text-sm sm:text-base font-bold leading-snug mb-1">
                  {cert.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">{cert.issuer}</p>
              </div>

              {/* Link indicator */}
              {cert.url && (
                <div className="flex items-center gap-1.5 text-xs text-green-500/70 font-medium mt-auto">
                  <FaExternalLinkAlt className="text-[10px]" />
                  View credential
                </div>
              )}
            </motion.div>
          )

          return cert.url ? (
            <Link
              key={index}
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${cert.name} credential`}
              className="block h-full"
            >
              {CardContent}
            </Link>
          ) : (
            <div key={index} className="h-full">
              {CardContent}
            </div>
          )
        })}
      </div>
    </motion.section>
  )
}
