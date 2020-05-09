import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'


Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/userLogin',
      name: 'userLogin',
      component: () => import('@/page/userLogin')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/page/dashboard')
    },
    {
      path: '/tools',
      name: 'tools',
      component: () => import('@/page/tools'),
      children: [
        // { path: 'table',
        //   name: 'table',
        //   component: () => import('@/components/tables/table')  
        // }
      ]
    },
    {
      path: '/newTable',
      name: 'newTable',
      component: () => import('@/page/newTable')
    },
    {path:'/tableOne/:tableID',
      name:'tableOne',
      component: () => import('@/page/tableOne')
    },
    {
      path: '/editExistingTable',
      name: 'editExistingTable',
      component: () => import('@/page/tablesManagement')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/page/about')
    },
    {
      path: '/table',
      name: 'table',
      component: () => import('@/components/tables/table')
    },
    {
      path: '/abcTable/:tableID',
      name: 'abcTable',
      component: () => import('@/components/tables/abcTable')
    }, {
      path: '/dashboard/abcTable/:tableID',
      name: 'abcTableDashboard',
      component: () => import('@/components/dashboard/abcTable')
    },
    {
      path: '/dashboard/tableOne/:tableID',
      name: 'tableOneDashboard',
      component: () => import('@/components/dashboard/tableOne')
    }
  ]
})

import { getXAccessTokenFromCookie } from '@/utils/utils'

router.beforeEach((to, from, next) => {
  if (!getXAccessTokenFromCookie()) {
    if (to.path !== '/userLogin' && to.path !== '/about') {
      return next('/userLogin')
    }
  }
  next()
})

export default router