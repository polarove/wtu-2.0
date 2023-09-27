// vite.config.ts
import { defineConfig } from "file:///C:/projects/web/source/wtu/front-end/node_modules/.pnpm/vite@4.4.9_@types+node@20.6.2_sass@1.66.1/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/projects/web/source/wtu/front-end/node_modules/.pnpm/@vitejs+plugin-vue@4.3.4_vite@4.4.9_vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { resolve } from "path";
import AutoImport from "file:///C:/projects/web/source/wtu/front-end/node_modules/.pnpm/unplugin-auto-import@0.16.6_@vueuse+core@10.4.1/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///C:/projects/web/source/wtu/front-end/node_modules/.pnpm/unplugin-vue-components@0.25.2_vue@3.3.4/node_modules/unplugin-vue-components/dist/vite.mjs";
import { ElementPlusResolver } from "file:///C:/projects/web/source/wtu/front-end/node_modules/.pnpm/unplugin-vue-components@0.25.2_vue@3.3.4/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import UnoCSS from "file:///C:/projects/web/source/wtu/front-end/node_modules/.pnpm/unocss@0.55.7_postcss@8.4.29_vite@4.4.9/node_modules/unocss/dist/vite.mjs";
import { compression } from "file:///C:/projects/web/source/wtu/front-end/node_modules/.pnpm/vite-plugin-compression2@0.10.5/node_modules/vite-plugin-compression2/dist/index.mjs";
import { createSvgIconsPlugin } from "file:///C:/projects/web/source/wtu/front-end/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@4.4.9/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import path from "path";
import fs from "fs";
var __vite_injected_original_dirname = "C:\\projects\\web\\source\\wtu\\front-end";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    Components({
      dts: true,
      resolvers: [ElementPlusResolver()]
    }),
    AutoImport({
      imports: ["vue", "vue-router", "@vueuse/core"],
      dts: "src/auto-imports.d.ts",
      resolvers: [ElementPlusResolver()]
    }),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), "src/assets/icon")],
      // Specify symbolId format
      symbolId: "icon-[dir]-[name]",
      /**
       * custom dom id
       * @default: __svg__icons__dom__
       */
      customDomId: "__svg__icons__dom__"
    }),
    compression()
  ],
  server: {
    port: 67,
    https: {
      cert: fs.readFileSync(
        path.resolve(__vite_injected_original_dirname, "src/assets/ssl/localhost+3.pem")
      ),
      key: fs.readFileSync(
        path.resolve(__vite_injected_original_dirname, "src/assets/ssl/localhost+3-key.pem")
      )
    }
  },
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "src"),
      "@icon": resolve(__vite_injected_original_dirname, "src/assets/icon"),
      "@img": resolve(__vite_injected_original_dirname, "src/assets/img"),
      "@page": resolve(__vite_injected_original_dirname, "src/page"),
      "@composables": resolve(__vite_injected_original_dirname, "src/composables"),
      "@util": resolve(__vite_injected_original_dirname, "src/util"),
      "@api": resolve(__vite_injected_original_dirname, "src/api")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxwcm9qZWN0c1xcXFx3ZWJcXFxcc291cmNlXFxcXHd0dVxcXFxmcm9udC1lbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXHByb2plY3RzXFxcXHdlYlxcXFxzb3VyY2VcXFxcd3R1XFxcXGZyb250LWVuZFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovcHJvamVjdHMvd2ViL3NvdXJjZS93dHUvZnJvbnQtZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnXG5pbXBvcnQgVW5vQ1NTIGZyb20gJ3Vub2Nzcy92aXRlJ1xuaW1wb3J0IHsgY29tcHJlc3Npb24gfSBmcm9tICd2aXRlLXBsdWdpbi1jb21wcmVzc2lvbjInXG5cbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4tc3ZnLWljb25zJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBmcyBmcm9tICdmcydcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gICAgcGx1Z2luczogW1xuICAgICAgICB2dWUoKSxcbiAgICAgICAgVW5vQ1NTKCksXG4gICAgICAgIENvbXBvbmVudHMoe1xuICAgICAgICAgICAgZHRzOiB0cnVlLFxuICAgICAgICAgICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXSxcbiAgICAgICAgfSksXG4gICAgICAgIEF1dG9JbXBvcnQoe1xuICAgICAgICAgICAgaW1wb3J0czogWyd2dWUnLCAndnVlLXJvdXRlcicsICdAdnVldXNlL2NvcmUnXSxcbiAgICAgICAgICAgIGR0czogJ3NyYy9hdXRvLWltcG9ydHMuZC50cycsXG4gICAgICAgICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxuICAgICAgICB9KSxcbiAgICAgICAgY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xuICAgICAgICAgICAgLy8gU3BlY2lmeSB0aGUgaWNvbiBmb2xkZXIgdG8gYmUgY2FjaGVkXG4gICAgICAgICAgICBpY29uRGlyczogW3BhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnc3JjL2Fzc2V0cy9pY29uJyldLFxuICAgICAgICAgICAgLy8gU3BlY2lmeSBzeW1ib2xJZCBmb3JtYXRcbiAgICAgICAgICAgIHN5bWJvbElkOiAnaWNvbi1bZGlyXS1bbmFtZV0nLFxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIGN1c3RvbSBkb20gaWRcbiAgICAgICAgICAgICAqIEBkZWZhdWx0OiBfX3N2Z19faWNvbnNfX2RvbV9fXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGN1c3RvbURvbUlkOiAnX19zdmdfX2ljb25zX19kb21fXycsXG4gICAgICAgIH0pLFxuICAgICAgICBjb21wcmVzc2lvbigpLFxuICAgIF0sXG5cbiAgICBzZXJ2ZXI6IHtcbiAgICAgICAgcG9ydDogNjcsXG4gICAgICAgIGh0dHBzOiB7XG4gICAgICAgICAgICBjZXJ0OiBmcy5yZWFkRmlsZVN5bmMoXG4gICAgICAgICAgICAgICAgcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9hc3NldHMvc3NsL2xvY2FsaG9zdCszLnBlbScpXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAga2V5OiBmcy5yZWFkRmlsZVN5bmMoXG4gICAgICAgICAgICAgICAgcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9hc3NldHMvc3NsL2xvY2FsaG9zdCszLWtleS5wZW0nKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgfSxcbiAgICB9LFxuXG4gICAgcmVzb2x2ZToge1xuICAgICAgICBhbGlhczoge1xuICAgICAgICAgICAgJ0AnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpLFxuICAgICAgICAgICAgJ0BpY29uJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvYXNzZXRzL2ljb24nKSxcbiAgICAgICAgICAgICdAaW1nJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvYXNzZXRzL2ltZycpLFxuICAgICAgICAgICAgJ0BwYWdlJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvcGFnZScpLFxuICAgICAgICAgICAgJ0Bjb21wb3NhYmxlcyc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2NvbXBvc2FibGVzJyksXG4gICAgICAgICAgICAnQHV0aWwnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy91dGlsJyksXG4gICAgICAgICAgICAnQGFwaSc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2FwaScpLFxuICAgICAgICB9LFxuICAgIH0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEwUyxTQUFTLG9CQUFvQjtBQUN2VSxPQUFPLFNBQVM7QUFDaEIsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsMkJBQTJCO0FBQ3BDLE9BQU8sWUFBWTtBQUNuQixTQUFTLG1CQUFtQjtBQUU1QixTQUFTLDRCQUE0QjtBQUNyQyxPQUFPLFVBQVU7QUFDakIsT0FBTyxRQUFRO0FBWGYsSUFBTSxtQ0FBbUM7QUFjekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsU0FBUztBQUFBLElBQ0wsSUFBSTtBQUFBLElBQ0osT0FBTztBQUFBLElBQ1AsV0FBVztBQUFBLE1BQ1AsS0FBSztBQUFBLE1BQ0wsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBQUEsSUFDckMsQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBLE1BQ1AsU0FBUyxDQUFDLE9BQU8sY0FBYyxjQUFjO0FBQUEsTUFDN0MsS0FBSztBQUFBLE1BQ0wsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBQUEsSUFDckMsQ0FBQztBQUFBLElBQ0QscUJBQXFCO0FBQUE7QUFBQSxNQUVqQixVQUFVLENBQUMsS0FBSyxRQUFRLFFBQVEsSUFBSSxHQUFHLGlCQUFpQixDQUFDO0FBQUE7QUFBQSxNQUV6RCxVQUFVO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQU1WLGFBQWE7QUFBQSxJQUNqQixDQUFDO0FBQUEsSUFDRCxZQUFZO0FBQUEsRUFDaEI7QUFBQSxFQUVBLFFBQVE7QUFBQSxJQUNKLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNILE1BQU0sR0FBRztBQUFBLFFBQ0wsS0FBSyxRQUFRLGtDQUFXLGdDQUFnQztBQUFBLE1BQzVEO0FBQUEsTUFDQSxLQUFLLEdBQUc7QUFBQSxRQUNKLEtBQUssUUFBUSxrQ0FBVyxvQ0FBb0M7QUFBQSxNQUNoRTtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQUEsRUFFQSxTQUFTO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDSCxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBLE1BQzdCLFNBQVMsUUFBUSxrQ0FBVyxpQkFBaUI7QUFBQSxNQUM3QyxRQUFRLFFBQVEsa0NBQVcsZ0JBQWdCO0FBQUEsTUFDM0MsU0FBUyxRQUFRLGtDQUFXLFVBQVU7QUFBQSxNQUN0QyxnQkFBZ0IsUUFBUSxrQ0FBVyxpQkFBaUI7QUFBQSxNQUNwRCxTQUFTLFFBQVEsa0NBQVcsVUFBVTtBQUFBLE1BQ3RDLFFBQVEsUUFBUSxrQ0FBVyxTQUFTO0FBQUEsSUFDeEM7QUFBQSxFQUNKO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
