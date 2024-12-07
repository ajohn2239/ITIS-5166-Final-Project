import { defineConfig } from 'vite';
import createExternal from 'vite-plugin-external';

export default defineConfig({
    plugins: [
      createExternal({
        externals: {
          react: 'd3'
        }
      })
    ]
  });
