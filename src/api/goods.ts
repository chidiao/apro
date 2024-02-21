import axios from 'axios'

export const getGoodsList = () => {
  return axios.get('/v1/goods/goodsList')
}

export const getGoodDetail = (uid: string) => {
  return axios.post('/v1/goods/goodsDetail', { goods_uid: uid })
}

export const addGood = (form: any) => {
  return axios.post('/v1/goods/goodsAdd', form)
}

export const editGood = (form: any) => {
  return axios.post('/v1/goods/goodsEdit', form)
}

export const deleteGood = (uid: string) => {
  return axios.post('/v1/goods/goodsDel', { goods_uid: uid })
}
