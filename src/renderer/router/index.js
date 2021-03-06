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
    redirect: '/bilibili',
    component: 'components/layout',
    children: [
      {
        path: 'bilibili',
        meta: {
          title: 'bilibili图床',
          icon: 'fa fa-keyboard-o',
        },
        component: 'views/bilibili'
      },
      {
        path: 'iconfont',
        meta: {
          title: 'iconfont图标同步',
          icon: 'fa fa-bolt',
        },
        component: 'views/iconfont'
      },
      {
        path: 'baidu',
        meta: {
          title: '图片文字识别',
          icon: 'fa fa-rocket',
        },
        component: 'views/baidu'
      },
      {
        path: 'craft',
        meta: {
          title: 'mc工具',
          icon: 'fa fa-dribbble',
        },
        component: 'views/craft'
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
