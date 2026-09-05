'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ExternalLink, Award, ShieldCheck } from 'lucide-react'
import { FaAws } from 'react-icons/fa'
import { SiGoogle } from 'react-icons/si'
import { Certification } from '@/data/portfolio'

interface CertificationsProps {
  certifications: Certification[]
}

const ISSUER_META: Record<string, { icon: React.ReactNode; tag: string }> = {
  "Amazon Web Services": {
    icon: <FaAws className="w-5 h-5 text-zinc-300 group-hover:text-[#FF9900] transition-colors" />,
    tag: "AWS Certified",
  },
  Google: {
    icon: <SiGoogle className="w-4 h-4 text-zinc-300 group-hover:text-[#4285F4] transition-colors" />,
    tag: "Google Professional",
  },
  "Digital Egypt Pioneers Initiative (DEPI)": {
    icon: <ShieldCheck className="w-5 h-5 text-zinc-300 group-hover:text-cyan-400 transition-colors" />,
    tag: "DEPI Specialist",
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
      <h2 className="section-heading mb-6">Certifications</h2>

      {/* Clean Borderless List View (Max Katz Style) */}
      <div className="divide-y divide-white/[0.06] pt-2">
        {certifications.map((cert, index) => {
          const meta = ISSUER_META[cert.issuer] ?? {
            icon: <Award className="w-5 h-5 text-zinc-300" />,
            tag: "Verified Certificate",
          }

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.05 }}
              className="py-6 first:pt-2 last:pb-2 flex items-start gap-3 sm:gap-4 group"
            >
              {/* Brand Badge Icon */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center p-1.5 shrink-0 group-hover:border-white/20 transition-colors shadow-sm mt-0.5">
                {meta.icon}
              </div>

              {/* Right Content */}
              <div className="flex-1 min-w-0">
                {/* Header line: Title & Verify Link */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-zinc-100 transition-colors">
                    {cert.name}
                  </h3>

                  {cert.url && (
                    <Link
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono font-medium text-zinc-400 hover:text-white transition-colors shrink-0"
                      aria-label={`Verify ${cert.name}`}
                    >
                      <span>Verify Credential</span>
                      <ExternalLink className="w-3.5 h-3.5 stroke-[1.8]" />
                    </Link>
                  )}
                </div>

                {/* Issuer Name */}
                <p className="text-xs sm:text-sm font-medium text-zinc-400 mt-0.5">
                  {cert.issuer}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.section>
  )
}
