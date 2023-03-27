import middie from '@fastify/middie';
import fp from 'fastify-plugin';
import * as color from 'kolorist';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';

export const makeEnum = (...args) => args.reduce((acc, key) => ({ ...acc, [key]: key }), {});
export const modes = makeEnum('test', 'development', 'production');

export const dirname = url => fileURLToPath(path.dirname(url));

export const supressConsoleLog = fn => {
  const consoleLog = console.log;
  console.log = () => {};
  const result = fn();
  console.log = consoleLog;
  return result;
};

export const loggerPlugin = fp(async app => {
  const supportsArt = color.options.supportLevel === 2;
  const icons = { req: supportsArt ? '←' : '<', res: supportsArt ? '→' : '>' };
  const logResponseTime = true;

  app.addHook('onRequest', async request => {
    request.log.info(
      `${color.bold(color.blue(icons.req))}${color.blue(request.method)}:${color.green(
        request.url
      )} ${color.white('from ip')} ${color.blue(request.ip)}`
    );
  });

  app.addHook('onResponse', async (request, reply) => {
    request.log.info(
      `${color.bold(color.magenta(icons.res))}${color.magenta(request.method)}:${color.green(
        request.url
      )} ${color.white('status')} ${color.magenta(reply.statusCode)}${
        logResponseTime
          ? `${color.white(', took')} ${color.magenta(
              Math.round(reply.getResponseTime())
            )}${color.magenta('ms')}`
          : ''
      }`
    );
  });
});

export const vitePlugin = fp(async app => {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });
  await app.register(middie, { hook: 'onRequest' });
  app.use(vite.middlewares);
  app.vite = vite;
});
