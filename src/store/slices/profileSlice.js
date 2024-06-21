import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../utils/baseUrl";

const notify = (msg, type) => toast[type](msg);

const getToken = () => localStorage.getItem("moshToken");
const getProfile = () => localStorage.getItem("moshProfileId");

const configWithToken = () => ({
    headers: {
        Authorization: `Bearer ${getToken()}`,
    },
});
export const getUserProfile = createAsyncThunk("profile/getUserProfile", async (profileId, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${baseUrl}/Profile/ProfileData/${profileId || getProfile()}`, configWithToken());
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        notify("error get profile", "error")
        return rejectWithValue(error.response.data);
    }
});

const initialState = {
    profile: {},
    message: "",
    loading: false,
    error: null,
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                console.log(action.payload);
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default profileSlice.reducer;
