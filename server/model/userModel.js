import mongoose from "mongoose";





const userSchema = new mongoose.Schema({

    fullname: {
        type: String,
        required: [true, 'Full Name filled is required !'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: [7, 'Password can not be less than 7 char!']
    },
    location: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        default: 0
    },
    // This token is for verifying user
    token: {
        type: String,
    },
    // This token works when user forget their password 
    verifyToken: {
        type: String,
    }
},
    { timestamps: true }
);


const userModel = mongoose.model('User', userSchema);


export default userModel;