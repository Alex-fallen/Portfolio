import { links, person } from '@/content'
import { gsap, prefersReducedMotion, useGSAP } from '@/lib/motion'
import { useRef } from 'react'

const lines = person.name.split(' ')

export function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null)

  // Hidden until the preloader hands over, then the name rises out of its line masks
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.set('.char', { yPercent: 110 })
      gsap.set('[data-hero-fade]', { y: 24, opacity: 0 })
    },
    { scope: root },
  )

  useGSAP(
    () => {
      if (!ready || prefersReducedMotion()) return
      gsap
        .timeline({ delay: 0.05 })
        .to('.char', { yPercent: 0, duration: 1.1, ease: 'power4.out', stagger: 0.035 })
        .to('[data-hero-fade]', { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.08 }, 0.45)
    },
    { scope: root, dependencies: [ready] },
  )

  // Letters lift toward the cursor; mouse only, so touch never gets stuck states
  const { contextSafe } = useGSAP({ scope: root })
  const lift = contextSafe((event: React.PointerEvent<HTMLSpanElement>, on: boolean) => {
    if (event.pointerType !== 'mouse' || prefersReducedMotion()) return
    const char = event.currentTarget
    char.dataset.color ??= getComputedStyle(char).color
    gsap.to(char, {
      yPercent: on ? -9 : 0,
      color: on ? '#8f8eff' : char.dataset.color,
      duration: on ? 0.25 : 0.6,
      ease: on ? 'power2.out' : 'elastic.out(1, 0.45)',
      overwrite: 'auto',
    })
  })

  return (
    <section ref={root} id="top" className="hero">
      <h1 className="hero-title" aria-label={person.name}>
        {lines.map(line => (
          <span key={line} className="hero-line" aria-hidden="true">
            {[...line].map((char, i) => (
              <span
                key={i}
                className="char"
                onPointerEnter={e => lift(e, true)}
                onPointerLeave={e => lift(e, false)}
              >
                {char}
              </span>
            ))}
          </span>
        ))}
      </h1>

      <div className="hero-foot">
        <div className="hero-copy">
          <p className="hero-role" data-hero-fade>
            {person.role}
          </p>
          <p className="hero-intro" data-hero-fade>
            {person.intro}
          </p>
          <div className="hero-actions" data-hero-fade>
            <a href="#work" className="btn btn-primary">
              See my work <span className="arrow">→</span>
            </a>
            <a href={links.email} className="btn btn-ghost">
              Get in touch
            </a>
          </div>
        </div>
        <dl className="hero-meta" data-hero-fade>
          <div>
            <dt className="label">Currently</dt>
            <dd>{person.current}</dd>
          </div>
          <div>
            <dt className="label">Focus</dt>
            <dd>React · FastAPI · RAG</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
