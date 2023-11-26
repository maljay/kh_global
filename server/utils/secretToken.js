import "dotenv/config.js";
import jwt from "jsonwebtoken";

const createSecretToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

export default createSecretToken;