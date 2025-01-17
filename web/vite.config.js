import { defineConfig } from 'vite';

// https://github.com/richardtallent/vite-plugin-singlefile
import { viteSingleFile } from 'vite-plugin-singlefile';

// https://github.com/vbenjs/vite-plugin-html
import { createHtmlPlugin } from 'vite-plugin-html';

import { minifyHtmlTemplateLiteralsPlugin } from './minify-html-template-literals';

export default defineConfig({
  build: {
    target: 'esnext',
  },
  plugins: [
    minifyHtmlTemplateLiteralsPlugin(),
    viteSingleFile({ removeViteModuleLoader: true }),
    createHtmlPlugin({ minify: true }),
  ],
});
