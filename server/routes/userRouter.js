import express from 'express';
const userRouter = express.Router();
import { getAllUser, loginUser, logoutUser, protectedRoutes, registerUser, forgetPassword, validateUser, updatePassword } from '../controller/userController.js';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';




userRouter.get('/', getAllUser)
    .post('/register', registerUser)
    .post('/login', loginUser)
    .get('/protected', requireSignIn, isAdmin, protectedRoutes)
    .get('/logout', logoutUser)
    .post('/forgetpassword', forgetPassword)
    .get('/uservalidate/:id/:token', validateUser)
    .post('/updatepassword/:id/:token', updatePassword)





export default userRouter;