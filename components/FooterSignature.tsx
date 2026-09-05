'use client'

import React from 'react'

export default function FooterSignature() {
  return (
    <footer className="w-full overflow-hidden flex justify-center items-center mt-4 sm:mt-6 pb-0 mb-0 select-none pointer-events-none">
      <div 
        className="pointer-events-none mx-auto overflow-hidden h-[clamp(44px,8.5vw,88px)] -mb-[1.5vw] sm:-mb-[1vw] w-full text-center text-[clamp(44px,11.2vw,112px)] font-black tracking-tighter leading-none whitespace-nowrap bg-gradient-to-b from-white/55 via-white/25 to-transparent bg-clip-text text-transparent select-none uppercase"
        style={{
          fontFamily: "'Geist Sans', 'Inter', -apple-system, sans-serif",
          letterSpacing: '-0.05em',
          filter: 'drop-shadow(0px 2px 6px rgba(255, 255, 255, 0.1))',
        }}
        aria-hidden="true"
      >
        anwarmousa.me
      </div>
    </footer>
  )
}
