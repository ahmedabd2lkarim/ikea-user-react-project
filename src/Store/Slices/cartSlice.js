import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
const { VITE_API_URL } = import.meta.env;


export const fetchCart = createAsyncThunk('fetchCart', async () => {
    const res = await fetch(`${VITE_API_URL}/api/cart/showMyCart`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    const data = await res.json();
    
    const productsRequests = data[0].cartItems.map((item) =>
      fetch(`${VITE_API_URL}/api/products/${item.prdID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => res.json())
    );

    const products = await Promise.all(productsRequests)
    
    data[0].cartItems.forEach(item => {
      const product = products.find(product => product._id === item.prdID)
      product.quantity = item.quantity
    })
    
    return { ...data[0], cartItems: products }
});

function calculateTotal(cartItems) {
    const total = cartItems.reduce((acc, item) => acc + (item.price.currentPrice * item.quantity), 0);
    return total;
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

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: {
        items: [],
        isLoading: true
    },
    reducers: {
        decreaseQ(state, action) {
            const item = state.items.cartItems.find(item => item._id === action.payload)
            item.quantity -= 1
            authFetch(`${VITE_API_URL}/api/cart/cartOP`, {
              method: "PATCH",
              body: JSON.stringify({
                prdID: item._id,
                quantity: -1,
              }),
            });
            state.items.total = calculateTotal(state.items.cartItems);
        },
        increaseQ(state, action) {
            const item = state.items.cartItems.find(item => item._id === action.payload)
            item.quantity += 1
            authFetch(`${VITE_API_URL}/api/cart/cartOP`, {
              method: "PATCH",
              body: JSON.stringify({
                prdID: item._id,
                quantity: 1,
              }),
            });
            state.items.total = calculateTotal(state.items.cartItems);
        },
        deleteItem(state, action) {
            if (state.items.cartItems.length > 1) {
                const item = state.items.cartItems.find(item => item._id === action.payload)
                authFetch(
                  `${VITE_API_URL}/api/cart/cartOP`,
                  {
                    method: "PATCH",
                    body: JSON.stringify({ prdID: item._id, quantity: 0 }),
                  }
                );
                state.items.cartItems = state.items.cartItems.filter(item => item._id !== action.payload)
                state.items.total = calculateTotal(state.items.cartItems);
            }
            else {
                authFetch(`${VITE_API_URL}/api/cart/${state.items._id}`, {
                  method: "DELETE",
                });
                state.items = [];
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
            state.items = action.payload  
            state.isLoading = false
        })
    }
})

export const { decreaseQ, increaseQ, deleteItem,deleteAllOrder } = cartSlice.actions
export default cartSlice