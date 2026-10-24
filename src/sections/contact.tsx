import {links, person } from '@/content'
import { revealGroups, useGSAP } from '@/lib/motion'
import { useRef } from 'react'

export function Contact() {
  const root = useRef<HTMLElement>(null)
  useGSAP(() => revealGroups(root.current!), { scope: root })

  return (
    <footer ref={root} id="contact" className="contact" aria-labelledby="contact-title">
      <div className="contact-main" data-reveal-group>
        <h2 id="contact-title" className="contact-title" data-reveal>
          Let’s talk
        </h2>
        <p className="contact-sub" data-reveal>
          Building something that needs to read documents, answer questions, or simply ship? I’d like to hear about it.
        </p>
        <div className="contact-links" data-reveal>
          <a href={links.github} className="btn btn-ghost" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={links.linkedin} className="btn btn-ghost" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={links.email} className="btn btn-primary">
            {person.email} <span className="arrow">→</span>
          </a>
        </div>
      </div>
      <div className="contact-foot label">
        <span>© 2026 {person.name}</span>
      </div>
    </footer>
  )
}
