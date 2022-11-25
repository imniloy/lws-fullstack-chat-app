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
        const updateCache = dispatch(
          apiSlice.util.updateQueryData(
            "getConversations",
            arg?.sender?.email,
            (draft) => {
              draft.unshift(arg?.data);
            }
          )
        );

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
          updateCache.undo();
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
        // optimistic update section starts here ..
        const updateCache = dispatch(
          apiSlice.util.updateQueryData(
            "getConversations",
            arg?.sender?.email,
            (draft) => {
              const draftConversation = draft.find((e) => e?.id == arg?.id);
              draftConversation.message = arg?.data?.message;
              draftConversation.timestamp = arg?.data?.timestamp;
            }
          )
        );

        // optimistic update section end here ..
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
            const response = await dispatch(
              messageApi.endpoints.addMessage.initiate({
                conversationId: id,
                message: message,
                timestamp: timestamp,
                receiver: receiverUser,
                sender: senderUser,
              })
            ).unwrap();

            // update messages pesimastically starts ...
            console.log(response);
            dispatch(
              apiSlice.util.updateQueryData(
                "getMessages",
                response?.conversationId,
                (draft) => {
                  draft.push(response);
                }
              )
            );
            // update messages pesimastically ends ...
          }
        } catch (err) {
          updateCache.undo();
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
