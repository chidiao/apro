import { DEFAULT_LAYOUT } from '../base'
import { AppRouteRecordRaw } from '../types'

const HOME: AppRouteRecordRaw = {
  path: '/',
  name: 'root',
  component: DEFAULT_LAYOUT,
  redirect: '/home',
  meta: {
    locale: '主页',
    requiresAuth: true,
    icon: 'icon-home',
    hideChildrenInMenu: true,
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
        roles: ['*'],
        activeMenu: 'app'
      }
    }
  ]
}

export default HOME
