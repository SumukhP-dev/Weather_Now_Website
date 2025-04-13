"use client";

import NavBar from "@/app/ui/NavBar";
import Chat from "../ui/Chat";
import { BsSearch } from "react-icons/bs";
import { useState } from "react";
import Groq from "groq-sdk";
import OpenAI from "openai";

interface ChatMessage {
  prompt: string;
  response: string;
}

export default function AIChatBotPage() {
  // State to manage chat messages
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const [inputValue, setInputValue] = useState("");

  // Function to handle button click
  const handleSend = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const inputValue = (
      document?.getElementById("textInput") as HTMLInputElement
    ).value;

    if (inputValue.trim() === "") return;
    // Add the input value to the chat messages

    const chatPrompt = `You: ${inputValue}`;

    try {
      const client: OpenAI = new OpenAI({
        apiKey: process.env.GROQ_API_KEY,
        baseURL: "https://api.groq.com/openai/v1",
        dangerouslyAllowBrowser: true,
      });

      const response = await client.chat.completions.create({
        model: "llama3-8b-8192",
        messages: [
          {
            role: "user",
            content: chatPrompt,
          },
        ],
      });
      const responseContent =
        response.choices[0]?.message?.content || "No response";
      const newChatMessage: ChatMessage = {
        prompt: chatPrompt,
        response: responseContent,
      };

      setChatMessages([...chatMessages, newChatMessage]);
    } catch (error) {
      console.error("Error fetching chat completion:", error);
      const errorMessage = "Error fetching chat completion";
      const newChatMessage: ChatMessage = {
        prompt: chatPrompt,
        response: errorMessage,
      };
      setChatMessages([...chatMessages, newChatMessage]);
    } finally {
      setInputValue("");
    }
  };

  return (
    <>
      <NavBar />

      <h1 className="mt-5 flex h-10 m-10 items-center justify-center text-6xl">
        AI Chatbot
      </h1>
      <div className="card m-10">
        <div className="card-body bg-gray-800 h-dvh p-5 rounded-2xl">
          <div className="searchBar-container">
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

          <div className="chat-container">
            {/* Render chat messages */}
            {
              (console.log("chatMessages: " + chatMessages),
              chatMessages.map((message: ChatMessage, index: number) => (
                <div
                  key={index}
                  className="card bg-zinc-900 m-3 p-5 min-h-20 max-w-lg rounded-lg"
                >
                  <div className="card-body">{message.response}</div>
                </div>
              )))
            }
          </div>
        </div>
      </div>
    </>
  );
}
