'use client'

import React, { useEffect, useRef } from 'react'

export default function InteractiveVideoHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  
  // Offscreen canvas for the spotlight masking effect
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null)
  
  // State refs for animation loop
  const isHovering = useRef(false)
  const isPlaying = useRef(false)
  
  // Spotlight tracking
  const targetPos = useRef({ x: 0, y: 0 })
  const currentPos = useRef({ x: 0, y: 0 })
  const fadeAlpha = useRef(0) // 0 to 1 for smooth fade in/out of the spotlight
  
  // RAF handle
  const rafRef = useRef<number>()

  useEffect(() => {
    // Setup offscreen canvas
    if (typeof document !== 'undefined' && !offscreenCanvasRef.current) {
      offscreenCanvasRef.current = document.createElement('canvas')
    }
    
    const canvas = canvasRef.current
    const video = videoRef.current
    if (!canvas || !video) return

    // Ensure we handle video loading
    const handleLoadedMetadata = () => {
      // Force an initial draw once we know dimensions
      drawFrame()
    }
    video.addEventListener('loadeddata', handleLoadedMetadata)
    // Draw first frame if already loaded (e.g. cached)
    if (video.readyState >= 2) {
      drawFrame()
    }

    // Handle resize
    const handleResize = () => {
      const parent = canvas.parentElement
      if (parent) {
        // Match parent width exactly
        canvas.width = parent.clientWidth
        // Height responsive
        canvas.height = Math.min(window.innerHeight * 0.55, 600)
        
        if (offscreenCanvasRef.current) {
          offscreenCanvasRef.current.width = canvas.width
          offscreenCanvasRef.current.height = canvas.height
        }
        
        // Redraw immediately on resize
        if (!rafRef.current) {
          rafRef.current = requestAnimationFrame(drawFrame)
        }
      }
    }
    
    window.addEventListener('resize', handleResize)
    handleResize() // init dimensions

    return () => {
      window.removeEventListener('resize', handleResize)
      video.removeEventListener('loadeddata', handleLoadedMetadata)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const drawFrame = () => {
    rafRef.current = undefined // Clear raf handle so we know we can schedule another
    const canvas = canvasRef.current
    const video = videoRef.current
    const offscreenCanvas = offscreenCanvasRef.current
    if (!canvas || !video || !offscreenCanvas) return

    const ctx = canvas.getContext('2d', { alpha: false })
    const offCtx = offscreenCanvas.getContext('2d', { willReadFrequently: true }) 
    if (!ctx || !offCtx) return

    // Calculate object-fit: cover scaling
    const vRatio = canvas.width / (video.videoWidth || 1920)
    const hRatio = canvas.height / (video.videoHeight || 1080)
    const ratio = Math.max(vRatio, hRatio) || 1
    const drawWidth = (video.videoWidth || 1920) * ratio
    const drawHeight = (video.videoHeight || 1080) * ratio
    const x = (canvas.width - drawWidth) / 2
    const y = (canvas.height - drawHeight) / 2

    // 1. Draw base grayscale image
    ctx.filter = 'grayscale(100%) brightness(45%)'
    if (video.readyState >= 2) {
      ctx.drawImage(video, x, y, drawWidth, drawHeight)
    } else {
      ctx.fillStyle = '#050505'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
    ctx.filter = 'none'

    // 2. Spotlight interpolation logic
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (reducedMotion) {
      currentPos.current.x = targetPos.current.x
      currentPos.current.y = targetPos.current.y
      fadeAlpha.current = isHovering.current ? 1 : 0
    } else {
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.15
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.15
      
      const targetFade = isHovering.current ? 1 : 0
      fadeAlpha.current += (targetFade - fadeAlpha.current) * 0.08
    }

    // 3. Draw Spotlight if visible
    if (fadeAlpha.current > 0.01 && video.readyState >= 2) {
      // Clear offscreen canvas completely
      offCtx.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height)
      
      // Draw colorful video to offscreen canvas
      offCtx.globalCompositeOperation = 'source-over'
      offCtx.drawImage(video, x, y, drawWidth, drawHeight)
      
      // Create radial mask
      offCtx.globalCompositeOperation = 'destination-in'
      
      const spotlightRadius = 250 // Soft edge needs larger radius
      const gradient = offCtx.createRadialGradient(
        currentPos.current.x, currentPos.current.y, 0,
        currentPos.current.x, currentPos.current.y, spotlightRadius
      )
      
      gradient.addColorStop(0, `rgba(255, 255, 255, ${fadeAlpha.current})`)
      gradient.addColorStop(0.4, `rgba(255, 255, 255, ${fadeAlpha.current * 0.6})`)
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
      
      offCtx.fillStyle = gradient
      offCtx.fillRect(0, 0, offscreenCanvas.width, offscreenCanvas.height)
      
      // Draw offscreen canvas on top of main canvas
      ctx.drawImage(offscreenCanvas, 0, 0)
    }

    // 4. Continue loop if playing or if spotlight needs fading/moving
    const needsAnimation = isPlaying.current || 
                           Math.abs(fadeAlpha.current - (isHovering.current ? 1 : 0)) > 0.01 ||
                           Math.abs(currentPos.current.x - targetPos.current.x) > 1 ||
                           Math.abs(currentPos.current.y - targetPos.current.y) > 1

    if (needsAnimation) {
      rafRef.current = requestAnimationFrame(drawFrame)
    }
  }

  // Event Handlers
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      targetPos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
      
      if (!isPlaying.current && !rafRef.current) {
        rafRef.current = requestAnimationFrame(drawFrame)
      }
    }
  }

  const handlePointerEnter = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.pointerType === 'mouse') {
      isHovering.current = true
      const rect = canvasRef.current?.getBoundingClientRect()
      if (rect) {
        currentPos.current = targetPos.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        }
      }
      if (!isPlaying.current && !rafRef.current) {
        rafRef.current = requestAnimationFrame(drawFrame)
      }
    }
  }

  const handlePointerLeave = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isHovering.current = false
    const video = videoRef.current
    if (video && isPlaying.current) {
      video.pause()
      isPlaying.current = false
    }
    
    if (!isPlaying.current && !rafRef.current) {
      rafRef.current = requestAnimationFrame(drawFrame)
    }
  }

  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    const video = videoRef.current
    if (!video) return

    if (e.type === 'touchstart' && !isHovering.current) {
      isHovering.current = true
      const touchE = e as React.TouchEvent
      const rect = canvasRef.current?.getBoundingClientRect()
      if (rect && touchE.touches[0]) {
        targetPos.current = {
          x: touchE.touches[0].clientX - rect.left,
          y: touchE.touches[0].clientY - rect.top
        }
        currentPos.current = { ...targetPos.current }
      }
      
      video.play().catch(() => {})
      isPlaying.current = true
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(drawFrame)
      }
      return
    }

    if (isPlaying.current) {
      video.pause()
      isPlaying.current = false
      if (e.type === 'touchstart') {
        isHovering.current = false
      }
    } else {
      video.play().catch(() => {})
      isPlaying.current = true
    }
    
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(drawFrame)
    }
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (isHovering.current) {
      const rect = canvasRef.current?.getBoundingClientRect()
      if (rect && e.touches[0]) {
        targetPos.current = {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top
        }
        if (!isPlaying.current && !rafRef.current) {
          rafRef.current = requestAnimationFrame(drawFrame)
        }
      }
    }
  }
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      const video = videoRef.current
      if (!video) return
      
      if (isPlaying.current) {
        video.pause()
        isPlaying.current = false
      } else {
        if (!isHovering.current && canvasRef.current) {
          isHovering.current = true
          targetPos.current = currentPos.current = {
            x: canvasRef.current.width / 2,
            y: canvasRef.current.height / 2
          }
        }
        video.play().catch(() => {})
        isPlaying.current = true
      }
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(drawFrame)
      }
    }
  }

  return (
    <section className="w-full relative mb-12 sm:mb-16 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a0a]">
      <video
        ref={videoRef}
        src="/Legend_of_the_Northern.mp4"
        className="hidden"
        loop
        muted
        playsInline
        crossOrigin="anonymous"
      />
      
      <canvas
        ref={canvasRef}
        className="block w-full cursor-none outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-2xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]"
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
        onTouchStart={handleClick}
        onTouchMove={handleTouchMove}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        aria-label="Interactive Hero Video. Click or tap to play/pause. Move pointer to reveal colorful details."
        role="button"
      />
    </section>
  )
}
