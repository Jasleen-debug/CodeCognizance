import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {

  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')

  const handleInputChange = (e) => {

    const { name, value } = e.target

    switch (name) {
      case 'firstname':
        setFirstName(value)
        break
      case 'lastname':
        setLastName(value)
        break
      case 'email':
        setEmail(value)
        break
      case 'password':
        setPassword(value)
        break
      default:
        break
    }
  }

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { firstname, lastname, email, password }
    console.log(formData)
    try {
      const response = await axios.post('http://localhost:5000/auth/register', formData)
      console.log('User Registered: ', response.data)
      //Redirect
      navigate('/')
    } catch (error) {
      console.error('Error registering user: ', error)
      setError(error.response ? error.response.data.message : 'Server Error')
    }
  }

  const handleCloseError = () => {
    //Only clear the error state when the error is closed, not the form data
    setError('')
  }

  return (
    <>
    <div className='relative'>
    {error && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded shadow-lg max-w-md mx-auto text-center">
              <h2 className="text-xl font-semibold text-red-600 mb-2">Registration Error</h2>
              <p className="mb-4">{error}</p>
              <button
                  onClick={handleCloseError}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                  Close
              </button>
          </div>
      </div>
      )}
      </div>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Register</h2>

        <form className="space-y-4" onSubmit={handleSubmit} method="POST">

          <div>
            <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">First Name</label>
            <input type="text" id="firstname" name="firstname" className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                   value={firstname}
                   onChange={handleInputChange}
                   required />
          </div>

          <div>
            <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input type="text" id="lastname" name="lastname" className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                   value={lastname}
                   onChange={handleInputChange}
                   required />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" name="email" className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                   autoComplete="email"
                   value={email}
                   onChange={handleInputChange}
                   required />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="password" name="password" className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                   value={password}
                   onChange={handleInputChange}
                   required />
          </div>

          <button type="submit" className="w-full px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Register</button>

        </form>

      </div>
      </div>
      </>
  );
};

export default RegistrationForm;
