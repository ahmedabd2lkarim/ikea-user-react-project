import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


export const fetchOrder = createAsyncThunk('fetchOrder', async () => {
    const res = await fetch("http://localhost:5000/api/cart/showAllMyOrders", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_APP_TOKEN}`
        }
    })
    const data = await res.json();

    const productsRequests = data[0].orderItems.map(item =>
        fetch(`http://localhost:5000/api/products/${item.prdID}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_APP_TOKEN}`
                }
            })
            .then(res => res.json())

    )

    const products = await Promise.all(productsRequests)

    data[0].orderItems.forEach(item => {
        const product = products.find(product => product._id === item.prdID)
        product.quantity = item.quantity
    })

    return { ...data[0], orderItems: products }
});

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
            fetch(`http://localhost:5000/api/cart/amount/${state.items._id}`, {
                method: 'PATCH',
                body: JSON.stringify({ prdID: item._id, quantity: item.quantity }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_APP_TOKEN}`
                }
            })
            state.items.total = state.items.orderItems.reduce((acc, item) => acc + (item.price.currentPrice * item.quantity), 0)
            state.items.total += state.items.shippingFee
        },
        increaseQ(state, action) {
            const item = state.items.orderItems.find(item => item._id === action.payload)
            item.quantity += 1
            fetch(`http://localhost:5000/api/cart/amount/${state.items._id}`, {
                method: 'PATCH',
                body: JSON.stringify({ prdID: item._id, quantity: item.quantity }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_APP_TOKEN}`
                }
            })
            state.items.total = state.items.orderItems.reduce((acc, item) => acc + (item.price.currentPrice * item.quantity), 0)
            state.items.total += state.items.shippingFee
        },
        deleteItem(state, action) {
            if (state.items.orderItems.length > 1) {
                const item = state.items.orderItems.find(item => item._id === action.payload)
                fetch(`http://localhost:5000/api/cart/deleteItem/${state.items._id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({ prdID: item._id }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${import.meta.env.VITE_APP_TOKEN}`
                    }
                })

                state.items.orderItems = state.items.orderItems.filter(item => item._id !== action.payload)
                state.items.total = state.items.orderItems.reduce((acc, item) => acc + (item.price.currentPrice * item.quantity), 0)
                state.items.total += state.items.shippingFee
            }
            else {
                console.log(2);
                fetch(`http://localhost:5000/api/cart/${state.items._id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${import.meta.env.VITE_APP_TOKEN}`
                    }
                })
                state.items=[];
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOrder.fulfilled, (state, action) => {
            state.items = action.payload
            state.isLoading = false
        })
    }
})

export const { decreaseQ, increaseQ, deleteItem } = orderSlice.actions
export default orderSlice