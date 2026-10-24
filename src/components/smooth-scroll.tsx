import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ReactLenis, useLenis, type LenisRef } from 'lenis/react'
import 'lenis/dist/lenis.css'
import { useEffect, useRef, type ReactNode } from 'react'

gsap.registerPlugin(ScrollTrigger)

// Keeps ScrollTrigger positions in step with Lenis' smoothed scroll
function ScrollTriggerSync() {
  useLenis(ScrollTrigger.update)
  return null
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null)

  // Drive Lenis from GSAP's ticker so both animate on the same frame
  useEffect(() => {
    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(update)
      gsap.ticker.lagSmoothing(500, 33)
    }
  }, [])

  return (
    <ReactLenis root ref={lenisRef} options={{ autoRaf: false, anchors: true }}>
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  )
}
