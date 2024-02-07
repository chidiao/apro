import axios from 'axios'

export const getGoodsList = () => {
  return axios.get('/v1/goods/goodsList')
}
