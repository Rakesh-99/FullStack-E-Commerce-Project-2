import userModel from '../model/userModel.js';
import ErrorHandler from '../utils/errorHandler.js';
import asyncErrorHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer';



// Nodemailer transport

const transport = nodemailer.createTransport({

    service: 'gmail',
    auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD
    }
})



// GET || Get all users : 

export const getAllUser = asyncErrorHandler(async (req, res, next) => {

    const user = await userModel.find();
    if (user.length === 0) {
        return next(new ErrorHandler('No user found', 400));
    } else {
        return res.status(200).json({ success: true, message: 'User has been fetched', user: user });
    }
});


// POST || Register User : 
export const registerUser = asyncErrorHandler(async (req, res, next) => {


    const { fullname, email, password, location } = req.body;

    const emailExist = await userModel.findOne({ email: email });
    const genSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, genSalt);

    if (emailExist) {
        return next(new ErrorHandler('Email is already registered!', 400));
    } else {
        const addUser = new userModel({ fullname, email, password: hashedPassword, location });
        await addUser.save();

        return res.status(200).json({
            success: true,
            message: 'User has been registered',
            location: location,
            user: addUser,
        });
    };

});

// post || Login User :

export const loginUser = asyncErrorHandler(async (req, res, next) => {

    const { email, password } = req.body;

    const user = await userModel.findOne({ email: email });

    if (!user) {
        return next(new ErrorHandler('User is not registered!', 400));
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (matchPassword) {
        const secretKey = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // const token = new userTokenModel({
        //     token: secretKey
        // });
        // await token.save();

        const setToken = await userModel.findByIdAndUpdate({ _id: user._id }, { token: secretKey }, { new: true })

        if (setToken) {
            return res.status(200).json({
                user: {
                    success: true,
                    message: 'Login success',
                    role: user.role,
                    fullname: user.fullname,
                    email: user.email,
                    location: user.location,
                    token: secretKey,
                }
            })
        }

    } else {
        return next(new ErrorHandler('Password does not match!', 401));
    }
});


// Logout user : 
export const logoutUser = asyncErrorHandler(async (req, res, next) => {

    return res.status(200).json({ success: true, message: 'User has been logged out!' });
});



// Forget Password :

export const forgetPassword = asyncErrorHandler(async (req, res, next) => {

    const { email } = req.body;
    const user = await userModel.findOne({ email: email });

    if (!user) {
        return next(new ErrorHandler('User is not found!', 401));
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    const setToken = await userModel.findByIdAndUpdate({ _id: user._id }, { verifyToken: token }, { new: true });

    if (setToken) {

        const mailOptions = {
            from: process.env.USER,
            to: email,
            subject: 'Click to reset your password',
            text: `This link is valid for 2 minutes http://localhost:3000/uservalidate/${user?.id}/${setToken.verifyToken}`
        }

        // Sending verification mail for reset Password :

        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return next(new ErrorHandler(error), 400);
            } else {
                console.log(info.response);
                return res.status(200).json({ message: 'Reset password link has been sent to you Email' });
            }
        })
    }
});





export const validateUser = asyncErrorHandler(async (req, res, next) => {

    const { id, token } = req.params;

    const match = await userModel.findOne({ _id: id, verifyToken: token });

    const isValid = jwt.verify(token, process.env.JWT_SECRET);

    if (match && isValid._id) {
        return res.status(200).json({ message: 'User is verified', user: match });
    } else {
        return next(new ErrorHandler('Invalid user or Link is expired!', 400));
    }
});


export const updatePassword = asyncErrorHandler(async (req, res, next) => {

    const { id, token } = req.params;
    const { password } = req.body;

    const isUserValid = await userModel.findOne({ _id: id, verifyToken: token });

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    if (isUserValid && verifyToken) {

        const genSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, genSalt);

        await userModel.findByIdAndUpdate({ _id: id }, { password: hashedPassword });

        return res.status(200).json({ message: 'Your Password has been reset successfully' })

    } else {
        return next(new ErrorHandler(`Couldn't update the password! Invalid user or link is expired!`));
    }
});
















// Testing || Protected Routes :

export const protectedRoutes = asyncErrorHandler(async (req, res, next) => {

    res.json({ message: 'Protected Routes!' });
})