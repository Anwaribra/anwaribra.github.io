'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'

export default function HeroVideoBackground() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  
  const isHovering = useRef(false)
  const isPlaying = useRef(false)
  
  const targetPos = useRef({ x: -1000, y: -1000 })
  const currentPos = useRef({ x: -1000, y: -1000 })
  const fadeAlpha = useRef(0)
  
  const rafRef = useRef<number>()
  const rvfcRef = useRef<number>()
  const hasInitializedTime = useRef(false)

  const [isVideoReady, setIsVideoReady] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const video = videoRef.current
    const container = containerRef.current

    if (!canvas || !video || !container) return

    const handleLoadedMetadata = () => {
      if (video.videoWidth > 0 && !hasInitializedTime.current) {
        video.currentTime = 1.0
        hasInitializedTime.current = true
      }
      setIsVideoReady(true)
    }
    
    const handleTimeUpdate = () => {
      if (video.currentTime < 1.0 && hasInitializedTime.current) {
        video.currentTime = 1.0
      }
    }

    const handleError = (e: any) => {
      console.error('[VideoHero] Video Error:', video.error, e)
    }

    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('error', handleError)
    
    if (video.readyState >= 2 && video.videoWidth > 0 && !hasInitializedTime.current) {
      video.currentTime = 1.0
      hasInitializedTime.current = true
      setIsVideoReady(true)
    } else {
      video.load()
    }

    const handleResize = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width || window.innerWidth
      canvas.height = rect.height || window.innerHeight
      triggerDraw()
    }
    
    window.addEventListener('resize', handleResize)
    setTimeout(handleResize, 50)

    const updatePointerCoords = (e: PointerEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect()
      let clientX, clientY
      if ('touches' in e) {
        if (e.touches.length > 0) {
          clientX = e.touches[0].clientX
          clientY = e.touches[0].clientY
        } else return
      } else {
        clientX = e.clientX
        clientY = e.clientY
      }
      targetPos.current = {
        x: clientX - rect.left,
        y: clientY - rect.top
      }
    }

    const triggerDraw = () => {
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => drawLoop())
      }
    }

    const onPointerEnter = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') {
        isHovering.current = true
        updatePointerCoords(e)
        currentPos.current = { ...targetPos.current }
        
        // Autoplay on hover
        if (!isPlaying.current) {
          video.play().catch(console.error)
          isPlaying.current = true
          startVideoLoop()
        }
        triggerDraw()
      }
    }

    const onPointerMove = (e: PointerEvent) => {
      if (isHovering.current || e.pointerType === 'mouse') {
        isHovering.current = true
        updatePointerCoords(e)
        
        // Ensure it's playing if moving
        if (!isPlaying.current) {
          video.play().catch(console.error)
          isPlaying.current = true
          startVideoLoop()
        }
        triggerDraw()
      }
    }

    const onPointerLeave = () => {
      isHovering.current = false
      // Pause instantly on leave
      if (isPlaying.current) {
        video.pause()
        isPlaying.current = false
      }
      triggerDraw() // Instantly clear the spotlight
    }

    const onPointerDown = (e: PointerEvent) => {
      // No longer required to click to play, but keep as fallback for touch devices
      if (e.pointerType === 'touch') return
    }

    const onTouchStart = (e: TouchEvent) => {
      if (!isHovering.current) {
        isHovering.current = true
        updatePointerCoords(e)
        currentPos.current = { ...targetPos.current }
        video.play().catch(console.error)
        isPlaying.current = true
        startVideoLoop()
      } else {
        if (isPlaying.current) {
          video.pause()
          isPlaying.current = false
          isHovering.current = false
        } else {
          updatePointerCoords(e)
          video.play().catch(console.error)
          isPlaying.current = true
          startVideoLoop()
        }
      }
      triggerDraw()
    }

    const onTouchMove = (e: TouchEvent) => {
      if (isHovering.current) {
        updatePointerCoords(e)
        if (!isPlaying.current) triggerDraw()
      }
    }

    container.addEventListener('pointerenter', onPointerEnter)
    container.addEventListener('pointermove', onPointerMove)
    container.addEventListener('pointerleave', onPointerLeave)
    container.addEventListener('pointerdown', onPointerDown)
    container.addEventListener('touchstart', onTouchStart, { passive: true })
    container.addEventListener('touchmove', onTouchMove, { passive: true })

    const resizeObserver = new ResizeObserver(() => handleResize())
    resizeObserver.observe(container)

    return () => {
      window.removeEventListener('resize', handleResize)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('error', handleError)
      container.removeEventListener('pointerenter', onPointerEnter)
      container.removeEventListener('pointermove', onPointerMove)
      container.removeEventListener('pointerleave', onPointerLeave)
      container.removeEventListener('pointerdown', onPointerDown)
      container.removeEventListener('touchstart', onTouchStart)
      container.removeEventListener('touchmove', onTouchMove)
      resizeObserver.disconnect()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (rvfcRef.current && 'cancelVideoFrameCallback' in video) {
        (video as any).cancelVideoFrameCallback(rvfcRef.current)
      }
    }
  }, [])

  const startVideoLoop = () => {
    const video = videoRef.current
    if (!video || !isPlaying.current) return
    
    // Sync rendering exactly with video frame updates to prevent frame tearing/ghosting
    if ('requestVideoFrameCallback' in video) {
      if (rvfcRef.current) (video as any).cancelVideoFrameCallback(rvfcRef.current)
      const updateFrame = () => {
        if (!isPlaying.current) return
        drawLoop(true) // force draw even if not animating coords
        rvfcRef.current = (video as any).requestVideoFrameCallback(updateFrame)
      }
      rvfcRef.current = (video as any).requestVideoFrameCallback(updateFrame)
    }
  }

  const drawLoop = (forceDraw = false) => {
    rafRef.current = undefined
    const canvas = canvasRef.current
    const video = videoRef.current
    
    if (!canvas || !video) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    // Calculate motion
    const reducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
    
    if (reducedMotion) {
      currentPos.current.x = targetPos.current.x
      currentPos.current.y = targetPos.current.y
      fadeAlpha.current = isHovering.current ? 1 : 0
    } else {
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.15
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.15
      if (isHovering.current) {
        fadeAlpha.current += (1 - fadeAlpha.current) * 0.08
      } else {
        fadeAlpha.current = 0 // Instant disappear
      }
    }

    // Always clear canvas so it's fully transparent when fadeAlpha is 0
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Only attempt to draw video if we have enough alpha and video is ready
    if (fadeAlpha.current > 0.01 && video.readyState >= 2 && video.videoWidth > 0) {
      // Math perfectly synchronized with CSS `object-fit: cover` and `object-position: center 65%`
      const vRatio = canvas.width / video.videoWidth
      const hRatio = canvas.height / video.videoHeight
      const ratio = Math.max(vRatio, hRatio) || 1
      
      const drawWidth = video.videoWidth * ratio
      const drawHeight = video.videoHeight * ratio
      const x = (canvas.width - drawWidth) * 0.5
      const y = (canvas.height - drawHeight) * 0.65

      ctx.save()
      
      // 1. Draw the spotlight gradient mask first
      const spotlightRadius = 350
      const gradient = ctx.createRadialGradient(
        currentPos.current.x, currentPos.current.y, 0,
        currentPos.current.x, currentPos.current.y, spotlightRadius
      )
      
      gradient.addColorStop(0, `rgba(0, 0, 0, ${fadeAlpha.current})`)
      gradient.addColorStop(0.3, `rgba(0, 0, 0, ${fadeAlpha.current * 0.7})`)
      gradient.addColorStop(0.6, `rgba(0, 0, 0, ${fadeAlpha.current * 0.2})`)
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
      
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // 2. Draw the full-color video using 'source-in' to mask it softly
      ctx.globalCompositeOperation = 'source-in'
      
      // Apply theme-appropriate filter to the spotlight video
      const isDarkTheme = document.documentElement.classList.contains('dark')
      ctx.filter = 'none' // Spotlight reveals true video in both modes

      try {
        ctx.drawImage(video, x, y, drawWidth, drawHeight)
      } catch (err) {
        console.error('[VideoHero] Canvas drawImage failed:', err)
      }
      
      ctx.filter = 'none'
      ctx.restore()
    }

    const needsAnimation = isPlaying.current || 
                           Math.abs(fadeAlpha.current - (isHovering.current ? 1 : 0)) > 0.01 ||
                           Math.abs(currentPos.current.x - targetPos.current.x) > 1 ||
                           Math.abs(currentPos.current.y - targetPos.current.y) > 1

    if (needsAnimation && !forceDraw && (!isPlaying.current || !('requestVideoFrameCallback' in video))) {
      rafRef.current = requestAnimationFrame(() => drawLoop())
    }
  }

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto bg-light-bg dark:bg-[#0d0d0f] transition-colors duration-300 border-b border-light-border dark:border-transparent"
      aria-hidden="true"
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* 1. Base Layer: Real HTML5 Video */}
      <video
        ref={videoRef}
        src="/Legend_of_the_Northern.mp4"
        className="absolute inset-0 w-full h-full object-cover object-[center_65%] transition-all duration-300 pointer-events-none select-none"
        style={isDark ? {
          filter: 'grayscale(100%) brightness(75%)',
          opacity: 0.9
        } : {
          filter: 'grayscale(35%) saturate(35%) brightness(72%) contrast(88%)',
          opacity: 0.72
        }}
        loop
        muted
        playsInline
        preload="auto"
        draggable={false}
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
      />
      
      {/* Light Mode Neutral Overlay */}
      {!isDark && (
        <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ background: 'rgba(246, 246, 244, 0.18)' }} />
      )}
      
      {/* 2. Spotlight Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full outline-none pointer-events-none transition-all duration-300"
      />

      {/* 3. Smooth fade at the bottom to blend seamlessly with the About section in Dark Mode */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-zinc-50 dark:from-[#0d0d0f] to-transparent pointer-events-none transition-colors duration-300 hidden dark:block" />
    </div>
  )
}
