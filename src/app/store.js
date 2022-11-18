import { configureStore } from '@reduxjs/toolkit';
import apiSlice from '../features/api/apiSlice';
import authSliceReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer || {},
    auth: authSliceReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { userLoggedOut } from '../auth/authSlice';

// const baseQuery = fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL });



// export default apiSlice;