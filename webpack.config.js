import path from 'path';
import webpack from 'webpack';
import babelConfig from './babelconfig.js';
import { fileURLToPath } from 'url';

const dirname = url => fileURLToPath(path.dirname(url));
const __dirname = dirname(import.meta.url);

const config = {
  mode: 'production',
  entry: {
    index: path.resolve(__dirname, 'src/index.tsx'),
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    extensionAlias: { '.js': ['.ts', '.tsx', '.js'] },
  },
  module: {
    rules: [
      {
        test: /(\.js$|\.ts$|\.tsx)/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelConfig,
        },
      },
    ],
  },
  stats: { warnings: false, children: false, modules: false },
};

export default config;
