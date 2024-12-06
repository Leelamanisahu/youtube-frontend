import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    _id:null,
    username:null,
    email:null,
    token:null,
    channels:null,
    loading:false,
    error:false
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        loginStart:(state)=>{
                state.loading = true;
        },
        loginSuccess:(state,action)=>{
            state.loading = false;
            state._id = action.payload._id
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.token = action.payload.token;
        },
        createChannel:(state,action)=>{
            state.channels = action.payload.channels;
        },
        loginFalure:(state)=>{
            state.error = true;
            state.loading = false;
        },
        logout:(state)=>{
            state.loading = false;
            state.username = null;
            state._id = null;
            state.email = null;
            state.token = null;
            state.channels = null;
        }
    }
})

export const {loginStart,loginFalure,loginSuccess,createChannel,logout} = userSlice.actions;

export default userSlice.reducer;