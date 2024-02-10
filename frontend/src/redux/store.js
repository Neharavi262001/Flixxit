import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice'
import { apiSlice } from './api/apiSlice';
import  contentReducer  from './content/contentSlice';

const store = configureStore({
  reducer: {
    content:contentReducer,
    auth:authReducer,
    
   [apiSlice.reducerPath]:apiSlice.reducer
  },
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
  devTools:true
});

export default store;