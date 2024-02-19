import { DEFAULT_LAYOUT } from '../base'
import { AppRouteRecordRaw } from '../types'

const USER: AppRouteRecordRaw = {
  path: '/user',
  name: 'user',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '用户管理',
    requiresAuth: true,
    icon: 'icon-user',
    order: 1
  },
  children: [
    {
      path: 'list',
      name: 'userList',
      component: () => import('@/views/user/list.vue'),
      meta: {
        locale: '列表',
        requiresAuth: true,
        roles: ['*']
      }
    }
  ]
}

export default USER
