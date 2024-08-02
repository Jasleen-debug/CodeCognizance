import axios from 'axios'

const axios_options = { headers: { 'Content-Type': 'application/json' }, withCredentials: true }

// Fetch all submissions
export const getSubmissions = async () => {
  const GET_SUBMISSIONS_URL = 'http://localhost:5000/submissions'
  const response = await axios.get(GET_SUBMISSIONS_URL, axios_options)
  console.log('I am here in sub service')
  console.log(response.data)
  return response.data
}



