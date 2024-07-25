import { createContext, useState } from "react"
import PropTypes from 'prop-types'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    loading: true,
    user: null
  })

  return (
    <AuthContext.Provider value={{ auth, setAuth}}>
      {children}
    </AuthContext.Provider>
  )
}

//Define prop-types
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}
