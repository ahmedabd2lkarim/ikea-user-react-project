import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slices/userSlice";
import chatSlice from "./Slices/chatSlice";
import productSlice from "./Slices/productChatSlice";
import orderSlice from "./Slices/orderSlice";
// import settingSlice from "./slices/settingSlice"
import createUpdateListReducer from "./Slices/createUpdateListSlice"


const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        chat: chatSlice.reducer,
        products: productSlice.reducer,
        cart: orderSlice.reducer,
        createUpdateList: createUpdateListReducer.reducer,

        // settingLanguage: languageSlice.reducer,
    }
})


export default store

