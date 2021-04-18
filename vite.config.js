/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';
import { minifyHtml, injectHtml } from 'vite-plugin-html';
import path from 'path';

export default defineConfig({
  plugins: [
    createVuePlugin(),
    minifyHtml(),
    injectHtml({
      injectData: {
        title: '人臉辨識',
      },
    }),
  ],
  server: {
    port: 9000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
