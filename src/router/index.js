import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/buy' },
  { path: '/buy', name: 'buy', component: () => import('../views/CalculatorLayout.vue'), meta: { tab: 'buy' } },
  { path: '/sell', name: 'sell', component: () => import('../views/CalculatorLayout.vue'), meta: { tab: 'sell' } },
]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
