export type GlassShape = 'rounded' | 'circle' | 'pill'

export interface ContainerOptions {
  borderRadius?: number
  type?: GlassShape
  tintOpacity?: number
}

export declare class Container {
  constructor(options?: ContainerOptions)
  element: HTMLDivElement
  addChild<T extends Container>(child: T): T
  removeChild(child: Container): void
  updateSizeFromDOM(): void
  destroy(): void
}

export interface ButtonOptions {
  text?: string
  size?: number
  type?: GlassShape
  warp?: boolean
  tintOpacity?: number
  onClick?: (text: string) => void
}

export declare class Button extends Container {
  constructor(options?: ButtonOptions)
}
