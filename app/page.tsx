import Header from '@/components/Header'
import Hero from '@/components/Hero'
import GitHubStats from '@/components/GitHubStats'
import ExperienceSection from '@/components/Experience'
import Education from '@/components/Education'
import Certifications from '@/components/Certifications'
import Connect from '@/components/Connect'
import ThinkerDock from '@/components/ThinkerDock'
import { experiences, certifications } from '@/data/portfolio'

export default function Home() {
  return (
    <>
      <ThinkerDock />
      <div className="min-h-screen pb-28 px-4 sm:px-6 max-w-2xl mx-auto flex flex-col justify-between">
        <div>
          <Header />
          <main className="pt-4 sm:pt-6 space-y-6 sm:space-y-8">
            <Hero />
            <GitHubStats />
            <Connect />
            <ExperienceSection experiences={experiences} />
            <Education />
            <Certifications certifications={certifications} />
          </main>
        </div>
        
      </div>
    </>
  )
}
