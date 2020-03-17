import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/user',
      name: 'User',
      component: () => import('@/page/user')
    },
    {
      path: '/analysis',
      name: 'Analysis',
      component: () => import('@/page/analysis')
    },
    {
      path: '/rbt',
      name: 'RBT',
      component: () => import('@/page/rbt')
    },
    // {
    //   path: '/state',
    //   name: 'state',
    //   component: () => import('@/components/studyState')
    // }
  ]
})
