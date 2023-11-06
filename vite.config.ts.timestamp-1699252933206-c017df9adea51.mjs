// vite.config.ts
import { defineConfig } from "file:///C:/projects/web/wtu/front-end/node_modules/.pnpm/vite@4.4.9_@types+node@20.6.2_sass@1.66.1/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/projects/web/wtu/front-end/node_modules/.pnpm/@vitejs+plugin-vue@4.3.4_vite@4.4.9_vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { resolve } from "path";
import AutoImport from "file:///C:/projects/web/wtu/front-end/node_modules/.pnpm/unplugin-auto-import@0.16.6_@vueuse+core@10.4.1/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///C:/projects/web/wtu/front-end/node_modules/.pnpm/unplugin-vue-components@0.25.2_vue@3.3.4/node_modules/unplugin-vue-components/dist/vite.mjs";
import { ElementPlusResolver } from "file:///C:/projects/web/wtu/front-end/node_modules/.pnpm/unplugin-vue-components@0.25.2_vue@3.3.4/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import UnoCSS from "file:///C:/projects/web/wtu/front-end/node_modules/.pnpm/unocss@0.55.7_postcss@8.4.29_vite@4.4.9/node_modules/unocss/dist/vite.mjs";
import { compression } from "file:///C:/projects/web/wtu/front-end/node_modules/.pnpm/vite-plugin-compression2@0.10.5/node_modules/vite-plugin-compression2/dist/index.mjs";
import { createSvgIconsPlugin } from "file:///C:/projects/web/wtu/front-end/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@4.4.9/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import path from "path";
import fs from "fs";
var __vite_injected_original_dirname = "C:\\projects\\web\\wtu\\front-end";
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
      "@api": resolve(__vite_injected_original_dirname, "src/api"),
      "@class": resolve(__vite_injected_original_dirname, "src/class"),
      "@components": resolve(__vite_injected_original_dirname, "src/components")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxwcm9qZWN0c1xcXFx3ZWJcXFxcd3R1XFxcXGZyb250LWVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxccHJvamVjdHNcXFxcd2ViXFxcXHd0dVxcXFxmcm9udC1lbmRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L3Byb2plY3RzL3dlYi93dHUvZnJvbnQtZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJ1xyXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xyXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xyXG5pbXBvcnQgeyBFbGVtZW50UGx1c1Jlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJ1xyXG5pbXBvcnQgVW5vQ1NTIGZyb20gJ3Vub2Nzcy92aXRlJ1xyXG5pbXBvcnQgeyBjb21wcmVzc2lvbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLWNvbXByZXNzaW9uMidcclxuXHJcbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4tc3ZnLWljb25zJ1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xyXG5pbXBvcnQgZnMgZnJvbSAnZnMnXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICAgIHZ1ZSgpLFxyXG4gICAgICAgIFVub0NTUygpLFxyXG4gICAgICAgIENvbXBvbmVudHMoe1xyXG4gICAgICAgICAgICBkdHM6IHRydWUsXHJcbiAgICAgICAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgQXV0b0ltcG9ydCh7XHJcbiAgICAgICAgICAgIGltcG9ydHM6IFsndnVlJywgJ3Z1ZS1yb3V0ZXInLCAnQHZ1ZXVzZS9jb3JlJ10sXHJcbiAgICAgICAgICAgIGR0czogJ3NyYy9hdXRvLWltcG9ydHMuZC50cycsXHJcbiAgICAgICAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xyXG4gICAgICAgICAgICAvLyBTcGVjaWZ5IHRoZSBpY29uIGZvbGRlciB0byBiZSBjYWNoZWRcclxuICAgICAgICAgICAgaWNvbkRpcnM6IFtwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ3NyYy9hc3NldHMvaWNvbicpXSxcclxuICAgICAgICAgICAgLy8gU3BlY2lmeSBzeW1ib2xJZCBmb3JtYXRcclxuICAgICAgICAgICAgc3ltYm9sSWQ6ICdpY29uLVtkaXJdLVtuYW1lXScsXHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogY3VzdG9tIGRvbSBpZFxyXG4gICAgICAgICAgICAgKiBAZGVmYXVsdDogX19zdmdfX2ljb25zX19kb21fX1xyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgY3VzdG9tRG9tSWQ6ICdfX3N2Z19faWNvbnNfX2RvbV9fJyxcclxuICAgICAgICB9KSxcclxuICAgICAgICBjb21wcmVzc2lvbigpLFxyXG4gICAgXSxcclxuXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgICBwb3J0OiA2NyxcclxuICAgICAgICBodHRwczoge1xyXG4gICAgICAgICAgICBjZXJ0OiBmcy5yZWFkRmlsZVN5bmMoXHJcbiAgICAgICAgICAgICAgICBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2Fzc2V0cy9zc2wvbG9jYWxob3N0KzMucGVtJylcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAga2V5OiBmcy5yZWFkRmlsZVN5bmMoXHJcbiAgICAgICAgICAgICAgICBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2Fzc2V0cy9zc2wvbG9jYWxob3N0KzMta2V5LnBlbScpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcblxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgICAgICdAJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKSxcclxuICAgICAgICAgICAgJ0BpY29uJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvYXNzZXRzL2ljb24nKSxcclxuICAgICAgICAgICAgJ0BpbWcnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9hc3NldHMvaW1nJyksXHJcbiAgICAgICAgICAgICdAcGFnZSc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3BhZ2UnKSxcclxuICAgICAgICAgICAgJ0Bjb21wb3NhYmxlcyc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2NvbXBvc2FibGVzJyksXHJcbiAgICAgICAgICAgICdAdXRpbCc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3V0aWwnKSxcclxuICAgICAgICAgICAgJ0BhcGknOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9hcGknKSxcclxuICAgICAgICAgICAgJ0BjbGFzcyc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2NsYXNzJyksXHJcbiAgICAgICAgICAgICdAY29tcG9uZW50cyc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2NvbXBvbmVudHMnKSxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFtUixTQUFTLG9CQUFvQjtBQUNoVCxPQUFPLFNBQVM7QUFDaEIsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsMkJBQTJCO0FBQ3BDLE9BQU8sWUFBWTtBQUNuQixTQUFTLG1CQUFtQjtBQUU1QixTQUFTLDRCQUE0QjtBQUNyQyxPQUFPLFVBQVU7QUFDakIsT0FBTyxRQUFRO0FBWGYsSUFBTSxtQ0FBbUM7QUFjekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsU0FBUztBQUFBLElBQ0wsSUFBSTtBQUFBLElBQ0osT0FBTztBQUFBLElBQ1AsV0FBVztBQUFBLE1BQ1AsS0FBSztBQUFBLE1BQ0wsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBQUEsSUFDckMsQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBLE1BQ1AsU0FBUyxDQUFDLE9BQU8sY0FBYyxjQUFjO0FBQUEsTUFDN0MsS0FBSztBQUFBLE1BQ0wsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBQUEsSUFDckMsQ0FBQztBQUFBLElBQ0QscUJBQXFCO0FBQUE7QUFBQSxNQUVqQixVQUFVLENBQUMsS0FBSyxRQUFRLFFBQVEsSUFBSSxHQUFHLGlCQUFpQixDQUFDO0FBQUE7QUFBQSxNQUV6RCxVQUFVO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQU1WLGFBQWE7QUFBQSxJQUNqQixDQUFDO0FBQUEsSUFDRCxZQUFZO0FBQUEsRUFDaEI7QUFBQSxFQUVBLFFBQVE7QUFBQSxJQUNKLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNILE1BQU0sR0FBRztBQUFBLFFBQ0wsS0FBSyxRQUFRLGtDQUFXLGdDQUFnQztBQUFBLE1BQzVEO0FBQUEsTUFDQSxLQUFLLEdBQUc7QUFBQSxRQUNKLEtBQUssUUFBUSxrQ0FBVyxvQ0FBb0M7QUFBQSxNQUNoRTtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQUEsRUFFQSxTQUFTO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDSCxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBLE1BQzdCLFNBQVMsUUFBUSxrQ0FBVyxpQkFBaUI7QUFBQSxNQUM3QyxRQUFRLFFBQVEsa0NBQVcsZ0JBQWdCO0FBQUEsTUFDM0MsU0FBUyxRQUFRLGtDQUFXLFVBQVU7QUFBQSxNQUN0QyxnQkFBZ0IsUUFBUSxrQ0FBVyxpQkFBaUI7QUFBQSxNQUNwRCxTQUFTLFFBQVEsa0NBQVcsVUFBVTtBQUFBLE1BQ3RDLFFBQVEsUUFBUSxrQ0FBVyxTQUFTO0FBQUEsTUFDcEMsVUFBVSxRQUFRLGtDQUFXLFdBQVc7QUFBQSxNQUN4QyxlQUFlLFFBQVEsa0NBQVcsZ0JBQWdCO0FBQUEsSUFDdEQ7QUFBQSxFQUNKO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
