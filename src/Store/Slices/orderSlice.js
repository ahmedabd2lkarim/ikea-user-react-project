import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const { VITE_API_URL } = import.meta.env;

export const fetchOrders = createAsyncThunk("fetchOrders", async () => {
  const res = await fetch(`${VITE_API_URL}/api/orders/showAllMyOrders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  let data = await res.json();

  data = data.map(async (order) => {
    return {
      ...order,
      orderItems: await Promise.all(
        order.orderItems.map(async (item) => {
          try {
            let product = await fetch(
              `${VITE_API_URL}/api/products/${item.prdID}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            product = await product.json();

            if (item.variantId) {
              const variant = product.variants.find(
                (v) => v._id === item.variantId
              );
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
                  originalProduct: product,
                };
              } else {
                console.warn(
                  `Variant ${item.variantId} not found for product ${item.prdID}`
                );
                return {
                  ...product,
                  isVariant: false,
                  variantId: null,
                  quantity: item.quantity,
                  variantNotFound: true, 
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
            console.error("Error fetching product for order item:", error);
            return {
              _id: item.prdID,
              name: "Product unavailable",
              quantity: item.quantity,
              price: { currentPrice: 0 },
              images: [],
              isVariant: !!item.variantId,
              variantId: item.variantId || null,
              error: true,
            };
          }
        })
      ),
    };
  });

  data = await Promise.all(data);
  return data;
});

const orderSlice = createSlice({
  name: "orderSlice",
  initialState: {
    items: [],
    isLoading: true,
    error: null,
  },
  reducers: {
    cancelOrder(state, action) {
      try {
        fetch(`${VITE_API_URL}/api/orders/cancel/${action.payload}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const orderIndex = state.items.findIndex(
          (item) => item._id === action.payload
        );
        if (orderIndex !== -1) {
          state.items[orderIndex].status = "cancelled";
        }
      } catch (error) {
        console.error("Error cancelling order:", error);
      }
    },

    updateOrderStatus(state, action) {
      const { orderId, status } = action.payload;
      const orderIndex = state.items.findIndex((item) => item._id === orderId);
      if (orderIndex !== -1) {
        state.items[orderIndex].status = status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.items = [];
      });
  },
});

export const { cancelOrder, updateOrderStatus } = orderSlice.actions;
export default orderSlice;