const port = Number(process.env.PORT ?? 3000);
if (!Number.isInteger(port) || port < 1) throw new Error('PORT must be a positive integer');
export const config = Object.freeze({ port, appName: process.env.APP_NAME ?? 'Tasks' });
