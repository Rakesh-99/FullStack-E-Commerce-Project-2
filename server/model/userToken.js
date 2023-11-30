import mongoose from "mongoose";




const userTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    }
});


const userTokenModel = mongoose.model('userToken', userTokenSchema);
export default userTokenModel;