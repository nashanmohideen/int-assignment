import {configureStore} from "@reduxjs/toolkit"
import imageReducer from "./features/imageSlice";
import likeReducer from "./features/likeSlice"



const store= configureStore({
    reducer:{
        image:imageReducer,
        like: likeReducer,
    },
});

export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch= typeof store.dispatch;

export default store;