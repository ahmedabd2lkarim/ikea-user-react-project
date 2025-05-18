import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const getAuthToken = () => localStorage.getItem('token');

export const fetchFavourites = createAsyncThunk(
    'createUpdateList/fetchFavourites',
    async (_, thunkAPI) => {
        const token = getAuthToken();
        try {
            const response = await fetch('http://localhost:5000/api/favourites', {
                headers: {
                    Authorization: `${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch favourites');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const createList = createAsyncThunk(
    'favourite/createList',
    async (listObject, thunkAPI) => {
        const token = getAuthToken();
        try {
            const response = await fetch('http://localhost:5000/api/favourites/add-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`,
                },
                body: JSON.stringify(listObject),
            });

            if (!response.ok) {
                throw new Error('Failed to create list');
            }

            const data = await response.json();

            // Auto-refresh the lists
            thunkAPI.dispatch(fetchFavourites());

            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const updateList = createAsyncThunk(
    'favourite/updateList',
    async ({ id, name }, thunkAPI) => {
        const token = getAuthToken();
        try {
            const response = await fetch('http://localhost:5000/api/favourites/rename-list', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`,
                },
                body: JSON.stringify({ listId: id, newName: name }),
            });

            if (!response.ok) {
                throw new Error('Failed to update list');
            }

            const data = await response.json();

            // Auto-refresh the lists
            thunkAPI.dispatch(fetchFavourites());

            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const deleteList = createAsyncThunk(
    'favourite/deleteList',
    async (listId, thunkAPI) => {
        const token = getAuthToken();

        try {
            const response = await fetch(`http://localhost:5000/api/favourites/delete-list/${listId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete list');
            }

            // Auto-refresh the lists
            thunkAPI.dispatch(fetchFavourites());
            console.log(listId);
            return listId;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const deleteProductFromList = createAsyncThunk(
    'favourite/deleteProductFromList',
    async ({ listId, productId }, thunkAPI) => {
        const token = getAuthToken();
        try {
            const response = await fetch('http://localhost:5000/api/favourites/remove-product', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`,
                },
                body: JSON.stringify({ listId, productId }),
            });

            if (!response.ok) throw new Error('Failed to delete product');

            thunkAPI.dispatch(fetchFavourites());
            return { listId, productId };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);



const createUpdateListSlice = createSlice({
    name: 'createUpdateList',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
        snackbarMessage: "",
        snackbarSeverity: "success",
    },
    reducers: {
        setSnackbarMessage: (state, action) => {
            state.snackbarMessage = action.payload.message;
            state.snackbarSeverity = action.payload.severity || "success";
        },
        clearSnackbarMessage: (state) => {
            state.snackbarMessage = "";
            state.snackbarSeverity = "success";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavourites.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchFavourites.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchFavourites.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(createList.fulfilled, (state, action) => {
                if (state.items && state.items.lists) {
                    state.items.lists.push(action.payload);
                } else if (state.items === null) {
                    state.items = { lists: [action.payload] };
                }
                state.snackbarMessage = 'List created successfully....';
            })
            .addCase(updateList.fulfilled, (state, action) => {
                if (state.items && state.items.lists) {
                    const index = state.items.lists.findIndex(
                        (list) => list._id === action.payload._id
                    );
                    if (index !== -1) {
                        state.items.lists[index] = action.payload;
                    }
                }
                state.snackbarMessage = 'List name updated successfully....';
            })
            .addCase(deleteList.fulfilled, (state, action) => {
                if (state.items && state.items.lists) {
                    state.items.lists = state.items.lists.filter((list) => list._id !== action.payload);
                }
                state.snackbarMessage = 'List deleted successfully....';
            })
            .addCase(deleteProductFromList.fulfilled, (state, action) => {
                const { listId, productId } = action.payload;
                const list = state.items.lists.find((l) => l._id === listId);
                if (list) {
                    list.items = list.items.filter((item) => item._id !== productId);
                }
                state.snackbarMessage = 'Product deleted successfully.....';
            })


            .addMatcher(
                (action) =>
                    action.type.endsWith('/rejected') &&
                    (action.type.startsWith('favourite/createList') ||
                        action.type.startsWith('favourite/updateList')),
                (state, action) => {
                    state.snackbarMessage = action.payload || 'An error occurred';
                }
            );
    },
});

export const selectListById = (state, id) =>
    state.createUpdateList.items?.lists?.find((list) => list._id === id);

export const { clearSnackbarMessage, setSnackbarMessage } = createUpdateListSlice.actions;

export default createUpdateListSlice.reducer;
