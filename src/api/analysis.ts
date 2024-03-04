import axios from 'axios'

export const getMainResult = (page = 1, pageSize = 20) => {
  return axios.post<any[]>('/v1/irisAnalysis/mainResult', {
    page,
    page_size: pageSize
  })
}

export const getWholeResult = (page = 1, pageSize = 20) => {
  return axios.post('/v1/irisAnalysis/wholeResult', {
    page,
    page_size: pageSize
  })
}
