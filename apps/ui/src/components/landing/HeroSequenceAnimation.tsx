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

// Global cache to avoid duplicate image allocation and memory thrashing across routes
const frameCache = new Map<string, HTMLImageElement[]>()

function getFrames(
  folderPath: string,
  filePrefix: string,
  fileExtension: string,
  padLength: number,
  totalFrames: number
): HTMLImageElement[] {
  const cacheKey = `${folderPath}/${filePrefix}_${padLength}_${totalFrames}_${fileExtension}`
  let frames = frameCache.get(cacheKey)
  if (!frames) {
    frames = []
    for (let i = 0; i < totalFrames; i++) {
      const img = new Image()
      const paddedIndex = String(i).padStart(padLength, "0")
      img.src = `${folderPath}/${filePrefix}${paddedIndex}${fileExtension}`
      frames.push(img)
    }
    frameCache.set(cacheKey, frames)
  }

  return frames
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

    const frames = getFrames(
      folderPath,
      filePrefix,
      fileExtension,
      padLength,
      totalFrames
    )
    let currentFrame = -1
    let animationFrameId: number
    let isMounted = true

    const firstImg = frames[0]
    const renderFirstFrame = () => {
      if (isMounted && currentFrame <= 0 && canvasRef.current) {
        const c = canvasRef.current
        const cCtx = c.getContext("2d")
        if (cCtx && firstImg && firstImg.naturalWidth > 0) {
          c.width = firstImg.naturalWidth
          c.height = firstImg.naturalHeight
          cCtx.clearRect(0, 0, c.width, c.height)
          cCtx.drawImage(firstImg, 0, 0)
          currentFrame = 0
        }
      }
    }

    if (firstImg) {
      if (firstImg.complete && firstImg.naturalWidth > 0) {
        renderFirstFrame()
      } else {
        firstImg.addEventListener("load", renderFirstFrame, { once: true })
      }
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
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      if (firstImg) {
        firstImg.removeEventListener("load", renderFirstFrame)
      }
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
