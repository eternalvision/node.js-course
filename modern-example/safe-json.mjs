import { readFile } from 'node:fs/promises';

export async function readJson(url) {
  const source = await readFile(url, 'utf8');
  return JSON.parse(source);
}

console.log(await readJson(new URL('./package.json', import.meta.url)));
