//Authentication related controllers
import dotenv from "dotenv"
import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

dotenv.config({ path: '../.env' })

export const register = async (req,res) => {
  try {

    const {firstname, lastname, email, password} = req.body

    //Checking if user already exists in the database
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(409).json({message: 'User with this email already exists'})
    }

    //Hash the password in request body
    const hashedPassword = await bcrypt.hash(password, 10)

    //Create a new user object or instance
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword
    })

    //Save the user to the database
    await newUser.save()

    //Generate a JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    //Respond with the token and user information
    res.status(201).json({token, user: newUser})
  } catch (error) {
    //Handle any errors
    console.log(error)
    res.status(500).json({message:'Server error',error})
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    //Check if the user exists
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({message:'user not found'})
    }

    //Compare the password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({message:'Password is incorrect!'})
    }

    //Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
    //Store JWT token in an HTTP-only cookie
    const cookieOptions = {
      expires: new Date(Date.now() + 1*24*60*60*1000),
      httpOnly: true, //Can only be changed by server not client
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.SAME_SITE
    }
    //https secure: process.env.NODE_ENV === 'production', //// Only true if in production
    //https sameSite: 'none' // none for cross-site

    //Send the response and token in the cookie
    //Sending the token both in an HttpOnly cookie
    //and in the JSON response can potentially reduce the security of our authentication system
    //it was for testing purposes only removing it.node
    res.status(200).cookie('token', token, cookieOptions).json({
      message: 'User is logged in',
      success: true,
      user: {firstName: user.firstname, lastName: user.lastname, email: user.email}
    })
  } catch (error) {
      res.status(500).json({ message: 'Server error', error })
      res.status(400).json({ message: 'Missing username or password', error })
      res.status(401).json({ message: 'Unauthorized', error })
  }
}

export const logout = (req, res) => {
  res.clearCookie('token',{httpOnly:true, sameSite: 'None'})
  res.status(200).json({ message: 'Logged out successfully'})
}

export const checkAuth = async (req, res) => {
  try {
    console.log('Auth check initiated');
    if (!req.user) {
      console.log('User not found in request');
      return res.status(401).json({ message: 'User not authenticated' });
    }
    //userid from middleware ok - remember req.user = decoded.id ok
    const user = await User.findById(req.user).select('-password') //This excludes the password from the response
    console.log('check auth controller',user)
    res.json({ user: {firstName: user.firstname, lastName: user.lastname, email: user.email} })
} catch (error) {
    res.status(500).json({ message: 'Server error', error})
  }
}
