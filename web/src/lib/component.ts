import { sheet } from '@/sheet';

export class Component extends HTMLElement {
  shadowRoot: ShadowRoot;
  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = [sheet];
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {}
}
