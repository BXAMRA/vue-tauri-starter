import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

const DefaultView = () => import('@layouts/DefaultView.vue')

const Home = () => import('@pages/Home.vue')
const About = () => import('@pages/About.vue')

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/home' },
  {
    path: '/',
    component: DefaultView,
    children: [
      { path: 'home', component: Home, meta: { title: 'Home', description: 'This is the home page' } },
      { path: 'about', component: About, meta: { title: 'About' } },
    ],
  },

  { path: '/:pathMatch(.*)*', redirect: '/home' },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
