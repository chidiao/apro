import { DEFAULT_LAYOUT } from '../base'
import { AppRouteRecordRaw } from '../types'

const GOODS: AppRouteRecordRaw = {
  path: '/iris',
  name: 'iris',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '虹膜数据',
    requiresAuth: true,
    icon: 'icon-eye',
    order: 1
  },
  children: [
    {
      path: 'analysis',
      name: 'irisAnalysis',
      component: '',
      meta: {
        locale: '分析结果',
        requiresAuth: true,
        icon: 'icon-file',
        order: 1
      },
      children: [
        {
          path: 'main',
          name: 'irisAnalysisMain',
          component: () => import('@/views/iris/analysis/main.vue'),
          meta: {
            locale: '主结果',
            requiresAuth: true,
            icon: 'icon-subscribed',
            order: 1
          }
        },
        {
          path: 'main-detail',
          name: 'irisAnalysisMainDetail',
          component: () => import('@/views/iris/analysis/main-detail.vue'),
          meta: {
            locale: '主结果详情',
            requiresAuth: true,
            icon: 'icon-subscribed',
            order: 1,
            hideInMenu: true
          }
        },
        {
          path: 'whole',
          name: 'irisAnalysisWhole',
          component: () => import('@/views/iris/analysis/whole.vue'),
          meta: {
            locale: '全部结果',
            requiresAuth: true,
            icon: 'icon-subscribe',
            order: 1
          }
        },
        {
          path: 'whole-detail',
          name: 'irisAnalysisWholeDetail',
          component: () => import('@/views/iris/analysis/whole-detail.vue'),
          meta: {
            locale: '结果详情',
            requiresAuth: true,
            icon: 'icon-subscribe',
            order: 1,
            hideInMenu: true
          }
        }
      ]
    }
  ]
}

export default GOODS
