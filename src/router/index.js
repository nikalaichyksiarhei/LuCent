import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Privacy from '../views/Privacy.vue'
import Terms from '../views/Terms.vue'
import Contact from '../views/Contact.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/privacy', component: Privacy },
  { path: '/terms', component: Terms },
  { path: '/contact', component: Contact }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    return { top: 0 }
  }
})

export default router