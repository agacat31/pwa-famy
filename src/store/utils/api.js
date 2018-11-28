import axios from 'axios'
import store from '@/store'

axios.defaults.headers.common.Authorization = 'Bearer ' + store.getters.token
axios.defaults.baseURL = process.env.API_BASE_URL

const REQUEST_TOKEN_URL = 'user/login'
const GET_USERS_URL = (paginate) => `users?_page=${paginate.page}&_limit=${paginate.limit}&_sort=${paginate.sort}&_order=${paginate.order}&q=${paginate.filter}`
const GET_USER_URL = (id) => `user/${id}`

export function login(credentials) {
  return axios.post(REQUEST_TOKEN_URL, {
    email: credentials.email,
    password: credentials.password
  })
}

export function getUsers(paginate) {
  return axios.get(GET_USERS_URL(paginate))
}

export function getUser(id) {
  return axios.get(GET_USER_URL(id))
}