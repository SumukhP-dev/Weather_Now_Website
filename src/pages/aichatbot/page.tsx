"use client";

import { BsSearch } from "react-icons/bs";
import { useState } from "react";
import ChatCard from "@/src/components/ChatCard";
import Layout from "@/src/components/Layout";

interface ChatMessage {
  prompt: string;
  response: string;
}

export default function AIChatBotPage() {
  // State to manage chat messages
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");

  const get_openai_chat_request = async (
    resolve: {
      (value: Response): void;
      (arg0: any): void;
    },
    chatPrompt: string
  ) => {
    await fetch(`http://127.0.0.1:8000/api/res/?prompt=${chatPrompt}`, {
      method: "GET",
    }).then((data) => {
      resolve(data);
    });
  };

  const get_request_string = async (
    resolve: {
      (value: string): void;
      (arg0: string): void;
    },
    chatPrompt: string
  ) => {
    let myPromise = new Promise<Response>(async function (resolve) {
      get_openai_chat_request(resolve, chatPrompt);
    });

    const data = await myPromise;

    data.text().then((text) => {
      resolve(text);
    });
  };

  // Function to handle button click
  const handleSend = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const inputValue = (
      document?.getElementById("textInput") as HTMLInputElement
    ).value;

    const sentChatMessage: ChatMessage = {
      prompt: "",
      response: inputValue,
    };

    if (inputValue.trim() === "") return;
    // Add the input value to the chat messages

    const chatPrompt = `You: ${inputValue}`;

    try {
      let myPromise2 = new Promise<string>(async function (resolve) {
        get_request_string(resolve, chatPrompt);
      });

      const responseContent = await myPromise2;

      const responseChatMessage: ChatMessage = {
        prompt: chatPrompt,
        response: responseContent,
      };

      console.log("sentChatMessage: ", sentChatMessage);
      console.log("responseChatMessage: ", responseChatMessage);

      setChatMessages([...chatMessages, sentChatMessage, responseChatMessage]);
    } catch (error) {
      console.error("Error fetching chat completion:", error);
      const errorMessage = "Error fetching chat completion";
      const responseChatMessage: ChatMessage = {
        prompt: chatPrompt,
        response: errorMessage,
      };

      console.log("sentChatMessage: ", sentChatMessage);
      console.log("responseChatMessage: ", responseChatMessage);

      setChatMessages([...chatMessages, sentChatMessage, responseChatMessage]);
    } finally {
      setInputValue("");
    }
  };

  return (
    <>
      <Layout>
      <h1 className="mt-5 flex h-10 m-10 items-center justify-center text-6xl">
        AI Chatbot
      </h1>
      <div className="card mx-20">
        <div className="card-body bg-gray-800 h-dvh p-5 rounded-2xl">
          <div className="searchBar-container mb-5">
            <form
              onSubmit={handleSend}
              className="flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl"
            >
              <div>
                <input
                  id="textInput"
                  type="text"
                  placeholder="Ask me anything..."
                  className="bg-transparent border-none focus:outline-none text-2xl text-white bg-black"
                />
              </div>
              <button>
                <BsSearch size={20} />
              </button>
            </form>
          </div>

          <div className="chat-container grid grid-cols-2">
            {/* Render response chat messages */}
            {
              (console.log("chatMessages: " + chatMessages),
              chatMessages.map((message: ChatMessage, index: number) => (
                <div className="" key={index}>
                  <ChatCard data={[message.response, index]} />
                </div>
              )))
            }
          </div>
        </div>
      </div>
      </Layout>
    </>
  );
}
