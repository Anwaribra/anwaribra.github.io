import Header from '@/components/Header'
import Projects from '@/components/Projects'
import Connect from '@/components/Connect'
import FloatingDock from '@/components/FloatingDock'

export const metadata = {
  title: 'Projects | Anwar Mousa',
  description: 'Data platforms, streaming ETL architectures, and autonomous AI systems built by Anwar Mousa.',
}

export default function ProjectsPage() {
  return (
    <>
      <FloatingDock />
      <div className="min-h-screen px-4 sm:px-6 max-w-4xl mx-auto flex flex-col justify-between pb-[calc(7rem+env(safe-area-inset-bottom))]">
        <div>
          <div className="max-w-2xl mx-auto"><Header /></div>
          <main className="pt-4 sm:pt-6 space-y-6">
            <Projects />
          </main>
        </div>
        <div className="max-w-2xl mx-auto w-full"><Connect /></div>
      </div>
    </>
  )
}
