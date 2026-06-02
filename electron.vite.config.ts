import { resolve } from 'path'
import { defineConfig } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  main: {
    envPrefix: ['MAIN_VITE_'],
    build: {
      externalizeDeps: true
    },
    resolve: {
      alias: {
        '~': resolve('src')
      }
    }
  },
  preload: {
    envPrefix: ['PRELOAD_VITE_'],
    build: {
      externalizeDeps: true
    },
    resolve: {
      alias: {
        '~': resolve('src')
      }
    }
  },
  renderer: {
    envPrefix: ['RENDERER_VITE_'],
    resolve: {
      alias: {
        '~': resolve('src')
      }
    },
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        dts: 'src/types/auto-imports.d.ts',
        dirs: ['src/composables', 'src/stores'],
        vueTemplate: true,
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true
        }
      }),
      Components({
        dirs: ['src/components', 'src/layouts'],
        extensions: ['vue'],
        deep: true,
        dts: 'src/types/components.d.ts'
      })
    ]
  }
})
