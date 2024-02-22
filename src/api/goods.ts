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

export const setFreeGood = (uid: string, isFree: number) => {
  return axios.post('/v1/goods/goodsFree', { goods_uid: uid, is_free: isFree })
}

export const deleteGood = (uid: string) => {
  return axios.post('/v1/goods/goodsDel', { goods_uid: uid })
}
