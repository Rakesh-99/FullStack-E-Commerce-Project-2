import express from 'express';
const userRouter = express.Router();
import { getAllUser, loginUser, protectedRoutes, registerUser } from '../controller/userController.js';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';



userRouter.get('/', getAllUser)
    .post('/register', registerUser)
    .post('/login', loginUser)
    .get('/protected', requireSignIn, isAdmin, protectedRoutes)





export default userRouter;