import { Component } from '@/lib/component';
import WifiIcon from './wifi.svg';

import '@/components/section-header';

class Wifi extends Component {
  constructor() {
    super();
    this.shadowRoot.addEventListener('change', this);
  }

  render() {
    this.shadowRoot.innerHTML = html`
      <div>
        <section-header
          icon=${WifiIcon}
          title="Wifi"
          text="Wireless network configuration"
        ></section-header>
        <div class="mt-4 space-y-2">
          <div
            class="space-y-2 flex flex-row items-center justify-between rounded-lg border p-4"
          >
            <div class="space-y-0.5">
              <label
                class="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-base"
                >Access Point</label
              >
              <p class="text-[0.8rem] text-muted-foreground">
                Enable Access Point network for remote configuration
              </p>
            </div>
            <input type="checkbox" class="h-5 w-5" name="wifi-ap-enabled" />
          </div>
        </div>
        <input class="h-5 w-5" type="text" />
      </div>
    `;
  }

  handleEvent(e: any) {
    console.log('e', e.type, e.target.name, e.target.checked);
  }
}

customElements.define('app-wifi', Wifi);
