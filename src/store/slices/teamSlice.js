import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../utils/baseUrl";

const notify = (msg, type) => toast[type](msg);

const getToken = () => localStorage.getItem("moshToken");

const configWithToken = () => ({
    headers: {
        Authorization: `Bearer ${getToken()}`,
    },
});
export const getTeamMembers = createAsyncThunk("team/getTeamMembers", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${baseUrl}/Contact/GetTeamMembers`, configWithToken());
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const addTeamMember = createAsyncThunk("team/addTeamMember", async (body, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${baseUrl}/Contact/AddContact`, body, configWithToken());
        notify('Team created successfully', 'success');
        return data;
    } catch (error) {
        notify('Failed to create team', 'error');
        return rejectWithValue(error.response.data);
    }
});

export const updateTeam = createAsyncThunk("team/updateTeam", async (body, { rejectWithValue }) => {
    try {
        const { data } = await axios.put(`${baseUrl}/Team/${body.id}`, body);
        notify('Team updated successfully', 'success');
        return data;
    } catch (error) {
        notify('Failed to update team', 'error');
        return rejectWithValue(error.response.data);
    }
});

export const deleteTeam = createAsyncThunk("team/deleteTeam", async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`${baseUrl}/Team/${id}`);
        notify('Team deleted successfully', 'success');
        return id;
    } catch (error) {
        notify('Failed to delete team', 'error');
        return rejectWithValue(error.response.data);
    }
});
const initialState = {
    team: [],
    member: {},
    message: "",
    loading: false,
    error: null,
};

const teamSlice = createSlice({
    name: "team",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTeamMembers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTeamMembers.fulfilled, (state, action) => {
                state.loading = false;
                state.team = action.payload;
            })
            .addCase(getTeamMembers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addTeamMember.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addTeamMember.fulfilled, (state) => {
                state.loading = false;
                // state.team.push(action.payload);
            })
            .addCase(addTeamMember.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateTeam.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTeam.fulfilled, (state) => {
                state.loading = false;
                // const index = state.team.findIndex(team => team.id === action.payload.id);
                // if (index !== -1) {
                // state.teams[index] = action.payload;
                // }
            })
            .addCase(updateTeam.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteTeam.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTeam.fulfilled, (state) => {
                state.loading = false;
                // state.team = state.teams.filter(team => team.id !== action.payload);
            })
            .addCase(deleteTeam.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default teamSlice.reducer;
