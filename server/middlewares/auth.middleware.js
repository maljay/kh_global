import User from "../models/user.model.js";
//require("dotenv").config();
import "dotenv/config.js";
//const jwt = require("jsonwebtoken");
import jwt from 'jsonwebtoken';
//const { Jwt } = pkg;

export const userVerification = (req, res) => {
  const token = req.cookies.token
  if (!token) {
    return res.json({ status: false })
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) {
     return res.json({ status: false })
    } else {
      const user = await User.findById(data.id)
      if (user) return res.json({ status: true, user: user.username })
      else return res.json({ status: false })
    }
  })
}