import { defineConfig } from '@vben/vite-config';
import { codeInspectorPlugin } from 'code-inspector-plugin'

export default defineConfig(async () => {
  return {
    application: {},
    vite: {
      server: {
        proxy: {
          '/api': {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
            // mock代理目标地址
            target: 'http://localhost:5320/api',
            ws: true,
          },
        },
      },
      plugins: [
        codeInspectorPlugin({
          bundler: 'vite',
          hideDomPathAttr: true
        }),
      ],

    },
  };
});
