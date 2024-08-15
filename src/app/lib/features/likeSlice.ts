import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface likeState{
    likes:{[key:string]:boolean};
    counts:{[key:string]:number};

}

const initialState: likeState = {
    likes: {},
    counts: {},
  };

const likeSlice= createSlice({
    name:'like',
    initialState,
    reducers:{
        toggleLike:(state, action: PayloadAction<string>) => {
           const imageUrl= action.payload;
           if(state.likes[imageUrl]){
            state.likes[imageUrl]=false;
            state.counts[imageUrl]=Math.max((state.counts[imageUrl]||0)-1,0);
           } else{
            state.likes[imageUrl] = true;
            state.counts[imageUrl] = (state.counts[imageUrl] || 0) + 1;
           }
        },
    },
});

export const {toggleLike} = likeSlice.actions;
export default likeSlice.reducer;

