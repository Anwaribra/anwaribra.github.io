import React from 'react'
import Hero from '@/components/Hero'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import ExperienceSection from '@/components/Experience'
import Education from '@/components/Education'
import Certifications from '@/components/Certifications'
import GitHubStats from '@/components/GitHubStats'
import Connect from '@/components/Connect'
import FooterSignature from '@/components/FooterSignature'
import BackToTop from '@/components/BackToTop'
import FloatingDock from '@/components/FloatingDock'
import { projects, experiences, certifications } from '@/data/portfolio'

export default function Home() {
  return (
    <>
      <FloatingDock />
      <main className="relative z-10 min-h-screen px-4 sm:px-6 pt-8 sm:pt-12 pb-0 max-w-4xl mx-auto">

        <Hero />
        <ExperienceSection experiences={experiences} />
        <div className="section-divider" />
        <Projects projects={projects} />
        <div className="section-divider" />
        <Skills />
        <div className="section-divider" />
        <Certifications certifications={certifications} />
        <div className="section-divider" />
        <Education />
        <div className="section-divider" />
        <GitHubStats />
        <Connect />
        <FooterSignature />
        <BackToTop />
      </main>
    </>
  )
}
