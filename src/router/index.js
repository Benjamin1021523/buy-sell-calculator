import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/buy' },
  {
    path: '/buy',
    name: 'buy',
    component: () => import('../views/CalculatorLayout.vue'),
    meta: { tab: 'buy', title: '買進計算機 | 買賣計算機', description: '計算股票買進最有利的股數與平均成本' },
  },
  {
    path: '/sell',
    name: 'sell',
    component: () => import('../views/CalculatorLayout.vue'),
    meta: { tab: 'sell', title: '賣出計算機 | 買賣計算機', description: '計算股票賣出最有利的股數與平均收益' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  const desc = to.meta.description
  if (desc) {
    const metaDesc = document.querySelector('meta[name="description"]')
    const ogDesc = document.querySelector('meta[property="og:description"]')
    const twitterDesc = document.querySelector('meta[name="twitter:description"]')
    if (metaDesc) metaDesc.setAttribute('content', desc)
    if (ogDesc) ogDesc.setAttribute('content', desc)
    if (twitterDesc) twitterDesc.setAttribute('content', desc)
  }
  if (to.meta.title) {
    const ogTitle = document.querySelector('meta[property="og:title"]')
    const twitterTitle = document.querySelector('meta[name="twitter:title"]')
    if (ogTitle) ogTitle.setAttribute('content', to.meta.title)
    if (twitterTitle) twitterTitle.setAttribute('content', to.meta.title)
  }
})

export default router
