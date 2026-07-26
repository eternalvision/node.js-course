console.table({
  node: process.version,
  v8: process.versions.v8,
  platform: process.platform,
  architecture: process.arch,
});

const startedAt = performance.now();
setTimeout(() => {
  console.log(`Timer completed after ${Math.round(performance.now() - startedAt)} ms`);
}, 20);
console.log('Synchronous part is complete');
