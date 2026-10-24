import { stack } from '@/content'
import { revealGroups, useGSAP } from '@/lib/motion'
import { Accordion as AccordionPrimitive } from 'radix-ui'
import { useRef } from 'react'

export function Stack() {
  const root = useRef<HTMLElement>(null)
  useGSAP(() => revealGroups(root.current!), { scope: root })

  return (
    <section ref={root} id="stack" className="stack shell" aria-labelledby="stack-title">
      <div className="stack-head" data-reveal-group>
        <h2 id="stack-title" className="section-title" data-reveal>
          The stack I
          <br />
          build with
        </h2>
        <p data-reveal>From the interface to the vector store. Open a group to see the tools I use in it.</p>
      </div>

      <AccordionPrimitive.Root type="single" defaultValue={stack[0].id} collapsible data-reveal-group>
        {stack.map(group => (
          <AccordionPrimitive.Item key={group.id} value={group.id} className="stack-item" data-reveal>
            <AccordionPrimitive.Header asChild>
              <h3>
                <AccordionPrimitive.Trigger className="stack-trigger">
                  {group.title}
                  <span className="label">{group.tools.length} tools</span>
                </AccordionPrimitive.Trigger>
              </h3>
            </AccordionPrimitive.Header>
            <AccordionPrimitive.Content className="overflow-hidden data-open:animate-accordion-down data-closed:animate-accordion-up">
              <div className="stack-panel">
                <ul className="stack-tools">
                  {group.tools.map(tool => (
                    <li key={tool} className="chip">
                      {tool}
                    </li>
                  ))}
                </ul>
                {group.also && <p className="stack-also">{group.also}</p>}
              </div>
            </AccordionPrimitive.Content>
          </AccordionPrimitive.Item>
        ))}
      </AccordionPrimitive.Root>
    </section>
  )
}
