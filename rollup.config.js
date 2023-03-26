import { defineConfig } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default defineConfig({
  input: './src/index.tsx',
  output: {
    dir: 'dist',
    entryFileNames: '[name].js',
    format: 'es',
  },
  plugins: [nodeResolve({ extensions: ['.ts', '.tsx', '.js'] })],
});
