
import { configureStore } from "@reduxjs/toolkit";
import orderSlice from "./Slices/orderSlice";
import createUpdateListReducer from "./Slices/createUpdateListSlice"
const store = configureStore({
    reducer: {
        cart: orderSlice.reducer,
        createUpdateList: createUpdateListReducer,
    }, // Add your reducers here

})

export default store;

