import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { writeFileSync, mkdirSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'generate-prefixed-css',
      buildStart() {
        const outPath = resolve(__dirname, 'style.css');
        try {
          const vars = readFileSync(resolve(__dirname, 'src/styles/variables.css'), 'utf8');
          mkdirSync(resolve(__dirname), { recursive: true });
          writeFileSync(outPath, `${vars}\n`);
        } catch {
          mkdirSync(resolve(__dirname), { recursive: true });
          writeFileSync(outPath, `/* style placeholder */\n`);
        }
      }
    }
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    }, 
  }, 
});
