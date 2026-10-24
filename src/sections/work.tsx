import CircularGallery from '@/components/CircularGallery'
import { projects } from '@/content'
import { gsap, revealGroups, useGSAP } from '@/lib/motion'
import { useRef } from 'react'

const ribbon = projects.flatMap(project =>
  project.shots.map(shot => ({ image: shot.src, text: project.name, description: shot.caption, alt: shot.alt })),
)

export function Work() {
  const root = useRef<HTMLElement>(null)

  // Screenshots tip back on their top edge and settle flat as they reach the middle of the screen
  useGSAP(
    () => {
      revealGroups(root.current!)
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray<HTMLElement>('.case-shot').forEach(shot => {
          gsap.fromTo(
            shot,
            { rotateX: 24, y: 80, scale: 0.9, opacity: 0.35 },
            {
              rotateX: 0,
              y: 0,
              scale: 1,
              opacity: 1,
              ease: 'none',
              scrollTrigger: { trigger: shot, start: 'top bottom', end: 'center 60%', scrub: 0.6 },
            },
          )
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="work" className="work" aria-labelledby="work-title">
      <div className="work-head shell" data-reveal-group>
        <h2 id="work-title" className="section-title" data-reveal>
          Selected work
        </h2>
        <p data-reveal>
          Two AI products I build at NLL Academy. Drag the ribbon, or click a screen to open it full size.
        </p>
      </div>

      <div className="work-gallery">
        <CircularGallery
          items={ribbon}
          bend={2.2}
          textColor="#ededf3"
          font='600 34px "Geist Variable"'
          borderRadius={0.035}
          itemAspect={1.9}
          itemSize={0.86}
          gap={0.14}
          wave={0.6}
          shadow={0.45}
          fadeEdges={0.08}
          autoScroll={0.3}
          captureWheel={false}
        />
      </div>

      {projects.map(project => (
        <article key={project.id} className="case shell" aria-labelledby={`${project.id}-name`}>
          <div className="case-info" data-reveal-group>
            <h3 id={`${project.id}-name`} className="case-name" data-reveal>
              {project.name}
            </h3>
            <p className="case-tagline" data-reveal>
              {project.tagline}
            </p>
            <p className="case-desc" data-reveal>
              {project.description}
            </p>
            <ul className="case-tech" data-reveal aria-label="Built with">
              {project.tech.map(tool => (
                <li key={tool} className="chip">
                  {tool}
                </li>
              ))}
            </ul>
            <p className="case-link label" data-reveal>
              {project.link}
            </p>
          </div>
          <div className="case-shots">
            {project.shots.map(shot => (
              <figure key={shot.src} className="case-shot">
                <img src={shot.src} alt={shot.alt} width={1919} height={996} decoding="async" />
                <figcaption className="label">{shot.caption}</figcaption>
              </figure>
            ))}
          </div>
        </article>
      ))}
    </section>
  )
}
