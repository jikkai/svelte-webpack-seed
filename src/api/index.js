import Axios from 'axios'

const axios = Axios.create({
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  baseURL: ''
})

const API = {}

export default API
