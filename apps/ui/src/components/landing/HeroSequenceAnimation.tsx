"use client"

import { useEffect, useRef, memo } from "react"

interface SequenceAnimationProps {
  className?: string
  folderPath?: string
  filePrefix?: string
  fileExtension?: string
  padLength?: number
  totalFrames?: number
  fps?: number
}

export const HeroSequenceAnimation = memo(function HeroSequenceAnimation({
  className,
  folderPath = "/hero-sequence",
  filePrefix = "low_res",
  fileExtension = ".png",
  padLength = 3,
  totalFrames = 391,
  fps = 40,
}: SequenceAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const frames: HTMLImageElement[] = []
    let currentFrame = 0
    let animationFrameId: number
    let isMounted = true

    // Preload all frames based on the provided props
    for (let i = 0; i < totalFrames; i++) {
      const img = new Image()
      const paddedIndex = String(i).padStart(padLength, "0")
      img.src = `${folderPath}/${filePrefix}${paddedIndex}${fileExtension}`
      frames.push(img)
    }

    const startTime = performance.now()

    const renderLoop = (time: number) => {
      if (!isMounted) return

      animationFrameId = requestAnimationFrame(renderLoop)

      // Calculate exactly which frame we SHOULD be on based on absolute elapsed time.
      const elapsedTime = time - startTime
      const targetFrame = Math.floor(elapsedTime / (1000 / fps)) % totalFrames

      // Only draw if the frame has actually advanced
      if (targetFrame !== currentFrame) {
        currentFrame = targetFrame
        const img = frames[currentFrame]

        // Check if the current frame is fully loaded
        if (img && img.complete && img.naturalWidth > 0) {
          if (canvas.width !== img.naturalWidth) {
            canvas.width = img.naturalWidth
            canvas.height = img.naturalHeight
          }

          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(img, 0, 0)
        }
      }
    }

    animationFrameId = requestAnimationFrame(renderLoop)

    return () => {
      isMounted = false
      cancelAnimationFrame(animationFrameId)
    }
  }, [folderPath, filePrefix, fileExtension, padLength, totalFrames, fps])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={
        className ||
        "pointer-events-none absolute inset-0 z-50 h-full w-full object-cover"
      }
      style={{
        pointerEvents: "none",
        background: "transparent",
      }}
    />
  )
})
