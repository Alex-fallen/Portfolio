import { links, nav, person } from '@/content'
import { ScrollTrigger, useGSAP } from '@/lib/motion'
import { useRef } from 'react'

export function Nav() {
  const root = useRef<HTMLElement>(null)

  // Slides away while reading downwards, returns as soon as the visitor scrolls back up
  useGSAP(() => {
    const bar = root.current!
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: self => bar.toggleAttribute('data-hidden', self.direction === 1 && self.scroll() > 120),
    })
  })

  return (
    <header ref={root} className="nav">
      <a href="#top" className="nav-mark">
        {person.name}
      </a>
      <nav aria-label="Sections">
        <ul className="nav-links">
          {nav.map(item => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
      <a href={links.email} className="nav-cta">
        Email me
      </a>
    </header>
  )
}
