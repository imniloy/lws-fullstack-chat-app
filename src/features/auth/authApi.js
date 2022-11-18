import apiSlice from './../api/apiSlice';
import { userLoggedIn } from './authSlice';

const AuthApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation({
      query: ({ name, email, password }) => ({
        url: `/register`,
        method: 'POST',
        body: { name, email, password },
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;

          localStorage.setItem('auth', JSON.stringify({
            accessToken: response?.data?.accessToken,
            user: response?.data?.user
          }));

          dispatch(userLoggedIn({
            accessToken: response?.data?.accessToken,
            user: response?.data?.user
          }));

        } catch (e) {
          console.log(e);
        };
      },
    }),

    login: build.mutation({
      query: ({ email, password }) => ({
        url: `/login`,
        method: 'POST',
        body: { email, password },
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          
          localStorage.setItem('auth', JSON.stringify({
            accessToken: response?.data?.accessToken,
            user: response?.data?.user
          }));

          dispatch(userLoggedIn({
            accessToken: response?.data?.accessToken,
            user: response?.data?.user
          }));

        } catch (e) {
          console.log(e);
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useRegisterMutation, useLoginMutation } = AuthApi;