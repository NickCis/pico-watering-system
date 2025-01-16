import './style.css'
import viteLogo from './vite.svg'
import typescriptLogo from './typescript.svg'
import { setupCounter } from './counter.ts'

/*
// Get existing sheet
const sheet = document.getElementsByTagName('style')[0].sheet
// Create an element in the document and then create a shadow root:
const node = document.createElement("div");
const shadow = node.attachShadow({ mode: "open" });
// Adopt the sheet into the shadow DOM
shadow.adoptedStyleSheets = [sheet];
*/

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
 <div class="flex items-center flex-col gap-8">
    <div class="flex gap-8">
      <a href="https://vitejs.dev" target="_blank">
        <img src="${viteLogo}" class="h-16 hover:drop-shadow-2xl" alt="Vite logo" />
      </a>
      <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
        <img src="${typescriptLogo}" class="h-16 hover:drop-shadow-2xl" alt="JavaScript logo" />
      </a>
    </div>
    <h1 class="text-lg font-bold">Hello Vite + Tailwind!</h1>
    <button id="counter" class="border border-slate-500 bg-slate-200 px-8 py-1 rounded hover:bg-slate-300"></button>
    <p class="text-sm text-gray-500">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
