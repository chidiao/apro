import axios from 'axios'

export const uploadPicture = (file: any) => {
  return axios.post('/v1/upload/picture', {
    folder: 'goods',
    file
  })
}
