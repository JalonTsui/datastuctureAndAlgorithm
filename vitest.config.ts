import { defineConfig } from 'vitest/config';
import { resolve } from 'node:path';

export default defineConfig({
  test: {
    globals: true,
    alias: {
      '@': resolve(__dirname, './src'), // 路径配置一定要使用resolve方法
    },
  },
});
