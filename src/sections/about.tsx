import { about, links } from '@/content'
import { gsap, useGSAP } from '@/lib/motion'
import { useRef } from 'react'

export function About() {
  const root = useRef<HTMLElement>(null)

  // Desktop: the stage pins, "About / Me" part, and the small card opens over the painting.
  // Phones and reduced motion get the finished layout without the pin.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        gsap
          .timeline({
            scrollTrigger: { trigger: '.about-stage', start: 'top top', end: '+=140%', scrub: 0.7, pin: true },
          })
          .fromTo(
            '.about-card',
            { clipPath: 'inset(31% 41% 31% 41% round 16px)' },
            { clipPath: 'inset(5% 3% 5% 3% round 20px)', duration: 1, ease: 'power2.inOut' },
            0,
          )
          .fromTo('.about-art', { scale: 1.14 }, { scale: 1, duration: 1, ease: 'none' }, 0)
          .to('.about-word-a', { x: '-30vw', duration: 0.75, ease: 'power2.inOut' }, 0.05)
          .to('.about-word-b', { x: '30vw', duration: 0.75, ease: 'power2.inOut' }, 0.05)
          .to('.about-words', { autoAlpha: 0, duration: 0.15 }, 0.5)
          .from('.about-beam', { opacity: 0, duration: 0.4 }, 0.35)
          .from('.about-content > *', { y: 32, opacity: 0, duration: 0.25, stagger: 0.05 }, 0.72)
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="about" aria-labelledby="about-title">
      <div className="about-stage">
        <div className="about-art" role="img" aria-label="The Starry Night by Vincent van Gogh, toned black and white" />
        <div className="about-card">
          <div className="about-beam" />
          <div className="about-content">
            <p className="about-headline">{about.headline}</p>
            <div className="about-body">
              {about.body.map(paragraph => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <dl className="about-facts">
              {about.facts.map(fact => (
                <div key={fact.label}>
                  <dt className="label">{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
            <div className="about-actions">
              <a href="#work" className="btn btn-primary">
                View projects <span className="arrow">→</span>
              </a>
              <a href={links.github} className="btn btn-ghost" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
          </div>
        </div>
        <h2 id="about-title" className="about-words">
          <span className="about-word-a">About</span>
          <span className="about-word-b">Me</span>
        </h2>
      </div>
    </section>
  )
}
