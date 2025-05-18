// src/redux/slices/homeSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch teasers for a category (e.g., "home")
export const fetchTeaser = createAsyncThunk(
  "home/fetchTeaser",
  async (category) => {
    // You were using a custom hook useFetchTeaser; here we simulate fetch logic
    // Replace this with your actual API call if needed
    const response = await fetch(`http://localhost:5000/api/teasers/${category}`);
    const data = await response.json();
    return data;
  }
);

// Async thunk to fetch products by categoryId
export const fetchProductsByCategory = createAsyncThunk(
  "home/fetchProductsByCategory",
  async (categoryIds) => {
    const results = {};

    await Promise.all(
      Object.entries(categoryIds).map(async ([key, catId]) => {
        try {
          const res = await fetch(`http://localhost:5000/api/promos/products/${catId}`);
          const data = await res.json();
          console.log(`Fetched products for ${key}:`, data);

          let products = data;
          if (key === "lowerPrices") {
            products = products.filter((p) => p.price?.discounted);
          } else {
            products = products.filter((p) => !p.price?.discounted);
          }

          results[key] = {
            deal: key,
            products,
          };
        } catch (error) {
          console.error(`Error fetching products for ${key}:`, error);
          results[key] = { deal: key, products: [] };
        }
      })
    );

    console.log("Final results from thunk:", results);
    return results;
  }
);

const initialState = {
  teaserData: null,
  loadingTeaser: false,
  teaserError: null,

  categorizedProducts: {},
  loadingProducts: false,
  productsError: null,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    clearHomeState(state) {
      state.teaserData = null;
      state.loadingTeaser = false;
      state.teaserError = null;
      state.categorizedProducts = {};
      state.loadingProducts = false;
      state.productsError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch teaser
      .addCase(fetchTeaser.pending, (state) => {
        state.loadingTeaser = true;
        state.teaserError = null;
      })
      .addCase(fetchTeaser.fulfilled, (state, action) => {
        state.loadingTeaser = false;
        state.teaserData = action.payload;
      })
      .addCase(fetchTeaser.rejected, (state, action) => {
        state.loadingTeaser = false;
        state.teaserError = action.error.message;
      })

      // Fetch products by category
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loadingProducts = true;
        state.productsError = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loadingProducts = false;
        state.categorizedProducts = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loadingProducts = false;
        state.productsError = action.error.message;
      });
  },
});

export const { clearHomeState } = homeSlice.actions;
export default homeSlice.reducer;
