import { rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function excludeLocalVideosFromProduction() {
  return {
    name: 'exclude-local-videos-from-production',
    apply: 'build',
    closeBundle() {
      rmSync(resolve(process.cwd(), 'dist/videos'), { recursive: true, force: true });
    },
  };
}

export default defineConfig({
  plugins: [react(), excludeLocalVideosFromProduction()],
});
