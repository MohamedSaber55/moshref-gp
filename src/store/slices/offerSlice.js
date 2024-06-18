import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { baseUrl } from '../../utils/baseUrl';
const notify = (msg, type) => toast[type](msg);

const getToken = () => localStorage.getItem("moshToken");

const configWithToken = () => ({
    headers: {
        Authorization: `Bearer ${getToken()}`,
    },
});
// Async thunk for fetching offers
export const getOffers = createAsyncThunk(
    'offers/getOffers',
    async ({ postId }, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${baseUrl}/Offer/GetAllOffersOfPost/${postId}`, configWithToken())
            console.log(data);
            return data
        } catch (error) {
            console.log(error.response);
            notify('Failed to fetch offers', 'error');
            return rejectWithValue(error.response.data);
        }
    }
);
export const addOffer = createAsyncThunk('offers/add', async ({ body }, { rejectWithValue }) => {
    try {
        const formData = new FormData();
        for (const [key, value] of Object.entries(body)) {
            formData.append(key, value);
        }
        const { data } = await axios.post(`${baseUrl}/Offer/AddOffer`, formData, configWithToken())
        notify('offer added successfully', 'success');
        return data
    } catch (error) {
        console.log(error.response);
        notify('Failed to add offer', 'error');
        return rejectWithValue(error.response.data);
    }
})

const offerSlice = createSlice({
    name: 'offers',
    initialState: {
        offers: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOffers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getOffers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.offers = action.payload;
            })
            .addCase(getOffers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default offerSlice.reducer;
