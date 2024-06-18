import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../utils/baseUrl";
const notify = (msg, type) => toast[type](msg);


export const register = createAsyncThunk("user/register", async (body, { rejectWithValue }) => {
    try {
        // Create a FormData object and append each field
        const formData = new FormData();
        formData.append('ConfirmPassword', body.ConfirmPassword);
        formData.append('Email', body.Email);
        formData.append('FName', body.FName);
        formData.append('LName', body.LName);
        formData.append('Password', body.Password);
        formData.append('PhoneNumber', body.PhoneNumber);
        formData.append('RegisteredAs', body.RegisteredAs);
        formData.append('UserName', body.UserName);


        const { data } = await axios.post(`${baseUrl}/Account/Register`, formData);
        if (data == "Check your email to get Confirm code") {
            notify('Now, Check your Email', 'success')
        }
        if (data == "There is Already an Account Created with this Email") {
            notify('There is Already an Account Created with this Email', 'error')
        }
        if (data == "UserName Already Taken") {
            notify('UserName Already Taken', 'error')
        }
        return data;
    } catch (error) {
        // return error.response.data;
        return rejectWithValue(error.response.data);
    }
});
export const confirmEmail = createAsyncThunk("user/confirmEmail ", async (body, { rejectWithValue }) => {
    try {
        const formData = new FormData();
        formData.append('code', body.code);
        formData.append('Email', body.Email);
        const { data } = await axios.post(`${baseUrl}/Account/ConfirmEmail`, formData);
        if (data == "Check your email to get Confirm code") {
            notify('Now, Check your Email', 'success')
        }
        if (data == "Wrong Code Entered") {
            notify('Wrong Code Entered', 'error')
        }
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
export const login = createAsyncThunk("user/login", async (body, { rejectWithValue }) => {
    try {
        const formData = new FormData();
        formData.append('Email', body.email);
        formData.append('Password', body.password);

        const { data } = await axios.post(`${baseUrl}/Account/Login`, formData);
        if (data.token) {
            localStorage.setItem("moshToken", data.token)
            localStorage.setItem("moshProfileId", data.profileId)
            localStorage.setItem("moshUserId", data.userId)
            localStorage.setItem("moshRole", data.roles[0])
        }
        if (typeof data === 'string') {
            if (data.includes("There is no Account with Email")) {
                notify('There is no Account with Email', 'error')
            }
            if (data.includes("Wrong Password!")) {
                notify('Wrong Password!', 'error')
            }
        }
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
export const forgetPass = createAsyncThunk("user/forgetPass", async (email, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${baseUrl}/Account/ForgetPassword/${email}`);
        if (data.includes('Check your email to get Reset Your Password')) {
            notify(data, "success")
        }
        return data;
    } catch (error) {
        if (error?.response?.data.includes("There is no Account with Email")) {
            notify(error?.response?.data, "error")
        }
        return rejectWithValue(error.response.data);
    }
});
export const resetPass = createAsyncThunk("user/resetPass", async (email, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${baseUrl}/Account/ResetPassword`);
        if (data.includes('Check your email to get Reset Your Password')) {
            notify(data, "success")
        }
        return data;
    } catch (error) {
        if (error?.response?.data.includes("Error Code Entered")) {
            notify(error?.response?.data, "error")
        }
        return rejectWithValue(error.response.data);
    }
});

const initialState = {
    message: "",
    role: localStorage.getItem("moshRole") || null,
    users: [],
    loading: false,
    user: null,
    userId: localStorage.getItem("moshUserId") || null,
    profileId: localStorage.getItem("moshProfileId") || null,
    token: localStorage.getItem("moshToken") || null,
    error: null,
    isAuthenticated: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("moshToken")
        },
    },
    extraReducers: (builder) => {
        builder
            // -------------------------------------------------------------
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                if (action.payload?.errors?.length > 0) {
                    state.error = action.payload.errors
                }
                if (action.payload == "User with this email already exists.") {
                    state.error = action.payload
                }
                state.loading = false;
                state.message = action.payload;
                state.user = action.payload.user;
                state.token = localStorage.getItem("moshToken") || action.payload.token;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                if (action.payload == "User with this email already exists.") {
                    state.error = action.payload
                }
                state.error = action.payload
            })
            // --------------------------------login-----------------------------
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                if (typeof data === 'string') {
                    if (action.payload == "Wrong Password!") {
                        state.error = action.payload
                    }
                    if (action.payload.includes("There is no Account with Email ")) {
                        state.error = action.payload
                    }
                }
                state.loading = false;
                state.userId = action.payload.userId;
                state.profileId = action.payload.profileId;
                state.token = action.payload.token;
                state.role = action.payload.roles
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
        // -------------------------------------------------------------
    },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;