import Vue from 'vue'
import Router from 'vue-router'

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

Vue.use(Router)

function loopRoutes(routes, father = null) {
  routes.forEach(route => {
    if (route.component) route.component = require('@/' + route.component).default;
    route.url = route.path;
    if (father) {
      if (father.url == '/') {
        route.url = route.url.startsWith('/') ? route.url : ('/' + route.url);
      } else {
        route.url = father.url + (route.url.startsWith('/') ? route.url : ('/' + route.url));
      }
    }
    if (route.children && route.children.length > 0) {
      loopRoutes(route.children, route);
    }
  })
}

const routes = [
  {
    path: '/',
    redirect: '/iconfontSync',
    component: 'components/layout',
    children: [
      {
        path: 'iconfontSync',
        meta: {
          title: '图标同步',
        },
        component: 'views/iconfontSync'
      },
      {
        path: 'bilibiliUploader',
        meta: {
          title: '图片上传',
        },
        component: 'views/bilibiliUploader'
      },
    ],
  },
  {
    path: '*',
    redirect: '/'
  }
]
loopRoutes(routes);

export const menus = routes[0].children;

export default new Router({
  routes
})
