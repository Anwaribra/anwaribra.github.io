import Header from '@/components/Header'
import Projects from '@/components/Projects'
import Connect from '@/components/Connect'
import FloatingDock from '@/components/FloatingDock'
import { projects } from '@/data/portfolio'

export const metadata = {
  title: 'Projects | Anwar Mousa',
  description: 'Data platforms, streaming ETL architectures, and autonomous AI systems built by Anwar Mousa.',
}

export default function ProjectsPage() {
  return (
    <>
      <FloatingDock />
      <div className="min-h-screen px-4 sm:px-6 max-w-2xl mx-auto flex flex-col justify-between">
        <div>
          <Header />
          <main className="pt-4 sm:pt-6 space-y-6">
            <Projects
              projects={projects}
              title="Projects"
              subtitle="Data platforms, real-time streaming architectures, and autonomous agent systems."
            />
          </main>
        </div>
        <Connect />
      </div>
    </>
  )
}
