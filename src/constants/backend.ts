import axios from 'axios'

export const backend = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
})
