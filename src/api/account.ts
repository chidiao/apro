import axios from 'axios'

export const getAccountList = (page = 1, pageSize = 10) => {
  return axios.post<any[]>('/v1/irisUser/userList', {
    page,
    page_size: pageSize
  })
}

export const getSubList = () => {
  return axios.get('/v1/irisUser/subList')
}
