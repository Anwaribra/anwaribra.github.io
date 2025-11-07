import React from 'react'
import Hero from '@/components/Hero'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import ExperienceSection from '@/components/Experience'
import Connect from '@/components/Connect'
import BackToTop from '@/components/BackToTop'
import { projects, experiences } from '@/data/portfolio'

export default function Home() {
  return (
    <main className="min-h-screen px-4 sm:px-6 py-8 sm:py-12 max-w-4xl mx-auto">
      <Hero />
      <Skills />
      <Projects projects={projects} />
      <ExperienceSection experiences={experiences} />
      <Connect />
      <BackToTop />
    </main>
  )
}
