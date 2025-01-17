// Inspired from: https://github.com/gatsbylabs/vite-plugin-minify-template-literals/blob/main/src/index.ts

import MagicString from 'magic-string';
import * as pl from 'parse-literals';
import { minifyHTMLLiterals } from 'minify-html-literals';

const fileRegex = /\.[jt]sx?$/i;

export function minifyHtmlTemplateLiteralsPlugin() {
  let command = 'build';
  return {
    name: 'vite-plugin-minify-html-literals',
    enforce: 'pre',
    configResolved(config) {
      command = config.command;
    },
    transform(code, id, ...args) {
      if (fileRegex.test(id)) {
        if (command === 'build') {
          const result = minifyHTMLLiterals(code);
          if (result?.code) code = result.code;
        }

        const templates = pl.parseLiterals(code);
        if (templates.length > 0) {
          const ms = new MagicString(code);
          for (const template of templates) {
            if (template.tag === 'html') {
              // Remove html template tag
              const start = template.parts[0].start;
              ms.overwrite(start - template.tag.length - 1, start - 1, '');
            }
          }
          return ms.toString();
        }
      }
    },
  };
}
