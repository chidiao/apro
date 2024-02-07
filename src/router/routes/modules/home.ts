import { DEFAULT_LAYOUT } from '../base'
import { AppRouteRecordRaw } from '../types'

const HOME: AppRouteRecordRaw = {
  path: '/',
  name: '',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '主页',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0
  },
  children: [
    {
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/index.vue'),
      meta: {
        locale: '主页',
        requiresAuth: true,
        roles: ['*']
      }
    }
  ]
}

export default HOME
