import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import * as path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni({
      viteLegacyOptions: {
        targets: ['Chrome > 70'],
      },
    }),
  ],
  // 识别 @
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    include: ['src/**'],
  },
});
