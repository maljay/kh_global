import User from "../models/user.model.js";
import "dotenv/config.js";
//import createSecretToken from "../utils/secretToken.js";
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
      .json({ message: "User registered successfully", success: true });
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

    /**
    const token = createSecretToken(user._id);

    if (process.env.NODE_ENV === 'development') {
      res.cookie("token", token, {
        httpOnly: false,
        domain: "onrender.com",
      });
    }

    if (process.env.NODE_ENV === 'production') {
      res.cookie('token', token, {
        domain: 'kh-global-links.netlify.app',
        path: '/',
        httpOnly: true,
        secure: true, // Set to true if using HTTPS
        sameSite: 'none', // Set to 'none' if using cross-site requests
      });
    }
     */
    const { username } = user;

    res.status(201).json({ message: "User logged in successfully", success: true, username });
    next()
  } catch (error) {
    console.error(error);
  }
};

export { Login, Signup };
