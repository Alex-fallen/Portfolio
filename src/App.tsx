import { ScrollTrigger } from '@/lib/motion'
import { About } from '@/sections/about'
import { Contact } from '@/sections/contact'
import { Experience } from '@/sections/experience'
import { Hero } from '@/sections/hero'
import { Nav } from '@/sections/nav'
import { Preloader } from '@/sections/preloader'
import { Stack } from '@/sections/stack'
import { Work } from '@/sections/work'
import { useLenis } from 'lenis/react'
import { useCallback, useEffect, useState } from 'react'

export default function App() {
  const [ready, setReady] = useState(false)
  const lenis = useLenis()
  const handleReady = useCallback(() => setReady(true), [])

  // Hold the page still while the preloader plays
  useEffect(() => {
    if (!lenis) return
    if (ready) lenis.start()
    else lenis.stop()
  }, [lenis, ready])

  // Pinned sections measure the page, so re-measure once fonts and images have settled
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])

  return (
    <>
      <Preloader onDone={handleReady} />
      <Nav />
      <main>
        <Hero ready={ready} />
        <About />
        <Experience />
        <Work />
        <Stack />
      </main>
      <Contact />
    </>
  )
}
