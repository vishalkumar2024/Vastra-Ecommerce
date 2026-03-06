import { Router } from 'express';
const router = Router();
import { login, registerUser, logout } from '../controllers/user.controller.js';
import { isAuth } from '../Middleware/isAuth.middleware.js';


router.route('/login').post(login)
router.post('/logout', isAuth, logout)
router.post('/signup',registerUser);

// router.post('/getCurrentUser', isAuth, getCurrentUser)
// router.post('/updateAccountDetails', isAuth, updateAccountDetails)
// router.post('/getUserChannelProfile/:userName', isAuth, getUserChannelProfile)

export default router
