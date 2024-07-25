import axios from 'axios';

const REGISTER_URL = 'http://localhost:5000/auth/register'
const LOGIN_URL = 'http://localhost:5000/auth/login'
const LOGOUT_URL = 'http://localhost:5000/auth/logout'

const axios_options = { headers: { 'Content-Type': 'application/json' }, withCredentials: true}

export const register = async (formData) => {
  const response = await axios.post(REGISTER_URL, JSON.stringify(formData), axios_options)
  return response.data;
};

export const login = async (formData) => {
  const response = await axios.post(LOGIN_URL, formData,{ withCredentials:true })
  return response.data;
};

export const logout = async () => {
  await axios.post(LOGOUT_URL, {}, { withCredentials: true });
};

export const checkAuth = async () => {
  console.log("Sending checkAuth request");
  const response = await axios.get('http://localhost:5000/auth/checkAuth', { withCredentials: true })
  console.log("CheckAuth Response:", response.data);
  return response.data;
};