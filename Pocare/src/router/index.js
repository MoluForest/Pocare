import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Learning from '../pages/Learning.vue'
import About from '../pages/About.vue'
import Profile from '../pages/Profile.vue'
import learning1 from '../pages/learning1.vue'
import learning2 from '../pages/learning2.vue'
import learning3 from '../pages/learning3.vue'
import learning4 from '../pages/learning4.vue'
import Award from '@/pages/Award.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/learning', name: 'Learning', component: Learning },
  { path: '/about', component: About },
  { path: '/profile', component: Profile },
  { path: '/learning1', component: learning1 },
  { path: '/learning2', component: learning2 },
  { path: '/learning3', component: learning3 },
  { path: '/learning4', component: learning4 },
  { path: '/award', component: Award }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
