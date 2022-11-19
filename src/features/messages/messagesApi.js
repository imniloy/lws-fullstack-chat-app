import apiSlice from "../api/apiSlice";

export const messageApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getMessages: build.query({
      query: (id) => `/messages?conversationId=${id}`
    }),

    addMessage: build.mutation({
      query: (data) => ({
        url: `/messages`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetMessagesQuery, useAddMessageMutation } = messageApi;
