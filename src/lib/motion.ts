import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Staggers the [data-reveal] children of every [data-reveal-group] in scope as the group scrolls in
export function revealGroups(scope: Element) {
  if (prefersReducedMotion()) return
  scope.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach(group => {
    gsap.from(group.querySelectorAll('[data-reveal]'), {
      y: 28,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: { trigger: group, start: 'top 95%', once: true },
    })
  })
}

// A hand-drawn looking closed loop: a circle whose radius wobbles at two frequencies
export function wobblyRingPath(radius: number, steps = 160) {
  const points: string[] = []
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2 - Math.PI / 2
    const r = radius * (1 + 0.075 * Math.sin(t * 7 + 0.4) + 0.03 * Math.sin(t * 13 + 2.1))
    points.push(`${(Math.cos(t) * r).toFixed(2)} ${(Math.sin(t) * r).toFixed(2)}`)
  }
  return `M${points.join(' L')}`
}

export { gsap, ScrollTrigger, useGSAP }
