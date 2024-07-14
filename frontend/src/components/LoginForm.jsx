//import React from 'react'

const LoginForm = () => {
  return (
    <form >
        <label htmlFor="email">Username:</label>
       {/*  <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required /> */}
        <label htmlFor="password">Password:</label>
        {/* <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required /> */}
        <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm