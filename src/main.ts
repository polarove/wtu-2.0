import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// vue-router
import router from './router'

// pinia
const pinia = createPinia()

// unocss
import 'virtual:uno.css'

// global css style
import './style/style.css'

// dark mode css style
import './style/css-vars.scss'

// font css style
import './fonts/font.css'

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
