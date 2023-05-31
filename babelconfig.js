export default {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        targets: { browsers: ['last 2 Chrome versions'] },
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
};
