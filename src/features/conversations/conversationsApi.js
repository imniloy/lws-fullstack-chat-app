import apiSlice from "../api/apiSlice";

export const conversationApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query({
      query: (email) => `/users?email=${email}`,
    }),

    getConversations: build.query({
      query: (email) => `/conversations?participants_like=${email}`,
    }),

    getConversation: build.query({
      query: ({ senderUserEmail, receiverUserEmail }) => `/conversations?participants_like=${senderUserEmail}-${receiverUserEmail}&participants_like=${receiverUserEmail}-${senderUserEmail}`,
    }),

    addConversation: build.mutation({
      query: (data) => ({
        url: `/conversations`,
        method: 'POST',
        body: data,
      }),
    }),

    editConversation: build.mutation({
      query: ({ id, data }) => ({
        url: `/conversations/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),

  }),
  overrideExisting: false,
});

export const { useGetUserQuery, useGetConversationsQuery, useGetConversationQuery, useAddConversationMutation, useEditConversationMutation } = conversationApi;
