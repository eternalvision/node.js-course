import { readFile } from 'node:fs/promises';
console.log(await readFile(new URL('../README.md', import.meta.url), 'utf8'));
// Сравните:
// node --permission permission-demo.mjs
// node --permission --allow-fs-read=.. permission-demo.mjs
