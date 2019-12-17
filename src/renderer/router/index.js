import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'indedx',
      component: require('@/views/index').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
