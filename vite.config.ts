import type { UserConfig, ConfigEnv } from 'vite';
import { loadEnv } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import vue from '@vitejs/plugin-vue';
import windiCSS from 'vite-plugin-windicss';
import { createHtmlPlugin } from 'vite-plugin-html';
import { resolve } from 'path';
import { viteMockServe } from 'vite-plugin-mock';
import styleImport from 'vite-plugin-style-import';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import pkg from './package.json';
import dayjs from 'dayjs';
const CWD = process.cwd();
['dependencies', 'devDependencies'].forEach((name) => {
  Object.keys(pkg[name]).forEach((key) => {
    const devPkg = require(`./node_modules/${key}/package.json`);
    pkg[name][key] = {
      url: devPkg.repository?.url || devPkg.repository || devPkg.homepage,
      version: pkg[name][key],
    };
  });
});

const __APP_INFO__ = {
  pkg,
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
};
export default ({ command, mode }: ConfigEnv): UserConfig => {
  // 环境变量
  const { VITE_BASE_URL, VITE_DROP_CONSOLE } = loadEnv(mode, CWD);
  console.log(VITE_BASE_URL, VITE_DROP_CONSOLE);
  const isBuild = command === 'build';

  return {
    base: VITE_BASE_URL,
    esbuild: {
      // target: 'es2015',
    },
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
    plugins: [
      vue(),
      windiCSS(),
      vueJsx(),
      legacy({
        targets: ['defaults', 'not IE 11'],
      }),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            appName: 'name',
            appTitle: 'title',
          },
        },
      }),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [resolve(CWD, 'src/assets/images/icons')],
        // Specify symbolId format
        symbolId: 'svg-icon-[dir]-[name]',
      }),
      viteMockServe({
        ignore: /^\_/,
        mockPath: 'mock',
        localEnabled: !isBuild,
        prodEnabled: isBuild,
        logger: true,
        injectCode: `
          import { setupProdMockServer } from '../mock/_createProdMockServer';

          setupProdMockServer();
          `,
      }),
      styleImport({
        libs: [
          {
            libraryName: 'ant-design-vue',
            esModule: true,
            resolveStyle: (name) => {
              return `ant-design-vue/es/${name}/style/index`;
            },
          },
        ],
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: { '@primary-color': '#13c2c2' },
        },
      },
    },
    server: {
      host: '0.0.0.0',
      port: 8088,
      proxy: {
        '/api': {
          target: 'https://xxx/api/',
          // target: 'http://localhost:7001',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },

    build: {
      // target: 'esnext',
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: Object.is(VITE_DROP_CONSOLE, 'true'),
        },
      },
    },
  };
};
