declare module 'bootstrap' {
  export class Modal {
    constructor(element: HTMLElement, options?: { backdrop?: boolean | 'static'; keyboard?: boolean })
    show(): void
    hide(): void
    dispose(): void
  }

  export class Dropdown {
    static getOrCreateInstance(element: HTMLElement, config?: unknown): Dropdown
    toggle(): void
    show(): void
    hide(): void
    dispose(): void
  }
}
