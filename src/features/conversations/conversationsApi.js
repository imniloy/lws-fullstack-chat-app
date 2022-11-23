import apiSlice from "../api/apiSlice";
import { messageApi } from "../messages/messagesApi";

export const conversationApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query({
      query: (email) => `/users?email=${email}`,
    }),

    getConversations: build.query({
      query: (email) => `/conversations?participants_like=${email}`,
    }),

    getConversation: build.query({
      query: ({ senderUserEmail, receiverUserEmail }) =>
        `/conversations?participants_like=${senderUserEmail}-${receiverUserEmail}&participants_like=${receiverUserEmail}-${senderUserEmail}`,
    }),

    addConversation: build.mutation({
      query: ({ sender, data }) => ({
        url: `/conversations`,
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const connversation = await queryFulfilled;
          const { sender } = arg || {};
          const { message, timestamp, users } = arg?.data || {};
          const { id } = connversation?.data || {};
          const senderUser = users?.find(
            (user) => user?.email === sender?.email
          );
          const receiverUser = users?.find(
            (user) => user?.email !== sender?.email
          );

          if (id) {
            console.log(`im ${id}`);
            const response = await dispatch(
              messageApi.endpoints.addMessage.initiate({
                conversationId: id,
                message: message,
                timestamp: timestamp,
                receiver: receiverUser,
                sender: senderUser,
              })
            ).unwrap();
          }
        } catch (err) {
          console.log(err);
        }
      },
    }),

    editConversation: build.mutation({
      query: ({ id, sender, data }) => ({
        url: `/conversations/${id}`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          // optimistic update section starts here ..
          
          // optimistic update section end here ..

          const connversation = await queryFulfilled;
          const { sender } = arg || {};
          const { message, timestamp, users } = arg?.data || {};
          const { id } = connversation?.data || {};
          const senderUser = users?.find(
            (user) => user?.email === sender?.email
          );
          const receiverUser = users?.find(
            (user) => user?.email !== sender?.email
          );

          if (id) {
            console.log(`im ${id}`);
            const response = await dispatch(
              messageApi.endpoints.addMessage.initiate({
                conversationId: id,
                message: message,
                timestamp: timestamp,
                receiver: receiverUser,
                sender: senderUser,
              })
            ).unwrap();
          }
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUserQuery,
  useGetConversationsQuery,
  useGetConversationQuery,
  useAddConversationMutation,
  useEditConversationMutation,
} = conversationApi;
