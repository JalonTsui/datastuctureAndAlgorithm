import { mergeConfig, defineConfig } from 'vitest/config';

export default mergeConfig({}, defineConfig({
  test: {
    globals: true,
  },
}));
