import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config'

export default defineConfig({
  // disbling errors for packages/subgraph/tsconfig.json that extends webassembly tsconfig
  plugins: [tsconfigPaths({ ignoreConfigErrors: true })],
});
