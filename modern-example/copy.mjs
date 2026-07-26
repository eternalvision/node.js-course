import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { createGzip } from 'node:zlib';

const [source = 'README.md', target = 'README.md.gz'] = process.argv.slice(2);
await pipeline(createReadStream(source), createGzip(), createWriteStream(target));
console.log(`Created ${target}`);
