'use client'

import React from 'react'

export default function FooterSignature() {
  return (
    <footer className="w-full relative overflow-hidden flex justify-center items-center mt-4 sm:mt-6 pb-0 mb-0 select-none pointer-events-none">
      
      <img
        src="/assets/images/sword-watermark.png"
        alt="Decorative sword"
        style={{
          position: 'absolute',
          right: 'clamp(1rem, 6vw, 6rem)',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 'clamp(300px, 45vw, 600px)',
          opacity: 0.25,
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 0,
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
          filter: 'grayscale(70%) saturate(60%)'
        }}
      />

      {/* Existing footer text - preserved exactly */}
      <div 
        className="relative z-10 pointer-events-none mx-auto overflow-hidden h-[clamp(44px,8.5vw,88px)] -mb-[1.5vw] sm:-mb-[1vw] w-full text-center text-[clamp(44px,11.2vw,112px)] font-black tracking-tighter leading-none whitespace-nowrap bg-gradient-to-b from-white/55 via-white/25 to-transparent bg-clip-text text-transparent select-none uppercase"
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
