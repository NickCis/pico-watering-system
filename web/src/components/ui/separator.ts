import { cn } from '@/lib/utils';

class UiSeparator extends HTMLDivElement {
  static observedAttributes = ['orientation'];

  constructor() {
    super();
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    this.className = cn(
      'shrink-0 bg-border',
      this.getAttribute('orientation') === 'horizontal'
        ? 'h-[1px] w-full'
        : 'h-full w-[1px]',
      this.getAttribute('className') || undefined,
    );
  }
}

customElements.define('ui-separator', UiSeparator, { extends: 'div' });

export { UiSeparator };
