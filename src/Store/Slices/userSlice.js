import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import.meta.env.baseURL
// const baseURL = import.meta.env.baseURL
// console.log(baseURL)
const token = localStorage.getItem('token');
// Fetch users
const fetchData = async () => {
    const res = await fetch("http://localhost:3000/users");
    const data = await res.json();
    return data;
};
export const fetchUsers = createAsyncThunk('fetchData/Users', fetchData);



// Edit user
export const editUserInDB = createAsyncThunk('users/editUser', async ({ id, updatedUser }) => {
    const res = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
    });
    const data = await res.json();
    return { id, updatedUser: data };
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
            'Authorization': `Bearer ${token}`,
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
        items: [],
        isloading: true,
        user: null, // To store logged-in user
        error: null, // To store login/register errors
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.items = action.payload;
                state.isloading = false;
            })
            .addCase(fetchUsers.pending, (state) => {
                state.isloading = true;
            })
            .addCase(editUserInDB.fulfilled, (state, action) => {
                const { id, updatedUser } = action.payload;
                const index = state.items.findIndex(user => user.id === id);
                if (index !== -1) {
                    state.items[index] = { ...state.items[index], ...updatedUser };
                }
            })
            .addCase(deleteUserFromDB.fulfilled, (state, action) => {
                const id = action.payload;
                state.items = state.items.filter(user => user.id !== id);
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload; // Store logged-in user data
                state.error = null; // Clear any previous errors
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.error.message; // Store login error
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.items.push(action.payload); // Add new user to the list
                state.error = null; // Clear any previous errors
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.error.message; // Store registration error
            });
    },
});

export default userSlice