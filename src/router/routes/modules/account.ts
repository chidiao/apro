import { DEFAULT_LAYOUT } from '../base'
import { AppRouteRecordRaw } from '../types'

const ACCOUNTS: AppRouteRecordRaw = {
  path: '/account',
  name: 'account',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '用户',
    requiresAuth: true,
    icon: 'icon-user',
    order: 1
  },
  children: [
    {
      path: 'iris-account',
      name: 'irisAccount',
      component: () => import('@/views/account/list.vue'),
      meta: {
        locale: '注册账户',
        requiresAuth: true,
        icon: 'icon-user-group',
        roles: ['*']
      }
    },
    {
      path: 'iris-sub-account',
      name: 'irisSubAccount',
      component: () => import('@/views/account/sub.vue'),
      meta: {
        locale: '子账户',
        requiresAuth: true,
        icon: 'icon-idcard',
        roles: ['*']
      }
    }
  ]
}

export default ACCOUNTS
