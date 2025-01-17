import viteLogo from './vite.svg';
import typescriptLogo from './typescript.svg';

import { sheet } from './sheet';
import { setupCounter } from './counter';

class App extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.adoptedStyleSheets = [sheet];
    shadow.innerHTML = html`
      <div class="grid w-screen h-screen place-items-center">
        <div class="flex items-center flex-col gap-8">
          <div class="flex gap-8">
            <a href="https://vitejs.dev" target="_blank">
              <img
                src="${viteLogo}"
                class="h-16 hover:drop-shadow-2xl"
                alt="Vite logo"
              />
            </a>
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
              target="_blank"
            >
              <img
                src="${typescriptLogo}"
                class="h-16 hover:drop-shadow-2xl"
                alt="JavaScript logo"
              />
            </a>
          </div>
          <h1 class="text-lg font-bold">Hello Vite + Tailwind!</h1>
          <button
            id="counter"
            class="border border-slate-500 bg-slate-200 px-8 py-1 rounded hover:bg-slate-300"
          ></button>
          <p class="text-sm text-gray-500">
            Click on the Vite logo to learn more
          </p>
        </div>
      </div>
    `;

    setupCounter(shadow.querySelector<HTMLButtonElement>('#counter')!);
    this.addEventListener('click', this);
  }

  handleEvent(e: any) {
    console.log('e', e);
  }
}

customElements.define('app-component', App);
