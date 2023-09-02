import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import Registration from '../views/Registration.vue'
import Home from '../views/Home.vue'
import Products_for_sales from '../views/Products_for_sales.vue'
import Dashboard from '../views/Dashboard.vue'
import { storeToRefs } from 'pinia'
import { useStoreAuth } from '@/stores/auth_store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/products_for_sale/:category',
      name: 'products_for_sale',
      component: Products_for_sales
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    },
    {
      path: '/create_account',
      name: 'create_account',
      component: Registration
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/About.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(page => page.meta.requiresAuth)) { //to.name !== 'login' && !this.isloggedin
    const auth_store = useStoreAuth()
    const {  isLoggedin } = storeToRefs(auth_store)
    if ( !isLoggedin.value ) { //Is not logged in, go to Login Page
      next({ 
        name: 'login' 
        //path: 'login',
        //replace: true
      })
    } else {
      next() // go to wherever I'm going
    }
  } else {
    next() // does not require auth, make sure to always call next()!
  }
})
export default router
