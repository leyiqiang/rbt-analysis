import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/user',
      name: 'user',
      component: () => import('@/components/user')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/components/dashboard')
    },
    {
      path: '/tools',
      name: 'tools',
      component: () => import('@/components/tools')
    },
    // {
    //   path: '/state',
    //   name: 'state',
    //   component: () => import('@/components/studyState')
    // }
  ]
})
