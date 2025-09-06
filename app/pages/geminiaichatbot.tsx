"use client";

import { BsSearch } from "react-icons/bs";
import { useState } from "react";
import ChatCard from "../components/ChatCard";
import Layout from "../components/Layout";
import TypingIndicator from "~/components/TypingIndicator";

interface ChatMessage {
  prompt: string;
  response: string;
}

export default function GeminiAiChatBotPage() {
  // State to manage chat messages
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const get_gemini_chat_request = async (
    chatPrompt: string
  ): Promise<string> => {
    const response = await fetch(
      `https://weather-now-website.onrender.com/api/res/gemini/?prompt=${chatPrompt}`,
      {
        method: "GET",
      }
    );

    return await response.text();
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

    setIsLoading(true);

    try {
      const responseContent = await get_gemini_chat_request(chatPrompt);

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
      const errorChatMessage: ChatMessage = {
        prompt: chatPrompt,
        response: errorMessage,
      };

      console.log("sentChatMessage: ", sentChatMessage);
      console.log("errorChatMessage: ", errorChatMessage);

      setChatMessages([...chatMessages, sentChatMessage, errorChatMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Layout>
        <h1 className="mt-5 flex h-10 m-10 items-center justify-center text-6xl">
          Gemini Chatbot
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

            <div className="overflow-auto scrollbar scrollbar-thumb-blue-500 scrollbar-track-gray-200">
              <div className="chat-container grid grid-cols-2">
                {/* Render response chat messages */}
                {chatMessages.map((message: ChatMessage, index: number) => (
                  <div className="" key={index}>
                    <ChatCard data={[message.response, index]} />
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <TypingIndicator />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
