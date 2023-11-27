//const { Signup, Login } = require("../Controllers/AuthController");
import express from 'express';
import { Signup, Login } from '../controllers/auth.controller.js';
//import { userVerification } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post("/signup", Signup);
router.post('/login', Login)

//router.post('/', userVerification)

export default router;

/**
import express from 'express'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

router.route('/auth/signin')
  .post(authCtrl.signin)

router.route('/auth/signout')
  .get(authCtrl.signout)

export default router
*/