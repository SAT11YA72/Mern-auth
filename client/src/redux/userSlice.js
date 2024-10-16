import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    user: null, 
    loading: false,
    error: false,
};

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        signInSuccess: (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = false;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    },
});

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;
export default userSlice.reducer;

