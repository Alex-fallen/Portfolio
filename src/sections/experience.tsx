import { experience } from '@/content'
import { gsap, useGSAP } from '@/lib/motion'
import { useRef } from 'react'

const tabs = ['Role', ...experience.highlights.map(h => h.title)]

export function Experience() {
  const root = useRef<HTMLElement>(null)

  // Desktop: vertical scroll drives the track sideways; scroll speed widens the RGB split on titles
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
        const section = root.current!
        const track = section.querySelector<HTMLElement>('.xp-track')!
        const bar = section.querySelector<HTMLElement>('.xp-progress i')!
        const tabEls = [...section.querySelectorAll<HTMLElement>('.xp-tabs span')]
        const distance = () => track.scrollWidth - window.innerWidth
        // the track moves faster than the page scrolls, so the pin holds for fewer screens
        const runway = () => distance() * 0.6
        const split = gsap.quickTo(section, '--split', { duration: 0.35, ease: 'power2.out' })

        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: '.xp-pin',
            start: 'top top',
            end: () => `+=${runway()}`,
            scrub: 0.6,
            pin: true,
            invalidateOnRefresh: true,
            onUpdate: self => {
              split(1.2 + Math.min(Math.abs(self.getVelocity()) / 260, 7))
              gsap.set(bar, { scaleX: self.progress })
              // the intro panel counts as the role tab
              const active = Math.min(tabs.length - 1, Math.floor(self.progress * tabs.length * 0.999))
              tabEls.forEach((el, i) => el.toggleAttribute('data-active', i === active))
            },
            onLeave: () => split(1.2),
            onLeaveBack: () => split(1.2),
          },
        })
        gsap.to('.xp-ghost', {
          x: () => -distance() * 0.4,
          ease: 'none',
          scrollTrigger: { trigger: '.xp-pin', start: 'top top', end: () => `+=${runway()}`, scrub: true, invalidateOnRefresh: true },
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="experience" className="xp" aria-labelledby="xp-title">
      <div className="xp-pin">
        <div className="xp-ghost" aria-hidden="true">
          2026 · {experience.company} · {experience.role}
        </div>
        <div className="xp-track">
          <div className="xp-panel xp-panel--wide">
            <h2 id="xp-title" className="section-title rgb">
              Where I’ve
              <br />
              been
            </h2>
            <p>My professional journey so far: one role, two AI products, and a lot of documents.</p>
          </div>
          <article className="xp-panel">
            <p className="label">
              {experience.period} · {experience.company}
            </p>
            <h3 className="rgb">{experience.role}</h3>
            <p>{experience.summary}</p>
          </article>
          {experience.highlights.map(item => (
            <article key={item.title} className="xp-panel">
              <p className="label">At {experience.company}</p>
              <h3 className="rgb">{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <div className="xp-hud" aria-hidden="true">
          <div className="xp-tabs label">
            {tabs.map((tab, i) => (
              <span key={tab} data-active={i === 0 ? '' : undefined}>
                {tab}
              </span>
            ))}
          </div>
          <div className="xp-progress">
            <i />
          </div>
        </div>
      </div>
    </section>
  )
}
