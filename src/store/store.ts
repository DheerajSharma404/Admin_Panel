import { configureStore } from "@reduxjs/toolkit";
import { careerApiSlice } from "../features/career/careerApi";



const store = configureStore({
    reducer: {
        [careerApiSlice.reducerPath]:careerApiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(careerApiSlice.middleware),
})

export default store;


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;