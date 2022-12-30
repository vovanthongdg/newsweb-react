import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slice/authSlice'
import searchSlice from './slice/searchSlice'

const store = configureStore({
  reducer: {
    search: searchSlice.reducer,
    signUp: authSlice.reducer
  },
})

export default store