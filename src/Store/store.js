<<<<<<< HEAD
import { configureStore} from "@reduxjs/toolkit";
import userSlice from "./Slices/userSlice";
import chatSlice from "./Slices/chatSlice";
import productSlice from "./Slices/productChatSlice";

// import settingSlice from "./slices/settingSlice"



const store = configureStore({
    reducer: {
        user :userSlice.reducer,
        chat:chatSlice.reducer,
        products:productSlice.reducer
        // settingLanguage: languageSlice.reducer,
    }
})


export default store
=======

import { configureStore } from "@reduxjs/toolkit";
import orderSlice from "./Slices/orderSlice";

const store = configureStore({
    reducer: {
        cart:orderSlice.reducer,
    }, // Add your reducers here
})

export default store;
>>>>>>> origin/Magy

