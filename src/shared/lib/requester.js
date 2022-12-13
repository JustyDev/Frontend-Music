import { API_URL } from '../config/config'

export const requester = (url, data, method = 'POST') => fetch(API_URL + url, {
  method: method,
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})