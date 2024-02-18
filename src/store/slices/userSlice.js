import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
// import { baseUrl } from '../../utils/baseUrl'


export const login = createAsyncThunk("login", async (userData) => {
    try {
        const { data } = await axios.post(`https://localhost:3000/auth/login`, userData)
        return data
    } catch (error) {
        return error.response.data
    }
})

export const logout = createAsyncThunk("logout", () => {
    localStorage.removeItem("dashToken")
})


const initialState = {
    message: "",
    status: "",
    status_code: "",
    data: {},
    token: localStorage.getItem("dashToken") || null,
    loading: false,
    error: "",
}

const usersSlice = createSlice({
    name: "users",
    initialState,
    extraReducers: (builder) => {
        builder
            // ---------------------------------- login ---------------------------------
            .addCase(login.pending, (state) => {
                state.loading = true
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                console.log(payload);
                state.loading = false
                if (payload.error) {
                    state.error = payload.error
                } else {
                    state.token = payload.data.token
                    localStorage.setItem("dashToken", payload.data.token)
                    state.data = payload.data
                    state.message = payload.message
                    state.statusCode = payload.status_code
                    state.status = payload.status
                }
            })
            .addCase(login.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })
            // ---------------------------------- logout ---------------------------------
            .addCase(logout.pending, (state) => {
                state.loading = true
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false
                state.token = null
            })
            .addCase(logout.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })
    }
})

export default usersSlice.reducer