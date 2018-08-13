import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'
import Stock from '@/components/Stock'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout
    },
    {
      path: '/stock*',
      name: 'Stock',
      component: Stock
    }
  ]
})
