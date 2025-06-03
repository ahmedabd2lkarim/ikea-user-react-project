import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const { VITE_API_URL } = import.meta.env;

export const fetchCart = createAsyncThunk("fetchCart", async () => {
  const res = await fetch(`${VITE_API_URL}/api/cart/showMyCart`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const data = await res.json();


  const productsRequests = data[0].cartItems.map(async (item) => {
    try {
      const productRes = await fetch(
        `${VITE_API_URL}/api/products/${item.prdID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const product = await productRes.json();

      if (item.variantId) {
        const variant = product.variants.find((v) => v._id === item.variantId);
        if (variant) {
          return {
            ...variant,
            _id: variant._id,
            mainPrdId: product._id,
            isVariant: true,
            variantId: variant._id,
            quantity: item.quantity,
            mainProductName: product.name,
            categoryName: product.categoryName,
          };
        }
      } else {
        return {
          ...product,
          isVariant: false,
          variantId: null,
          quantity: item.quantity,
        };
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      return null;
    }
  });

  const products = await Promise.all(productsRequests);
  const validProducts = products.filter((p) => p !== null);
console.log(data[0])
  return {
    ...data[0],
    cartItems: validProducts,
  };
});

function calculateTotal(cartItems) {
  const total = cartItems.reduce(
    (acc, item) => acc + item.price.currentPrice * item.quantity,
    0
  );
  return total;
}

function authFetch(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      ...(options.headers || {}),
    },
  });
}

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    items:[],
    isLoading: true,
  },
  reducers: {
    decreaseQ(state, action) {
      const { itemId, isVariant, mainPrdId } = action.payload;

      const item = state.items.cartItems.find((item) => {
        if (isVariant) {
          return item.variantId === itemId && item.mainPrdId === mainPrdId;
        } else {
          return item._id === itemId && !item.isVariant;
        }
      });

      if (item && item.quantity > 1) {
        item.quantity -= 1;

        authFetch(`${VITE_API_URL}/api/cart/cartOP`, {
          method: "PATCH",
          body: JSON.stringify({
            prdID: {
              prdID: isVariant ? mainPrdId : itemId,
              variantId: isVariant ? itemId : null,
            },
            quantity: -1,
          }),
        });

        state.items.total = calculateTotal(state.items.cartItems);
      }
    },

    increaseQ(state, action) {
      const { itemId, isVariant, mainPrdId } = action.payload;

      const item = state.items.cartItems.find((item) => {
        if (isVariant) {
          return item.variantId === itemId && item.mainPrdId === mainPrdId;
        } else {
          return item._id === itemId && !item.isVariant;
        }
      });

      if (item) {
        item.quantity += 1;

        authFetch(`${VITE_API_URL}/api/cart/cartOP`, {
          method: "PATCH",
          body: JSON.stringify({
            prdID: {
              prdID: isVariant ? mainPrdId : itemId,
              variantId: isVariant ? itemId : null,
            },
            quantity: 1,
          }),
        });

        state.items.total = calculateTotal(state.items.cartItems);
      }
    },

    deleteItem(state, action) {
      const { itemId, isVariant, mainPrdId } = action.payload;

      const item = state.items.cartItems.find((item) => {
        if (isVariant) {
          return item.variantId === itemId && item.mainPrdId === mainPrdId;
        } else {
          return item._id === itemId && !item.isVariant;
        }
      });

      if (item) {
        authFetch(`${VITE_API_URL}/api/cart/cartOP`, {
          method: "PATCH",
          body: JSON.stringify({
            prdID: {
              prdID: isVariant ? mainPrdId : itemId,
              variantId: isVariant ? itemId : null,
            },
            quantity: -item.quantity,
          }),
        });

        state.items.cartItems = state.items.cartItems.filter((cartItem) => {
          if (isVariant) {
            return !(
              cartItem.variantId === itemId && cartItem.mainPrdId === mainPrdId
            );
          } else {
            return !(cartItem._id === itemId && !cartItem.isVariant);
          }
        });

        state.items.total = calculateTotal(state.items.cartItems);

        if (state.items.cartItems.length === 0) {
          state.items = [];
        }
      }
    },

    deleteAllOrder(state, action) {
      authFetch(`${VITE_API_URL}/api/cart/${state.items._id}`, {
        method: "DELETE",
      });
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCart.rejected, (state) => {
      state.isLoading = false;
      state.items = [];
    });
  },
});

export const { decreaseQ, increaseQ, deleteItem, deleteAllOrder } =
  cartSlice.actions;
export default cartSlice;
