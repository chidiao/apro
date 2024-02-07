import { DEFAULT_LAYOUT } from '../base'
import { AppRouteRecordRaw } from '../types'

const GOODS: AppRouteRecordRaw = {
  path: '/goods',
  name: 'goods',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '商品',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 1
  },
  children: [
    {
      path: 'list',
      name: 'goodsList',
      component: () => import('@/views/goods/list.vue'),
      meta: {
        locale: '列表',
        requiresAuth: true,
        roles: ['*']
      }
    }
  ]
}

export default GOODS