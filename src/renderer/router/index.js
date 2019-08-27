import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'week-page',
      component: require('@/views/Week').default
    },
    {
      path: '/day',
      name: 'day-page',
      component: require('@/views/Day').default
    },
    {
      path: '/month',
      name: 'day-page',
      component: require('@/views/Month').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
