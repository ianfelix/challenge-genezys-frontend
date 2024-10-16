import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    alias: {
      '@': '/src',
    },
    setupFiles: ['./src/screens/tests/setup.ts'],
  },
});
