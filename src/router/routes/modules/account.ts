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
      path: 'main',
      name: 'accountMainList',
      component: () => import('@/views/account/list.vue'),
      meta: {
        locale: '注册账户',
        requiresAuth: true,
        icon: 'icon-user-group',
        roles: ['*']
      }
    },
    {
      path: 'main/detail',
      name: 'accountMainDetail',
      component: () => import('@/views/account/detail.vue'),
      meta: {
        locale: '注册账户详情',
        requiresAuth: true,
        roles: ['*'],
        hideInMenu: true
      }
    },
    {
      path: 'sub',
      name: 'accountSub',
      component: () => import('@/views/account/sub.vue'),
      meta: {
        locale: '子账户',
        requiresAuth: true,
        icon: 'icon-idcard',
        roles: ['*']
      }
    },
    {
      path: 'sub/detail',
      name: 'accountSubDetail',
      component: () => import('@/views/account/sub-detail.vue'),
      meta: {
        locale: '子账户详情',
        requiresAuth: true,
        icon: 'icon-idcard',
        roles: ['*'],
        hideInMenu: true
      }
    }
  ]
}

export default ACCOUNTS
