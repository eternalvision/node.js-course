console.log('1: sync');
queueMicrotask(() => console.log('3: microtask'));
setTimeout(() => console.log('4: timer'), 0);
await Promise.resolve();
console.log('2: continuation after await');
