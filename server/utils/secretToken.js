import "dotenv/config.js";
//const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken";
//import * as jwt from 'jsonwebtoken';
//const { Jwt } = pkg;
console.log('jwt', jwt)
const createSecretToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

export default createSecretToken;