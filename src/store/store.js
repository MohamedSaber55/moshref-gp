
import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import postSlice from './slices/postSlice';
import teamSlice from "./slices/teamSlice"
import offerSlice from './slices/offerSlice';
const store = configureStore({
    reducer: {
        user: userSlice,
        post: postSlice,
        team: teamSlice,
        offer: offerSlice
    },
});

export default store;
