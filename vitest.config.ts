import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['./tests/**/**.test.**'],
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
  },
});
