import { createContext, useState, useEffect } from "react"
import PropTypes from 'prop-types'
import {login as loginService, logout as logoutService, checkAuth as checkAuthService} from '../services/authService'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    loading: true,
    user: null
  })


  const login = async (formData) => {
    try {
      const response = await loginService(formData)
      setAuth({
        isAuthenticated: true,
        loading: false,
        user: response.data.user
      })
    } catch (error) {
      console.error('Login error: ', error)
    }
  }

  const logout = async () => {
    try {
      await logoutService()
      setAuth({
        isAuthenticated: false,
        loading: false,
        user: null
      })
    } catch (error) {
        console.error('Logout error: ', error)
    }
  }

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await checkAuthService()
        setAuth({
          isAuthenticated: true,
          loading: false,
          user: response.data.user
        })
      } catch (error) {
        setAuth({
          isAuthenticated: false,
          loading: false,
          user: null
        })
      }
    }
    checkAuth()
  },[])

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

//Define prop-types
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}
