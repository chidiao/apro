import { DEFAULT_LAYOUT } from '../base'
import { AppRouteRecordRaw } from '../types'

const GOODS: AppRouteRecordRaw = {
  path: '/analysis',
  name: 'analysis',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '虹膜数据',
    requiresAuth: true,
    icon: 'icon-user',
    order: 1
  },
  children: [
    {
      path: '/analysis1',
      name: 'analysis1',
      component: '',
      meta: {
        locale: '分析结果',
        requiresAuth: true,
        icon: 'icon-user',
        order: 1
      },
      children: [
        {
          path: '/analysis2',
          name: 'analysis2',
          component: () => import('@/views/account/list.vue'),
          meta: {
            locale: '主结果',
            requiresAuth: true,
            icon: 'icon-user',
            order: 1
          },
        }
      ]
    }
  ]
}

export default GOODS
