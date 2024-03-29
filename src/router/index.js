import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'trendingView',
      component:() => import('../views/trendingView.vue') 
    },
    {
      path: '/genrePage',
      name: 'genrePage',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/genreBody.vue')
    },
    {
      path: '/searchPage',
      name: 'searchPage',
      component:() => import('../views/searchPage.vue') 
    },
  ]
})

export default router
