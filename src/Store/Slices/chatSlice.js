import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFilteredProducts } from './productChatSlice';
// import { fetchFilteredProducts } from './producChattSlice'; // you need to have this in your project

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (message, { dispatch }) => {
    const response = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    console.log(data)
    // Once we receive the category and color, dispatch product fetch
    if (data.category && data.color) {
      dispatch(fetchFilteredProducts(data)); // pass { category, color }
    }

    return data;
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    aiResponse: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.aiResponse = action.payload;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default chatSlice;
