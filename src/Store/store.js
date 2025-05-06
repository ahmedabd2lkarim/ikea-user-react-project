import { configureStore} from "@reduxjs/toolkit";
import userSlice from "./Slices/userSlice";
import languageSlice from "./Slices/languageSlice";

// import settingSlice from "./slices/settingSlice"



const store = configureStore({
    reducer: {
        user :userSlice.reducer,
        settingLanguage: languageSlice.reducer,
    }
})


export default store

