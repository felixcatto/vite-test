import fastifyStatic from '@fastify/static';
import fastify from 'fastify';
import fs from 'fs';
import path from 'path';
import { dirname, modes } from '../lib/utils.js';
import { vitePlugin } from '../lib/utils.js';

const getApp = () => {
  const app = fastify({
    disableRequestLogging: true,
    logger: {
      level: 'debug',
      transport: {
        target: 'pino-pretty',
        options: { translateTime: 'HH:MM:ss', ignore: 'reqId,pid,hostname' },
      },
    },
  });

  const mode = process.env.NODE_ENV;
  const isProd = mode === modes.production;
  const __dirname = dirname(import.meta.url);
  const pathPublic = path.resolve(__dirname, '../dist');
  const template = isProd
    ? fs.readFileSync(path.resolve(pathPublic, 'index.html'), 'utf8')
    : fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8');

  app.decorate('mode', mode);
  app.decorate('template', template);
  app.decorate('pathPublic', pathPublic);
  app.decorate('vite', null);

  if (isProd) {
    app.register(fastifyStatic, { root: pathPublic, wildcard: false });
  } else {
    app.register(vitePlugin);
  }

  app.get('/*', async (req, reply) => {
    const { vite, template: rawTemplate } = app;
    const { url } = req;
    let template = rawTemplate;
    let appHtml;

    if (isProd) {
      const { render } = await import('../dist/server/entry-server.js');
      appHtml = await render(url);
    } else {
      template = await vite.transformIndexHtml(url, template);
      const { render } = await vite.ssrLoadModule('/src/main/entry-server.jsx');
      try {
        appHtml = await render(url);
      } catch (e) {
        vite.ssrFixStacktrace(e);
        console.log(e.stack);
        return reply.code(500).send(e.stack);
      }
    }

    const initialState = {};
    const html = template
      .replace('<!--app-html-->', appHtml)
      .replace('{{initialState}}', JSON.stringify(initialState));

    reply.type('html').send(html);
  });

  return app;
};

const host = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';
const port = Number(process.env.PORT || 3000);
const app = getApp();

app.listen({ port, host }, err => {
  if (err) {
    console.log(err);
  }
});
