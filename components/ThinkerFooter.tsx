import React from 'react'
import { AgenticBadge } from '@/components/thinker-ui/AgenticControls'

export default function ThinkerFooter() {
  return (
    <footer className="py-8 flex justify-center">
      <a href="https://www.thinkerlab.tech/thinker-ui" target="_blank" rel="noopener noreferrer" aria-label="Built with Thinker UI">
        <AgenticBadge tone="new" label="Built with Thinker UI" />
      </a>
    </footer>
  )
}
