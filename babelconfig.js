export default {
  client: {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          targets: { browsers: ['last 2 Chrome versions'] },
        },
      ],
      ['@babel/preset-react', { runtime: 'automatic' }],
      '@babel/preset-typescript',
    ],
  },
  server: {
    presets: ['@babel/preset-typescript'],
  },
};
