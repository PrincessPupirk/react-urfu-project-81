import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['**/__tests__/**/*.test.ts'],
    reporters: process.env.CI
      ? ['default', 'vitest-sonar-reporter']
      : ['default'],
    outputFile: {
      'vitest-sonar-reporter': 'test-report.xml',
    },
    coverage: {
      provider: 'v8',
      reportsDirectory: 'coverage',
      reporter: ['json', 'lcov', 'text', 'clover'],
      include: ['src/**/*.ts'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
});
