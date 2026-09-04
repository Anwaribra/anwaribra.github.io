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
    icon: <FaAws className="text-3xl text-zinc-100 group-hover:text-[#FF9900] transition-colors" />,
    tag: "AWS Certified",
  },
  Google: {
    icon: <SiGoogle className="text-2xl text-zinc-100 group-hover:text-[#4285F4] transition-colors" />,
    tag: "Google Professional",
  },
  "Digital Egypt Pioneers Initiative (DEPI)": {
    icon: <ShieldCheck className="w-6 h-6 text-zinc-100 group-hover:text-cyan-400 transition-colors" />,
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
      <h2 className="section-heading mb-6 sm:mb-8">Certifications</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-4">
        {certifications.map((cert, index) => {
          const meta = ISSUER_META[cert.issuer] ?? {
            icon: <Award className="w-6 h-6 text-zinc-100" />,
            tag: "Verified Certificate",
          }

          const CardInner = (
            <div className="flex flex-col justify-between h-full p-5 rounded-2xl bg-[#121214]/60 border border-white/[0.08] hover:border-white/20 transition-all duration-200 group hover:-translate-y-1 shadow-sm">
              <div>
                {/* Brand Badge Icon + Tag */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[#18181b] border border-white/10 flex items-center justify-center p-2 group-hover:border-white/20 transition-colors shadow-sm">
                    {meta.icon}
                  </div>
                  <span className="text-[10px] font-mono font-medium text-zinc-400 bg-white/[0.04] border border-white/10 px-2.5 py-1 rounded-full">
                    {meta.tag}
                  </span>
                </div>

                {/* Title & Issuer */}
                <h3 className="text-base font-bold text-white tracking-tight leading-snug mb-1.5 group-hover:text-zinc-100 transition-colors">
                  {cert.name}
                </h3>
                <p className="text-xs font-mono text-zinc-400 mb-4">
                  {cert.issuer}
                </p>
              </div>

              {/* Verify Credential Action */}
              {cert.url && (
                <div className="pt-3 border-t border-white/[0.06] mt-auto flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-zinc-400 group-hover:text-white transition-colors">
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3 h-3 stroke-[1.8]" />
                  </span>
                </div>
              )}
            </div>
          )

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              className="h-full"
            >
              {cert.url ? (
                <Link
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Verify ${cert.name}`}
                  className="block h-full cursor-pointer"
                >
                  {CardInner}
                </Link>
              ) : (
                CardInner
              )}
            </motion.div>
          )
        })}
      </div>
    </motion.section>
  )
}

