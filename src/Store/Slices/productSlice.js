import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk: fetch product by ID with caching handled in slice
export const fetchProductById = createAsyncThunk(
  'products/fetchById',
  async (productId, { getState, rejectWithValue }) => {
    const { products } = getState();
    if (products.productData[productId]) {
      return products.productData[productId];
    }
    try {
      const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
      return { id: productId, data: response.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Async thunk: fetch products by category, return random subset
export const fetchRandomProductsByCategory = createAsyncThunk(
  'products/fetchByCategory',
  async ({ categoryId, count = 50, teaserId }, { rejectWithValue }) => {
    if (!categoryId) return [];
    try {
      const response = await axios.get(`http://localhost:5000/api/promos/products/${categoryId}`);
      const allProducts = response.data;

      // Pick random unique products
      const selectedProducts = [];
      const takenIndexes = new Set();
      const maxCount = Math.min(count, allProducts.length);

      while (selectedProducts.length < maxCount) {
        const randomIndex = Math.floor(Math.random() * allProducts.length);
        if (!takenIndexes.has(randomIndex)) {
          takenIndexes.add(randomIndex);
          selectedProducts.push(allProducts[randomIndex]);
        }
      }

      return { selectedProducts };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {

    productData: {},      // cached products by id: { id: data }
    categoryProducts: {}, // categoryId -> products array
    loadingProducts: {},  // loading state per productId
    loadingCategory: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch product by ID
      .addCase(fetchProductById.pending, (state, action) => {
        state.loadingProducts[action.meta.arg] = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        const { id, data } = action.payload;
        state.productData[id] = data;
        state.loadingProducts[id] = false;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loadingProducts[action.meta.arg] = false;
        state.error = action.payload;
      })

      // Fetch products by category
      .addCase(fetchRandomProductsByCategory.pending, (state) => {
        state.loadingCategory = true;
      })
      .addCase(fetchRandomProductsByCategory.fulfilled, (state, action) => {
        // We expect an array of products for one category; store keyed by categoryId
        // But categoryId is not returned, so we'll store under a fixed key for now.
        // You can adjust this if passing categoryId in arg.
        state.categoryProducts[action.meta.arg.categoryId] = action.payload.selectedProducts;
        state.loadingCategory = false;
      })
      .addCase(fetchRandomProductsByCategory.rejected, (state, action) => {
        state.loadingCategory = false;
        state.error = action.payload;
      });
  }
});

export default productSlice.reducer;