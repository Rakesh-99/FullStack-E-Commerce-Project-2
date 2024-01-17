import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 8000;
import connectDB from './database/connectDB.js';
connectDB();
import userRouter from './routes/userRouter.js';
import error from './middleware/error.js';
import cors from 'cors';







app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user/', userRouter);
app.use(error);






app.listen(PORT, () => {
    console.log(`App is listening at PORT http://localhost:${PORT}`);
});


