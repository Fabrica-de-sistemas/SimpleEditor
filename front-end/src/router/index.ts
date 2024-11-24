import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import AboutPage from '@/views/AboutPage.vue'
import NotFoundPage from '@/views/NotFoundPage.vue'
import SignUpPage from '@/views/SignUpPage.vue'
import SignInPage from '@/views/SignInPage.vue'
import ConfigPage from '@/views/ConfigPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/', name: 'Home', component: HomePage},
    {path: '/about', name:'About', component: AboutPage},
    {path: '/signup', name: 'SignUp', component: SignUpPage},
    {path: '/signin', name: 'SignIn', component: SignInPage},
    {path: '/config', name: 'Configuration', component: ConfigPage},
    {path: '/:notFound', name: 'NotFound', component: NotFoundPage}
  ]
})

export default router