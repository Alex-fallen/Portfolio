import { gsap, prefersReducedMotion, useGSAP, wobblyRingPath } from '@/lib/motion'
import { person } from '@/content'
import { useRef } from 'react'

const ring = wobblyRingPath(100)
const SEEN_KEY = 'pj-intro-seen'

// Storage can throw in private windows; a failed read just means the intro plays
function introSeen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1'
  } catch {
    return false
  }
}

function markIntroSeen() {
  try {
    sessionStorage.setItem(SEEN_KEY, '1')
  } catch {
    // nothing to remember
  }
}

export function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null)

  // Plays once per visit; later page loads in the same tab go straight to the hero
  useGSAP(
    () => {
      if (prefersReducedMotion() || introSeen()) {
        gsap.set(root.current, { display: 'none' })
        onDone()
        return
      }
      const path = root.current!.querySelector('path')!
      const length = path.getTotalLength()
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })

      gsap
        .timeline({
          onComplete: () => {
            markIntroSeen()
            onDone()
          },
        })
        .from('.preloader-mark', { opacity: 0, filter: 'blur(10px)', duration: 0.5, ease: 'power2.out' })
        .to(path, { strokeDashoffset: 0, duration: 1.05, ease: 'power2.inOut' }, 0.15)
        .to('.preloader-inner', { scale: 1.5, opacity: 0, filter: 'blur(14px)', duration: 0.55, ease: 'power2.in' }, '+=0.05')
        .to(root.current, { autoAlpha: 0, duration: 0.4 }, '-=0.3')
    },
    { scope: root },
  )

  return (
    <div ref={root} className="preloader" aria-hidden="true">
      <div className="preloader-inner">
        <svg className="preloader-ring" viewBox="-120 -120 240 240">
          <path d={ring} />
        </svg>
        <span className="preloader-mark">
          {person.initials}
          <span className="dot">.</span>
        </span>
      </div>
    </div>
  )
}
