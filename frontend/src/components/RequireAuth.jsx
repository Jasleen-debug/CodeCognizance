import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { useEffect, useState} from "react"
import { validateToken, logout } from "../services/authService"

const RequireAuth = () => {
  const { auth,setAuth } = useAuth()
  const location = useLocation()
  const [loading, setLoading] = useState(true)

  //Hydrate on mount or refresh
  useEffect(() => {
    const check = async () => {
      try {
        console.log('in check')
        const response = await validateToken()
        console.log(response)
        if (response.user) {
          console.log('tokn is valid in context')
          setAuth({user: response.user})
        } else {
          console.log('in context not valid token', response)
          await logout()
          setAuth({})
        }
      } catch (error) {
        console.log('in catch')
        await logout()
        setAuth({})
      } finally {
        setLoading(false)
      }
    }
    check()
  }, [setAuth])

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }
  
  if (auth && auth.user) {
    console.log('hen',auth)
    console.log('henbm', auth.user)
    return <Outlet />
  } else {
    console.log('jhrgh',auth)
    return <Navigate to='/login' state={{ from: location }} replace />
  }
}
export default RequireAuth