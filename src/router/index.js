import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/user',
      name: 'user',
      component: () => import('@/page/user')
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
      path: '/abc-table',
      name: 'abc-table',
      component: () => import('@/components/tables/abcTable')
    }
  ]
})
