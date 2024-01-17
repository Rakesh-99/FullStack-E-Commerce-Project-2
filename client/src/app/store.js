import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/authSlice';


const store = configureStore({
    reducer: { app: authSlice },
    
});


export default store;