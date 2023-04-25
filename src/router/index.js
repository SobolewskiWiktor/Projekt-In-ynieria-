import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DasboardView from '@/views/DasboardView.vue'
import AssingmentView from '@/views/AssingmentView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/Dashboard',
      name: 'Dashboard',
      component: DasboardView
    }
  ]
})

export default router
