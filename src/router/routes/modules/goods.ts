import { DEFAULT_LAYOUT } from '../base'
import { AppRouteRecordRaw } from '../types'

const GOODS: AppRouteRecordRaw = {
  path: '/goods',
  name: 'goods',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '商品管理',
    requiresAuth: true,
    icon: 'icon-gift',
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
    },
    {
      path: 'edit',
      name: 'goodsEdit',
      component: () => import('@/views/goods/edit.vue'),
      meta: {
        locale: '编辑',
        requiresAuth: true,
        roles: ['*']
      }
    },
    {
      path: 'editor',
      name: 'goodsEditor',
      component: () => import('@/views/goods/editor.vue'),
      meta: {
        locale: '编辑器',
        requiresAuth: true,
        roles: ['*']
      }
    },
    {
      path: 'long',
      name: 'goodsLong',
      component: () => import('@/views/goods/long.vue'),
      meta: {
        locale: 'vModel封装',
        requiresAuth: true,
        roles: ['*']
      }
    }
  ]
}

export default GOODS
