import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';


// Login User : 
export const addLoginUser = createAsyncThunk('authSlice/addLoginUser', async ({ loginData, navigate }, { rejectWithValue }) => {

    try {
        const response = await axios.post(`http://localhost:8000/api/user/login`, loginData);

        if (response.status === 200) {
            toast.success('Login Successful');
            navigate('/');
            return response.data;
        }

    } catch (error) {
        toast.error(error.response.data.message)
        return rejectWithValue(error.response.data.message);
    }

});

// Signup User: 
export const addSignupUser = createAsyncThunk('authSlice/addSignupUser', async ({ registerData, navigate }, { rejectWithValue }) => {

    try {
        const response = await axios.post('http://localhost:8000/api/user/register', registerData);

        if (response.status === 200) {
            toast.success('You have been registered successfully');
            navigate('/login');
            return response.data;
        }
    } catch (error) {
        toast.error(error.response.data.message)
        return rejectWithValue(error.response.data.message);
    }
});

// Logout User:
export const logoutUser = createAsyncThunk('authSlice/logout', async ({ navigate }, { rejectWithValue }) => {

    try {
        const response = await axios.get('http://localhost:8000/api/user/logout');
        if (response.status === 200) {
            toast.success('You have been logged out');
            navigate('/login');
        }
    } catch (error) {
        toast.error(error.response.data.message)
        return rejectWithValue(error.response.data.message);
    }
});




// Forget Password :

export const forgetPassword = createAsyncThunk('auth/forgetPassword', async (emailInfo, { rejectWithValue }) => {
    try {
        const forgetUserPassword = await axios.post('http://localhost:8000/api/user/forgetpassword', emailInfo);
        if (forgetUserPassword.status === 200) {
            toast.success('Reset password link has been set to registered email');
        }
        return forgetUserPassword.data;
    } catch (error) {
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
    }
})



// Reset Password :


// Validating token and id from backend : 
export const validateUser = createAsyncThunk('resetpassword/auth', async ({ id, token, navigate }, { rejectWithValue }) => {

    try {
        const validateUserInfo = await axios.get(`http://localhost:8000/api/user/uservalidate/${id}/${token}`);
        if (validateUserInfo.status === 200) {
            return validateUserInfo.data;
        }
    } catch (error) {
        if (error.response.status === 400) {
            navigate('*');
            toast.error(error.response.data.message);
            return rejectWithValue(error.response.data.message);
        }
        // rejectWithValue(error.response.data.message);
    }
})



// Update Password :

export const updatePassword = createAsyncThunk('updatepassword/auth', async ({ id, token, password, setPassword, navigate }, { rejectWithValue }) => {


    try {
        const updateUserPassword = await axios.post(`http://localhost:8000/api/user/updatepassword/${id}/${token}`, { password });


        if (updateUserPassword.status === 200) {
            toast.success('Your password has been updated');
            setPassword('');

            setTimeout(() => {
                navigate('/login');
            }, 2000);
            
            return updateUserPassword.data;
        }
        return updateUserPassword.data;
    } catch (error) {
        toast.error(error.message.data.response);
        return rejectWithValue(error.response.data.message);
    }
});










const authSlice = createSlice({
    name: 'authSlice',
    initialState: {
        user: null,
        error: null,
        loading: false
    },

    extraReducers: (builder) => {

        builder
            // Login Operation  
            .addCase(addLoginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(addLoginUser.fulfilled, (state, action) => {
                state.loading = false;
                localStorage.setItem('loginInfo', JSON.stringify({ ...action.payload }));
                state.user = action.payload;
            })
            .addCase(addLoginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Signup operation :
            .addCase(addSignupUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(addSignupUser.fulfilled, (state, action) => {
                state.loading = false;
                // state.user = action.payload;
            })
            .addCase(addSignupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //Logout:
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.loading = false;
                localStorage.removeItem('loginInfo');
                state.user = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Forget Password : 
            .addCase(forgetPassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(forgetPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                console.log(action.payload);
            })
            .addCase(forgetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Reset Password / User valid :

            .addCase(validateUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(validateUser.fulfilled, (state, action) => {
                state.loading = false;

            })
            .addCase(validateUser.rejected, (state, action) => {
                state.loading = false;

            })

            // Update Password :

            .addCase(updatePassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.loading = false;
                console.log('updatePass', action.payload);
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.loading = false;
                console.log(action.payload);
            })
    },
});

export default authSlice.reducer;
