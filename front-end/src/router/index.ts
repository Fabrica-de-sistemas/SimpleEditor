import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import AboutPage from '@/views/AboutPage.vue'
import NotFoundPage from '@/views/NotFoundPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/', name: 'Home', component: HomePage},
    {path: '/about', name:'About', component: AboutPage},
    {path: '/:notFound', name: 'NotFound', component: NotFoundPage}
  ]
})

export default router