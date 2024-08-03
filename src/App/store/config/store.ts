import { configureStore } from "@reduxjs/toolkit";
import { companiesReducer } from "../../../enteties/Company/model/slice/companiesSlice";

export const store = configureStore({
    reducer: {
        companies: companiesReducer
    },
    devTools: true
    
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
