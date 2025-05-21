import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slices/userSlice";
import chatSlice from "./Slices/chatSlice";
import orderSlice from "./Slices/orderSlice";
import productSlice from "./Slices/productChatSlice";
// import settingSlice from "./slices/settingSlice"
import createUpdateListReducer from "./Slices/createUpdateListSlice"
import categoryReducer from "./Slices/categorySlice";
import productReducer from "./Slices/productSlice";
import homeReducer from "./Slices/homeSlice";


const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        chat: chatSlice.reducer,
        products: productSlice.reducer,
        cart: orderSlice.reducer,
        createUpdateList: createUpdateListReducer.reducer,
        category: categoryReducer,
        products: productReducer,
        home: homeReducer,

        // settingLanguage: languageSlice.reducer,
        cart:orderSlice.reducer,
    }
})


export default store

