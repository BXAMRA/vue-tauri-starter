import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

const Home = () => import('@pages/Home.vue')
const About = () => import('@pages/About.vue')


const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home, },
  { path: '/about', component: About, },

    { path: '/:pathMatch(.*)*', redirect: '/home' },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
