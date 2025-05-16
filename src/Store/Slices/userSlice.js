import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import.meta.env.baseURL
// const baseURL = import.meta.env.baseURL
// console.log(baseURL)
const token = localStorage.getItem('token');
// Fetch users
export const fetchProfile = createAsyncThunk('fetchUserProfile/UserProfile', async () => {
    if (!token) {
        throw new Error('No token found');
    }
    const res = await fetch("http://localhost:5000/api/auth/profile", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    if (!res.ok) {
        throw new Error('Failed to fetch user data');
    }
    const data = await res.json();
    return data;
});

// Edit user
export const editUserProfile = createAsyncThunk('users/editUser', async ({ updatedUser }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No token found');
    }

    const res = await fetch(`http://localhost:5000/api/auth/profile`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUser),
    });

    if (!res.ok) {
        throw new Error('Failed to update user');
    }

    const data = await res.json();
    return { updatedUser: data };
});

// Delete user
export const deleteUserFromDB = createAsyncThunk('users/deleteUser', async (id) => {
    await fetch(`http://localhost:3000/users/${id}`, { method: 'DELETE' });
    return id;
});

// Login user
export const loginUser = createAsyncThunk('users/login', async (credentials) => {
    console.log(credentials)
    const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST', //http://localhost:5000/api/auth/login
        headers: { 
            'Content-Type': 'application/json'
         },
        body: JSON.stringify(credentials),
    });
    if (!res.ok) {
        throw new Error('Login failed');
    }
    const data = await res.json();
    return data;
});

// Register user
export const registerUser = createAsyncThunk('users/register', async (newUser) => {
    const res = await fetch(`http://localhost:5000/api/auth/register`, {
        method: 'POST',
        headers: { 
            // 'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
         },
        body: JSON.stringify(newUser),
    });
    if (!res.ok) {
        throw new Error('Registration failed');
    }
    const data = await res.json();
    return data;
});

const userSlice = createSlice({
    name: 'userslice',
    initialState: {
        items: {},
        isloading: true,
        user: null, // To store logged-in user
        error: null, // To store login/register errors
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.items = action.payload;
                state.isloading = false;
            })
            .addCase(fetchProfile.pending, (state) => {
                state.isloading = true;
            })
            .addCase(deleteUserFromDB.fulfilled, (state, action) => {
                const id = action.payload;
                state.items = state.items.filter(user => user.id !== id);
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload; 
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.error.message; 
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload; 
                state.error = null;
              })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.error.message; 
            });
    },
});

export default userSlice