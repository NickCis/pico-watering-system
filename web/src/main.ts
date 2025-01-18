import './style.css';

import SproutIcon from './sprout.svg';

import { sheet } from './sheet';

import './content';

class Main extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.adoptedStyleSheets = [sheet];
    shadow.innerHTML = html`
      <div class="relative flex min-h-svh flex-col bg-background">
        <div class="border-grid flex flex-1 flex-col">
          <header
            class="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          >
            <div class="mx-auto w-full border-border">
              <div class="mx-auto px-4 max-w-screen-2xl flex h-14 items-center">
                <a class="mr-4 flex items-center gap-2 lg:mr-6" href="/">
                  <img src=${SproutIcon} class="h-6 w-6" />
                  <span class="font-bold">Watering system</span>
                </a>
              </div>
            </div>
          </header>
          <main class="flex flex-1 flex-col">
            <div class="mx-auto w-full border-border">
              <div class="mx-auto max-w-screen-2xl px-6 pt-6">
                <app-content></app-content>
              </div>
            </div>
          </main>
          <footer class="border-grid border-t py-6 md:px-8 md:py-0">
            <div class="mx-auto w-full border-border">
              <div class="mx-auto max-w-screen-2xl p-4">
                <div
                  class="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left"
                >
                  The source code is available on
                  <a
                    href="https://github.com/NickCis/pico-watering-system"
                    target="_blank"
                    rel="noreferrer"
                    class="font-medium underline underline-offset-4"
                    >GitHub</a
                  >
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    `;

    // setupCounter(shadow.querySelector<HTMLButtonElement>('#counter')!);
    // this.addEventListener('click', this);
  }

  handleEvent(e: any) {
    console.log('e', e);
  }
}

customElements.define('app-main', Main);
