import { Component } from '@/lib/component';

import './wifi';

class Content extends Component {
  render() {
    this.shadowRoot.innerHTML = html`<app-wifi></app-wifi>`;
  }
}

customElements.define('app-content', Content);
