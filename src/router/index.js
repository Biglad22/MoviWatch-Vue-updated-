import { createRouter, createWebHistory } from 'vue-router'
import { genrePathGuard, singleMoviePathGuard } from './routeGuard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'trendingView',
      component:() => import('../views/trendingView.vue') 
    },
    {
      path: '/:genre',
      name: 'genrePage',
      beforeEnter:(to, from, next) => genrePathGuard(to, from, next),
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/genreBody.vue')
    },
    {
      path: '/search/:query',
      name: 'searchPage',
      component:() => import('../views/searchPage.vue') 
    },
    {
      path: '/:genre/:movieTitle',
      name: 'singleMovie',
      component: ()=> import('../views/movie.vue'),
      beforeEnter:(to, from, next)=> singleMoviePathGuard(to, from, next)
    },
    {
      path: '/404',
      name: '404',
      component: ()=> import('../views/404.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      beforeEnter: (to, from, next) => next({path:'/404'})
    },
  ],
});



export default router
