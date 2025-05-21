import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCategoryIntro = createAsyncThunk(
  'category/fetchIntro',
  async (categoryId) => {
    const res = await axios.get(`http://localhost:5000/api/intros/${categoryId}`);
    return res.data;
  }
);

export const fetchCategoryProducts = createAsyncThunk(
  'category/fetchProducts',
  async (categoryId) => {
    const res = await axios.get(`http://localhost:5000/api/promos/products/${categoryId}`);
    return res.data || [];
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    intro: null,
    introLoading: false,
    products: [],
    productsLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryIntro.pending, (state) => {
        state.introLoading = true;
        state.intro = null;
      })
      .addCase(fetchCategoryIntro.fulfilled, (state, action) => {
        state.intro = action.payload;
        state.introLoading = false;
      })
      .addCase(fetchCategoryIntro.rejected, (state, action) => {
        state.introLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCategoryProducts.pending, (state) => {
        state.productsLoading = true;
        state.products = [];
      })
      .addCase(fetchCategoryProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.productsLoading = false;
      })
      .addCase(fetchCategoryProducts.rejected, (state, action) => {
        state.productsLoading = false;
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
