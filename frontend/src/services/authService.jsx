import axios from 'axios';

export const register = async (formData) => {
  const response = await axios.post('http://localhost:5000/auth/register', formData);
  return response.data;
};

export const login = async (formData) => {
  const response = await axios.post('http://localhost:5000/auth/login', formData,{ withCredentials:true });
  return response.data;
};

export const logout = async () => {
  await axios.post('http://localhost:5000/auth/logout', {}, { withCredentials: true });
};

export const checkAuth = async () => {
  console.log("Sending checkAuth request");
  const response = await axios.get('http://localhost:5000/auth/checkAuth', { withCredentials: true });
  console.log("CheckAuth Response:", response.data);
  return response.data;
};