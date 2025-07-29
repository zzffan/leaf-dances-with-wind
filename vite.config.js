import path from 'path';
import fs from 'fs-extra';
import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';

export default defineConfig({
  plugins: [uni()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/uni_modules/uview-plus/theme.scss";`
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})