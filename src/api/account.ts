import axios from 'axios'

export const getAccountList = (page = 1, pageSize = 20) => {
  return axios.post<any[]>('/v1/irisUser/userList', {
    page,
    page_size: pageSize
  })
}

export const getSubList = (page = 1, pageSize = 20) => {
  return axios.post('/v1/irisUser/subList', {
    page,
    page_size: pageSize
  })
}
