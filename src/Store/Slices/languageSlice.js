import { createSlice } from "@reduxjs/toolkit";

const languageSlice = createSlice({
    name: 'language',
    initialState: { language: 'en' },
    reducers: {
        toggleLanguage(state) {
            state.language = state.language === 'en' ? 'ar' : 'en';
        },
        // setLanguage(state, action) {
        //     state.language = action.payload;
        // }
    }
});

export const { toggleLanguage } = languageSlice.actions;
export default languageSlice;