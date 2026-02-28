import { Router } from 'express';
const router = Router();
import { login, registerUser } from '../controllers/user.controller.js';
// import { upload } from "../middlewares/multer.js"
// import { isAuth } from '../middlewares/isAuth.middleware.js';


router.route('/login').post(login)
router.post('/register',registerUser);

// router.post('/logout', isAuth, logout)
// router.post('/changePassword', isAuth, changeCurrentPassword)
// router.post('/getCurrentUser', isAuth, getCurrentUser)
// router.post('/updateAccountDetails', isAuth, updateAccountDetails)
// router.post('/getUserChannelProfile/:userName', isAuth, getUserChannelProfile)




export default router
