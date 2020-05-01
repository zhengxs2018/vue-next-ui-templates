import { createRouter, createWebHistory } from 'vue-router'

import Home from './views/Home.vue'
import About from './views/About.vue'

export const routerHistory = createWebHistory()

export const router = createRouter({
  history: routerHistory,
  routes: [
    // @ts-ignore
    { path: '/', component: Home },
    // @ts-ignore
    { path: '/about', component: About },
  ],
})
