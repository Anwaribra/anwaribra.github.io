import Header from '@/components/Header'
import Hero from '@/components/Hero'
import GitHubStats from '@/components/GitHubStats'
import ExperienceSection from '@/components/Experience'
import Education from '@/components/Education'
import Certifications from '@/components/Certifications'
import Connect from '@/components/Connect'
import FloatingDock from '@/components/FloatingDock'
import { experiences, certifications } from '@/data/portfolio'

export default function Home() {
  return (
    <>
      <FloatingDock />
      <div className="min-h-screen px-4 sm:px-6 max-w-3xl mx-auto flex flex-col justify-between">
        <div>
          <Header />
          <main className="pt-4 sm:pt-6 space-y-6 sm:space-y-8">
            <Hero />
            <GitHubStats />
            <ExperienceSection experiences={experiences} />
            <Education />
            <Certifications certifications={certifications} />
          </main>
        </div>
        <Connect />
      </div>
    </>
  )
}
