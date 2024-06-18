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
// Async thunks
export const addPost = createAsyncThunk("post/addPost", async (body, { rejectWithValue }) => {
    try {
        const formData = new FormData();
        for (const [key, value] of Object.entries(body)) {
            formData.append(key, value);
        }

        // Axios automatically sets the Content-Type header to multipart/form-data when sending FormData
        const { data } = await axios.post(`${baseUrl}/Post/AddPost`, formData, configWithToken());
        console.log(data);
        notify('Post added successfully', 'success');
        return data;
    } catch (error) {
        console.log(error.response);
        notify('Failed to add post', 'error');
        return rejectWithValue(error.response.data);
    }
});

export const searchPostWithTitle = createAsyncThunk("post/searchPostWithTitle", async ({ title }, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${baseUrl}/Post/SearchWithTitle/${title}`, configWithToken());
        console.log(data);
        return data;
    } catch (error) {
        notify('Failed to fetch post', 'error');
        return rejectWithValue(error.response.data);
    }
});
export const getPost = createAsyncThunk("post/getPost", async (id, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${baseUrl}/Post/GetPostwithId/${id}`, configWithToken());
        return data;
    } catch (error) {
        notify('Failed to fetch post', 'error');
        return rejectWithValue(error.response.data);
    }
});

export const getPosts = createAsyncThunk("post/getPosts", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${baseUrl}/Post/GetAllPosts`, configWithToken());
        return data;
    } catch (error) {
        notify('Failed to fetch posts', 'error');
        return rejectWithValue(error.response.data);
    }
});
export const getCategoryPosts = createAsyncThunk("post/getCategoryPosts", async (category, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${baseUrl}/Post/PostWithCategory/${category}`, configWithToken());
        return data;
    } catch (error) {
        // notify('Failed to fetch posts', 'error');
        return rejectWithValue(error.response.data);
    }
});


export const updatePost = createAsyncThunk("post/updatePost", async ({ id, body }, { rejectWithValue }) => {
    try {
        const formData = new FormData();
        Object.entries(body).forEach(([key, value]) => {
            formData.append(key, value);
        });

        const { data } = await axios.put(`${baseUrl}/posts/${id}`, formData, configWithToken());
        notify('Post updated successfully', 'success');
        return data;
    } catch (error) {
        notify('Failed to update post', 'error');
        return rejectWithValue(error.response.data);
    }
});

// Initial state
const initialState = {
    posts: [],
    post: null,
    loading: false,
    error: null,
    message: "",
};

// Create slice
const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Add post
            .addCase(addPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addPost.fulfilled, (state) => {
                state.loading = false;
                // state.posts.push(action.payload);
                state.message = "Post added successfully";
            })
            .addCase(addPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            // Get post
            .addCase(getPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPost.fulfilled, (state, action) => {
                state.loading = false;
                state.post = action.payload;
            })
            .addCase(getPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            // Get posts
            .addCase(getPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            // searchPostWithTitle
            .addCase(searchPostWithTitle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchPostWithTitle.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(searchPostWithTitle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            // Get Category Posts
            .addCase(getCategoryPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCategoryPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(getCategoryPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            // Update post
            .addCase(updatePost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = state.posts.map((post) =>
                    post.id === action.payload.id ? action.payload : post
                );
            })
            .addCase(updatePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            });
    },
});

export default postSlice.reducer;
