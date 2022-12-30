import { createSlice } from "@reduxjs/toolkit";

const initialState = {authData: {}}

const authSlice = createSlice({
    name: 'signup',
    initialState: initialState,
    reducers: {
        signUp: (state,action) => {
            state.authData = action.payload
        }
    }
        
    
})

export const {signUp} = authSlice.actions
export default authSlice