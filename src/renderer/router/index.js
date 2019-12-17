import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/iconfontSync',
      component: require('@/components/layout').default,
      children: [
        {
          path: 'iconfontSync',
          meta: {
            title: '图标同步',
          },
          component: require('@/views/iconfontSync').default
        },
        {
          path: 'bilibiliUploader',
          meta: {
            title: '图片上传',
          },
          component: require('@/views/bilibiliUploader').default
        },
      ],
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
