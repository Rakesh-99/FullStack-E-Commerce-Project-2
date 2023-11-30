import userModel from '../model/userModel.js';
import ErrorHandler from '../utils/errorHandler.js';
import asyncErrorHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userTokenModel from '../model/userToken.js';



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
            user: addUser
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

    const matchPassword = await bcrypt.compare(password, user.password)

    if (!matchPassword) {
        return next(new ErrorHandler('Incorrect Password entered!', 401));
    }

    const accessToken = jwt.sign({ _id: user._id }, process.env.JWT_ACCESS_TOKEN, { expiresIn: '7d' });

    const addToken = new userTokenModel({ token: accessToken });
    await addToken.save();

    return res.status(200).json({
        user: {
            name: user.fullname,
            email: user.email,
            location: user.location,
            token: accessToken
        }
    });

});



// Testing || Protected Routes :

export const protectedRoutes = asyncErrorHandler(async (req, res, next) => {

    res.json({ message: 'Protected Routes!' });
})