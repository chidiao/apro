import debug from './env'
import { SUCCESS_CODE } from '@/api/interceptor'

export default ({ mock, setup }: { mock?: boolean; setup: () => void }) => {
  if (mock !== false && debug) setup()
}

export const successResponseWrap = (data: unknown) => {
  return {
    data,
    status: 'ok',
    msg: '请求成功',
    code: SUCCESS_CODE
  }
}

export const failResponseWrap = (data: unknown, msg: string, code = 50000) => {
  return {
    data,
    status: 'fail',
    msg,
    code
  }
}
