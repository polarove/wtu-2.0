import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// pinia
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// vue app
import App from './App.vue'

// vue-router
import router from './router'

// animate.css
import 'animate.css'

// unocss
import 'virtual:uno.css'

// global css style
import './style/normalize.css'

// dark mode css style
import './style/css-vars.scss'

// font css style
import './assets/font/font.css'

// nprogress
import 'nprogress/nprogress.css'

// svg icon
import 'virtual:svg-icons-register'
import ryuSvg from './components/ryu-svg.vue'

// element-plus dark mode
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)
app.use(pinia)
app.use(router)
app.component('svg-icon', ryuSvg)
app.mount('#app')
