import User from "../models/user.model.js";
import "dotenv/config.js";
import createSecretToken from "../utils/secretToken.js";
import bcrypt from 'bcrypt';


const Signup = async (req, res, next) => {
  try {
    let { email, password, username, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return res.json({ message: "An account with this email already exists." });
    }
    if (!username) username = email;
    const user = await User.create({ email, password, username, createdAt });

    /**
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
     */

    res
      .status(201)
      .json({ message: "User registered successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};

const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if(!email || !password ){
      return res.json({message:'All fields are required'})
    }
    const user = await User.findOne({ email });
    
    if(!user){
      return res.json({message:'Email not registered' }) 
    }

    const auth = await bcrypt.compare(password,user.password)

    if (!auth) {
      return res.json({message:'Incorrect password!' }) 
    }

    const token = createSecretToken(user._id);

    if (process.env.NODE_ENV === 'development') {
      res.cookie("token", token, {
        httpOnly: false,
      });
    }

    if (process.env.NODE_ENV === 'production') {
      res.cookie('token', token, {
        httpOnly: true,
        secure: true, // Set to true if using HTTPS
        sameSite: 'none', // Set to 'none' if using cross-site requests
      });
    }
     
     res.status(201).json({ message: "User logged in successfully", success: true });
     next()
  } catch (error) {
    console.error(error);
  }
};

export { Login, Signup };

/**
import User from "../models/user.model.js"
import jwt from "jsonwebtoken"
import { expressjwt } from "express-jwt"

import * as dotenv from "dotenv";
dotenv.config();

const signin = async (req, res) => {
  try {
    let user = await User.findOne({ "email": req.body.email })
    if (!user)
      return res.status(401).json({ error: "User not found" })
    if (!user.authenticate(req.body.password)) {
      return res.status(401).send({ error: "Email and password don't match." + req.body.password })
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
    res.cookie('t', token, { expire: new Date() + 9999 })
    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    })
  } catch (err) {
    return res.status(401).json({ error: "Could not sign in" })
  }
}

const signout = (req, res) => {
  res.clearCookie("t")
  return res.status(200).json({
    message: "signed out"
  })
}

const requireSignin = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: 'auth'
})

const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth
    && req.profile._id == req.auth._id
  if (!(authorized)) {
    return res.status(403).json({
      error: "User is not authorized"
    })
  }

  next()

}

export default { signin, signout, requireSignin, hasAuthorization }
*/