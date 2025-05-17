import { configureStore} from "@reduxjs/toolkit";
import userSlice from "./Slices/userSlice";
import chatSlice from "./Slices/chatSlice";
import orderSlice from "./Slices/orderSlice";
import productSlice from "./Slices/productChatSlice";
// import settingSlice from "./slices/settingSlice"
const store = configureStore({
    reducer: {
        user :userSlice.reducer,
        chat:chatSlice.reducer,
        products:productSlice.reducer,
        // settingLanguage: languageSlice.reducer,
        cart:orderSlice.reducer,
    }
})
export default store;


