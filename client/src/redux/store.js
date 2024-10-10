import { configureStore } from "@reduxjs/toolkit";
import userReducer  from "./userSlice";


export const store = configureStore({
    reducer: {user: reducers},
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }), // to avoid serializable error
});
