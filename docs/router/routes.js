// DO NOT ADD ANYTHING ELSE EXCEPT ROUTE ITEM INTO THIS FILE
// routes order = menu order
const routes = [
  {
    path: '/',
    meta: {
      type: 'home',
      label: 'Home'
    },
    component: () => import('./../components/Home.vue')
  },
  {
    path: '/getting-started',
    meta: {
      type: 'summary',
      label: 'Getting Started'
    },
    component: () => import('./../pages/usage/GettingStarted.md')
  },
  {
    path: '/i18n',
    meta: {
      type: 'summary',
      label: 'I18n'
    },
    component: () => import('./../pages/usage/I18n.md')
  },
  {
    path: '/chalimangge/1',
    meta: {
      type: 'stock',
      label: '1、用一生实践的23条铁律',
      group: '查理·芒格'
    },
    component: () => import('./../pages/stocks/chalimangge/1.md')
  },
  {
    path: '/chalimangge/2',
    meta: {
      type: 'stock',
      label: '2、22条误判心理，告诉你偏见是如何产生的？',
      group: '查理·芒格'
    },
    component: () => import('./../pages/stocks/chalimangge/2.md')
  },
  {
    path: '/chalimangge/3',
    meta: {
      type: 'stock',
      label: '3、人类的25个心理误判',
      group: '查理·芒格'
    },
    component: () => import('./../pages/stocks/chalimangge/3.md')
  },
  {
    path: '/chalimangge/4',
    meta: {
      type: 'stock',
      label: '4、第十一讲：人类误判心理学',
      group: '查理·芒格'
    },
    component: () => import('./../pages/stocks/chalimangge/4.md')
  }

]

export default routes
