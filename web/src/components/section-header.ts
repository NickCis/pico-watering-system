import { Component } from '@/lib/component';
import '@/components/ui/separator';

class SectionHeader extends Component {
  static observedAttributes = ['icon', 'title', 'text'];

  render() {
    const icon = this.getAttribute('icon');
    const title = this.getAttribute('title');
    const text = this.getAttribute('text');

    this.shadowRoot.innerHTML = html`
      <div>
        <div class="space-y-4">
          <div>
            <div class="flex items-center gap-2">
              <img src=${icon} class="h-4 w-4" />
              <h3 class="text-lg font-medium">${title}</h3>
            </div>
            <p class="text-sm text-muted-foreground">${text}</p>
          </div>
          <div is="ui-separator" orientation="horizontal"></div>
        </div>
      </div>
    `;
  }
}

customElements.define('section-header', SectionHeader);
