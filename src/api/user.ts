import axios from 'axios'
import type { RouteRecordNormalized } from 'vue-router'
import { UserState } from '@/store/modules/user/types'

export interface LoginData {
  username: string
  password: string
}

export interface LoginRes {
  token: string
}
export function login(data: LoginData) {
  return axios.post<LoginRes>('/v1/login/doLogin', {
    user_name: data.username,
    password: data.password
  })
}

export function logout() {
  return axios.post<LoginRes>('/api/user/logout')
}

export function getUserInfo() {
  return axios.post<UserState>('/api/user/info')
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/api/user/menu')
}

export function getUserList(page = 1, pageSize = 10) {
  return axios.post<any[]>('/v1/irisUser/userList', {
    page,
    page_size: pageSize
  })
}
