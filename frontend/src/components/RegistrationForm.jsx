//import React from 'react'

const RegistrationForm = () => {
  return (
    <form > {/*onSubmit={handleSubmit} */}
      <div>
        <label htmlFor="firstname">Firstname:</label>
        <input type="text" id="firstname" name="firstname" required />
      </div>
      <div>
        <label htmlFor="lastname">Lastname:</label>
        <input type="text" id="lastname" name="lastname" required />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />
      </div>
      <button type="submit">Register</button>
    </form>
  )
}

export default RegistrationForm