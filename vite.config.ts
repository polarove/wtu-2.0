import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import UnoCSS from 'unocss/vite'

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
import fs from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        UnoCSS(),
        Components({
            dts: true,
            resolvers: [ElementPlusResolver()],
        }),
        AutoImport({
            imports: ['vue', 'vue-router', '@vueuse/core'],
            dts: 'src/auto-imports.d.ts',
            resolvers: [ElementPlusResolver()],
        }),
        createSvgIconsPlugin({
            // Specify the icon folder to be cached
            iconDirs: [path.resolve(process.cwd(), 'src/assets/icon')],
            // Specify symbolId format
            symbolId: 'icon-[dir]-[name]',

            /**
             * custom dom id
             * @default: __svg__icons__dom__
             */
            customDomId: '__svg__icons__dom__',
        }),
    ],

    server: {
        port: 67,
        https: {
            cert: fs.readFileSync(
                path.resolve(__dirname, 'src/assets/ssl/localhost+3.pem')
            ),
            key: fs.readFileSync(
                path.resolve(__dirname, 'src/assets/ssl/localhost+3-key.pem')
            ),
        },
    },

    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            '@icon': resolve(__dirname, 'src/assets/icon'),
            '@img': resolve(__dirname, 'src/assets/img'),
            '@page': resolve(__dirname, 'src/page'),
            '@util': resolve(__dirname, 'src/util'),
            '@api': resolve(__dirname, 'src/request'),
            '@composables': resolve(__dirname, 'src/composables'),
        },
    },
})
