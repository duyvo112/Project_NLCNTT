import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import LoginPage from '../views/Login.vue'
import { useUserStore } from '../stores/userStore'

const routes = [
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
    meta: { requiresGuest: true },
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: () => import('../views/Register.vue'),
    meta: { requiresGuest: true },
  },
  {
    path: '/',
    name: 'HomePage',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/user/:id',
    name: 'UserProfile',
    component: () => import('../views/UserProfile.vue'),
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/explore',
    name: 'ExplorePage',
    component: () => import('../views/Explore.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/chat',
    name: 'ChatPage',
    component: () => import('../views/ChatBox.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const isAuthenticated = userStore.isAuthenticated

  if (to.meta.requiresGuest && isAuthenticated) {
    next({ name: 'HomePage' })
    return
  }

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({
      name: 'LoginPage',
      query: { redirect: to.fullPath },
    })
    return
  }

  next()
})

export default router
