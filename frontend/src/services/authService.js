import axios from 'axios'

const REGISTER_URL = 'http://localhost:5000/auth/register'
const LOGIN_URL = 'http://localhost:5000/auth/login'
const LOGOUT_URL = 'http://localhost:5000/auth/logout'
const CHECKAUTH_URL = 'http://localhost:5000/auth/checkAuth'

const axios_options = { headers: { 'Content-Type': 'application/json' }, withCredentials: true}

export const register = async (formData) => {
  const response = await axios.post(REGISTER_URL, JSON.stringify(formData), axios_options)
  return response.data
}

export const login = async (formData) => {
  const response = await axios.post(LOGIN_URL, JSON.stringify(formData), axios_options)
  console.log('login',response)
  return response.data
}

export const validateToken = async () => {
  try {
    const response = await axios.get(CHECKAUTH_URL, axios_options)
    console.log('validate token',response)
    return response.data
  } catch (error) {
    console.log('catch in servce',error)
  }

}

export const logout = async () => {
  await axios.post(LOGOUT_URL, {}, { withCredentials: true })
}
