//Authentication related controllers
import dotenv from "dotenv"
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

dotenv.config({ path: '../.env' })

export const register = async (req,res) => {
  try {

    const {firstname, lastname, email, password} = req.body

    //Checking if user already exists in the database
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({message: 'User already exists'})
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

    //Store cookies
    const cookieOptions = {
      expiresIn: new Date(Date.now() + 1*24*60*60*1000),
      httpOnly: true //Can only be changed by server not client
    }

    //Send the response and token
    res.status(200).cookie('token', token, cookieOptions).json({
      message: 'User is logged in',
      success: true,
      token,
      user: {firstName: user.firstname, lastName: user.lastname, email: user.email}
    })
  } catch (error) {
    res.status(500).json({message: 'Server error', error})
  }
}

export const logout = (req, res) => {
  res.clearCookie('token')
  res.json({ message: 'Logged out successfully'})
}

