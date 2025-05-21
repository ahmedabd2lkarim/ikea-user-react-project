import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
const { VITE_API_URL } = import.meta.env;


export const fetchOrder = createAsyncThunk('fetchOrder', async () => {
    const res = await fetch(`${VITE_API_URL}/api/cart/showAllMyOrders`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    const data = await res.json();

    const productsRequests = data[0].orderItems.map((item) =>
      fetch(`${VITE_API_URL}/api/products/${item.prdID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => res.json())
    );

    const products = await Promise.all(productsRequests)

    data[0].orderItems.forEach(item => {
        const product = products.find(product => product._id === item.prdID)
        product.quantity = item.quantity
    })

    return { ...data[0], orderItems: products }
});

function calculateTotal(orderItems, shippingFee = 0) {
    const total = orderItems.reduce((acc, item) => acc + (item.price.currentPrice * item.quantity), 0);
    return total + shippingFee;
}

function authFetch(url, options = {}) {
    return fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            ...(options.headers || {})
        }
    });
}

const orderSlice = createSlice({
    name: 'orderSlice',
    initialState: {
        items: [],
        isLoading: true
    },
    reducers: {
        decreaseQ(state, action) {
            const item = state.items.orderItems.find(item => item._id === action.payload)
            item.quantity -= 1
            authFetch(`${VITE_API_URL}/api/cart/amount/${state.items._id}`, {
              method: "PATCH",
              body: JSON.stringify({
                prdID: item._id,
                quantity: item.quantity,
              }),
            });
            state.items.total = calculateTotal(state.items.orderItems, state.items.shippingFee);
        },
        increaseQ(state, action) {
            const item = state.items.orderItems.find(item => item._id === action.payload)
            item.quantity += 1
            authFetch(`${VITE_API_URL}/api/cart/amount/${state.items._id}`, {
              method: "PATCH",
              body: JSON.stringify({
                prdID: item._id,
                quantity: item.quantity,
              }),
            });
            state.items.total = calculateTotal(state.items.orderItems, state.items.shippingFee);
        },
        deleteItem(state, action) {
            if (state.items.orderItems.length > 1) {
                const item = state.items.orderItems.find(item => item._id === action.payload)
                authFetch(
                  `${VITE_API_URL}/api/cart/deleteItem/${state.items._id}`,
                  {
                    method: "PATCH",
                    body: JSON.stringify({ prdID: item._id }),
                  }
                );
                state.items.orderItems = state.items.orderItems.filter(item => item._id !== action.payload)
                state.items.total = calculateTotal(state.items.orderItems, state.items.shippingFee);
            }
            else {
                authFetch(`${VITE_API_URL}/api/cart/${state.items._id}`, {
                  method: "DELETE",
                });
                state.items = [];
                this.DeleteOrder(state, action);
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
        builder.addCase(fetchOrder.fulfilled, (state, action) => {
            state.items = action.payload
            state.isLoading = false
        })
    }
})

export const { decreaseQ, increaseQ, deleteItem,deleteAllOrder } = orderSlice.actions
export default orderSlice