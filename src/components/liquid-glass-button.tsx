import { Button, type ButtonOptions } from '@/vendor/liquid-glass/liquid-glass'
import '@/vendor/liquid-glass/glass.css'
import { useEffect, useRef } from 'react'

type LiquidGlassButtonProps = Omit<ButtonOptions, 'onClick'> & {
  onClick?: () => void
  className?: string
}

export function LiquidGlassButton({ text, size, type, warp, tintOpacity, onClick, className }: LiquidGlassButtonProps) {
  const hostRef = useRef<HTMLSpanElement>(null)
  const onClickRef = useRef(onClick)

  useEffect(() => {
    onClickRef.current = onClick
  })

  // The library builds its own DOM and WebGL canvas, so recreate it when the look changes
  useEffect(() => {
    const button = new Button({ text, size, type, warp, tintOpacity, onClick: () => onClickRef.current?.() })
    hostRef.current?.append(button.element)
    return () => button.destroy()
  }, [text, size, type, warp, tintOpacity])

  return <span ref={hostRef} className={className} />
}
