// Genera src/styles/tokens.css a partir de design/tokens.json.
// Uso: npm run tokens
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const tokens = JSON.parse(fs.readFileSync(path.join(root, 'design', 'tokens.json'), 'utf8'));
const theme = tokens.color.themes[0].id;

const colorValue = (v) => (v.startsWith('{') ? `var(--${v.slice(1, -1)})` : v);
const lines = (list, fn) => list.map(fn).join('\n');

let css = '/* Generado desde design/tokens.json con `npm run tokens`. No lo edites a mano. */\n\n';

css += `:root,\n[data-theme='${theme}'] {\n`;
css += lines(tokens.color.tokens, (t) => `  --${t.name}: ${colorValue(t.value)};`) + '\n';
css += lines(tokens.shadow.tokens, (t) => `  --${t.name}: ${t.value};`) + '\n}\n\n';

css += ':root {\n';
for (const key of ['spacing', 'radius', 'zIndex']) {
  css += lines(tokens[key].tokens, (t) => `  --${t.name}: ${t.value};`) + '\n';
}
css += lines(Object.entries(tokens.type.families), ([k, v]) => `  --font-${k}: ${v};`) + '\n}\n\n';

for (const group of tokens.type.groups) {
  for (const s of group.styles) {
    css += `.${s.name} {\n  font-family: var(--font-${group.family});\n  font-size: ${s.fontSize};\n  line-height: ${s.lineHeight};\n  font-weight: ${s.fontWeight};\n}\n`;
  }
}

const out = path.join(root, 'src', 'styles', 'tokens.css');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, css);
console.log('Escribí', path.relative(root, out));
