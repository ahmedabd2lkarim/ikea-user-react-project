import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
const { VITE_API_URL } = import.meta.env;


export const fetchOrders = createAsyncThunk('fetchOrders', async () => {
    const res = await fetch(`${VITE_API_URL}/api/orders/showAllMyOrders`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    let data = await res.json();

    data = data.map(async order => {
        return {
            ...order,
            orderItems: await Promise.all(order.orderItems.map(async (item) => {
                let product = await fetch(`${VITE_API_URL}/api/products/${item.prdID}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                })
                product = await product.json();
                product.quantity = item.quantity;
                return product;
            }))
        }
    })
    data = await Promise.all(data);
    return data;
});

const orderSlice = createSlice({
    name: 'orderSlice',
    initialState: {
        items: [],
        isLoading: true
    },
    reducers: {
        cancelOrder(state, action) {
            fetch(`${VITE_API_URL}/api/orders/cancel/${action.payload}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOrders.fulfilled, (state, action) => {
            state.items = action.payload
            state.isLoading = false
        })
    }
})

export const { cancelOrder } = orderSlice.actions
export default orderSlice