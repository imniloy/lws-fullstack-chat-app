import React from "react";
import Error from "./Error";
import { useState } from "react";
import Button from "./Button";
import { useEffect } from "react";
import isValidEmail from "../../../validation/isValidEmail";
import { useDispatch } from "react-redux";
import {
  conversationApi,
  useAddConversationMutation,
  useEditConversationMutation,
  useGetConversationQuery,
} from "./../../../../features/conversations/conversationsApi";
import { useSelector } from "react-redux";

const Madal = ({ controller }) => {
  const dispatch = useDispatch();
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [userCheck, setUserCheck] = useState(false);
  const { user: loggedInUser } = useSelector((state) => state.auth) || {};
  const {
    email: loggedInUserEmail,
    name: loggedInUserName,
    id: loggedInUserId,
  } = loggedInUser || {};
  const [participantUser, setParticipantUser] = useState(undefined);
  const {
    email: participantUserEmail,
    name: participantUserName,
    id: participantUserId,
  } = participantUser || {};
  const { data: previousConversation } =
    useGetConversationQuery(
      { senderUserEmail: loggedInUserEmail, receiverUserEmail: to },
      { skip: !userCheck }
    ) || {};

  const [addConversation, { isSuccess: isAddConversationSuccess }] =
    useAddConversationMutation();
  const [editConversation, { isSuccess: isEditConversationSuccess }] =
    useEditConversationMutation();

  const handleSearch = (e) => setTo(e.target.value);

  // debounceHandler function for handling api requests when the [to] state change ..
  const debounceHandler = (value) => {
    if (isValidEmail(value)) {
      dispatch(conversationApi.endpoints.getUser.initiate(value))
        .unwrap()
        .then((fullfiled) => {
          fullfiled.length === 0 &&
            setErrorMsg("No user found at this email address");

          if (fullfiled[0].email !== loggedInUserEmail) {
            setParticipantUser(fullfiled[0]);
            setUserCheck(!userCheck);
            setErrorMsg("");
          } else if (fullfiled[0].email === loggedInUserEmail) {
            setErrorMsg(`You cannot send messages to yourself`);
          }
        })
        .catch((rejected) => {
          console.log(rejected);
        });
    }
  };

  // handleSubmit is used for sending the message to the server [You can think sending msg to other person ] ..
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (previousConversation?.length === 0) {
      await addConversation({
        sender: {
          email: loggedInUserEmail,
          name: loggedInUserName,
          id: loggedInUserId,
        },
        data: {
          participants: `${loggedInUserEmail}-${participantUserEmail}`,
          users: [
            {
              email: loggedInUserEmail,
              name: loggedInUserName,
              id: loggedInUserId,
            },
            {
              email: participantUserEmail,
              name: participantUserName,
              id: participantUserId,
            },
          ],
          message,
          timestamp: new Date().getTime(),
        },
      });
    } else if (previousConversation?.length > 0) {
      const conversationId = previousConversation[0]?.id;
      await editConversation({
        id: conversationId,
        sender: {
          email: loggedInUserEmail,
          name: loggedInUserName,
          id: loggedInUserId,
        },
        data: {
          participants: `${loggedInUserEmail}-${participantUserEmail}`,
          users: [
            {
              email: loggedInUserEmail,
              name: loggedInUserName,
              id: loggedInUserId,
            },
            {
              email: participantUserEmail,
              name: participantUserName,
              id: participantUserId,
            },
          ],
          message,
          timestamp: new Date().getTime(),
          id: conversationId,
        },
      });
    }
  };

  // this useEffect hooks use for calling the debounceHandler function after certain delay ..
  useEffect(() => {
    let timer;
    timer = setTimeout(() => debounceHandler(to.trim()), 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [to]);

  // controling the madal on/off ..
  useEffect(() => {
    if (isAddConversationSuccess || isEditConversationSuccess) controller();
  }, [isAddConversationSuccess, isEditConversationSuccess, controller]);

  // disableSubmitButton is used to disable submit button. while, certain conditions aren't satisfied
  const disableSubmitButton =
    participantUserEmail?.length === 0 ||
    message.length === 0 ||
    errorMsg.length > 0
      ? true
      : false;

  // add a conversation to the server ..

  return (
    <div>
      <div
        className={`fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer`}
        onClick={controller}
      />
      <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Send message
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="to" className="sr-only">
                To
              </label>
              <input
                id="to"
                name="to"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                placeholder="Send to"
                value={to}
                onChange={handleSearch}
              />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:bg-gray-800 disabled:cursor-not-allowed disabled:text-white`}
              message="Send Message"
              disabled={disableSubmitButton}
            />
          </div>
          {errorMsg.length > 0 && <Error message={errorMsg} />}
        </form>
      </div>
    </div>
  );
};

export default Madal;
