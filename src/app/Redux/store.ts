import {configureStore} from "@reduxjs/toolkit"
import imageReducer from "./features/imageSlice";
import likeReducer from "./features/imageSlice";
import MovieReducer from "./features/movieSlice"



const store= configureStore({
    reducer:{
        movie:MovieReducer,
        image:imageReducer,
        like: likeReducer,
    },
});

export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch= typeof store.dispatch;

export default store;