import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchText: ''
}

const searchSlice = createSlice({
    name: 'search',
    initialState: initialState,
    reducers: {
        searchItem: (state,action) => {
            state.searchText = action.payload
        }
    }
})

export const {searchItem} = searchSlice.actions
export default searchSlice