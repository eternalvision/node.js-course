import { parseArgs } from 'node:util';

const { values } = parseArgs({
  options: {
    name: { type: 'string', short: 'n', default: 'student' },
    json: { type: 'boolean', default: false },
  },
});
const message = { message: `Привет, ${values.name}!` };
console.log(values.json ? JSON.stringify(message) : message.message);
