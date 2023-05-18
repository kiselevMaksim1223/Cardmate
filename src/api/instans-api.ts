import axios from 'axios'

export type ResponseType<T = {}> = {
  data: T
  error?: string
}

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || process.env.REACT_APP_BACK_URL_DEV,
  // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})
