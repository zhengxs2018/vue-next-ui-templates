import { createApp } from 'vue'

import '@vue-next-ui/theme-default'
import '@vue-next-ui/theme-default/lib/reset.css'

import { router } from './router'

import App from './App.vue'

const app = createApp(App)

app.use(router)

app.mount('#app')
