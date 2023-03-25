import { defineConfig } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import { visualizer } from 'rollup-plugin-visualizer';
import postcss from 'rollup-plugin-postcss';
import del from 'rollup-plugin-delete';

import path from 'path';
import babelconfig from './babelconfig.js';
import { generateScopedName } from './lib/devUtils.js';

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';
const isAnalyze = process.env.ANALYZE;

export default defineConfig({
  input: './src/main/index.tsx',
  output: {
    dir: 'dist',
    entryFileNames: 'js/[name].js',
    format: 'iife',
    sourcemap: !isProduction,
  },
  plugins: [
    del({ targets: ['dist/js', 'dist/css'] }),
    nodeResolve({ extensions: ['.ts', '.tsx', '.js'] }),
    replace({ 'process.env.NODE_ENV': JSON.stringify(nodeEnv), preventAssignment: true }),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
      extensions: ['.ts', '.tsx', '.js'],
      presets: babelconfig.client.presets,
    }),
    postcss({
      modules: { generateScopedName },
      extract: 'css/index.css',
      minimize: isProduction,
    }),
    isProduction ? terser() : null,
    isAnalyze ? visualizer({ emitFile: true }) : null,
  ],
});
