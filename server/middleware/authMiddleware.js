import asyncErrorHandler from "express-async-handler";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import ErrorHandler from "../utils/errorHandler.js";
import userModel from "../model/userModel.js";
dotenv.config();





// Middleware for checking if user has the token or not : 
export const requireSignIn = asyncErrorHandler(async (req, res, next) => {

    const verifyUser = jwt.verify(req.headers.authorization, process.env.JWT_ACCESS_TOKEN);
    req.user = verifyUser;
    next();

});



// Validating if the user is admin or not : 
export const isAdmin = asyncErrorHandler(async (req, res, next) => {

    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
        return next(new ErrorHandler('Unauthorized access!', 401));
    } else {
        next();
    }
})