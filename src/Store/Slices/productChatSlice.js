import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const { VITE_API_URL } = import.meta.env;

export const fetchFilteredProducts = createAsyncThunk(
  'products/fetchFilteredProducts',
  async ({ category, color }) => {
    const response = await fetch(
      `${VITE_API_URL}/api/products?category=${category}&color=${color}`
    );
    const allProducts = await response.json();
    console.log(allProducts)
    const groupedByCategory = {};
    for (const product of allProducts) {
      const cat = product.category;
      if (!groupedByCategory[cat]) groupedByCategory[cat] = [];
      groupedByCategory[cat].push(product);
    }

    const result = {};
    for (const [cat, items] of Object.entries(groupedByCategory)) {
      const shuffled = items.sort(() => 0.5 - Math.random());
      result[cat] = shuffled.slice(0, 5);
    }

    return result;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    filtered: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
        state.filtered = action.payload;
        state.loading = false;
      })
      .addCase(fetchFilteredProducts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default productSlice;
