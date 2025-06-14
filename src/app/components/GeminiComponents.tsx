"use client";

import { generativeText } from "@/app/utils/gemini";
import { Send, Smile, Plus } from "lucide-react";
import { useEffect, useRef, useState, FormEvent } from "react";
import { BsCaretDown, BsCaretUp } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { RiRobot3Line } from "react-icons/ri";

interface Message {
  text: string;
  sender: "user" | "ai";
}

export default function GeminiComponent() {
  const [prompt, setPrompt] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showQ, setShowQ] = useState<boolean>(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Load chat history from localStorage on mount
  useEffect(() => {
    const storedMessages = localStorage.getItem("jobhive_chat_history");
    if (storedMessages) {
      try {
        const parsedMessages: Message[] = JSON.parse(storedMessages);
        setMessages(parsedMessages);
      } catch (error) {
        console.error("Failed to parse stored messages", error);
        localStorage.removeItem("jobhive_chat_history");
      }
    }
  }, []);

  // Save to localStorage whenever messages change
  useEffect(() => {
    localStorage.setItem("jobhive_chat_history", JSON.stringify(messages));
  }, [messages]);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleGenerate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const userMessage: Message = { text: prompt, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setLoading(true);

    try {
      const result = await generativeText(prompt);
      const aiMessage: Message = { text: result, sender: "ai" };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error generating text:", error);
      // Optionally show error message to user
    } finally {
      setLoading(false);
    }
  };

  // Example of handleCustomClick usage — you may want to type the argument properly
  const handleCustomClick = (item: { question: string; answer: string }) => {
    setMessages((prev) => [
      ...prev,
      { text: item.question, sender: "user" },
      { text: item.answer, sender: "ai" },
    ]);
  };

  return (
    <>
      {/* Chat Modal */}
      <div className={`fixed bottom-2 right-2 md:right-5 z-[60] m-0`}>
        {/* Floating Button */}
        <div className="flex items-center justify-end">
          <button
            onClick={() => setOpen(!open)}
            className="w-12 h-10 rounded-xl bg-teal-500 btn text-white text-xl border-none"
            aria-label={open ? "Close chat" : "Open chat"}
            type="button"
          >
            {open ? <GrClose /> : <IoChatbubbleEllipsesSharp />}
          </button>
        </div>
        <div
          className={`${
            open
              ? "flex w-[300px] md:w-[380px] h-[400px] md:h-[500px] opacity-100 pointer-events-auto"
              : "w-0 h-0 opacity-0 pointer-events-none"
          } duration-500 border overflow-hidden rounded-xl border-teal-600 bg-white shadow-xl flex-col relative`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="chat-title"
        >
          <div className="relative">
            {/* Title */}
            <h2
              id="chat-title"
              className="text-xl font-semibold text-center text-teal-50 bg-gradient-to-tr from-teal-500 via-teal-600 to-teal-600 py-3 flex items-center justify-center gap-2 z-10 relative"
            >
              <RiRobot3Line className="text-2xl" /> NextThoughts Gemini AI
            </h2>

            <div className="absolute right-0 bottom-0 z-20">
              <button
                onClick={() => setShowQ(!showQ)}
                className="py-1 px-3 rounded-t-lg bg-gradient-to-l from-teal-200 via-teal-200 to-teal-300 cursor-pointer"
                aria-expanded={showQ}
                aria-controls="custom-questions"
                type="button"
              >
                {showQ ? <BsCaretUp /> : <BsCaretDown />}
              </button>
            </div>
          </div>
          {/* Messages */}
          <div
            style={{
              backgroundImage: `url('/aiBot.avif')`,
              backgroundPosition: "right",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
            className="flex-1 relative"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>
            <div className="overflow-y-auto space-y-3 p-4 z-20 shadow-inner absolute top-0 left-0 w-full h-full">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`py-1 md:py-1.5 px-2 text-sm max-w-2/3 w-auto shadow-2xl text-white ${
                    msg.sender === "user"
                      ? "bg-transparent/50 backdrop-blur border border-gray-500 ml-auto text-right rounded-t-xl rounded-bl-xl"
                      : "bg-transparent/50 backdrop-blur border border-gray-500 mr-auto text-left rounded-t-xl rounded-br-xl"
                  }`}
                >
                  {msg.text}
                </div>
              ))}

              {/* Loading bubble */}
              {loading && (
                <div className="py-1 px-2 flex items-center justify-center w-12 bg-gradient-to-l from-teal-400 via-teal-400 to-teal-500 mr-auto text-left rounded-t-xl rounded-br-xl ">
                  <span className="loading loading-dots loading-sm" />
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleGenerate}
            className="flex flex-row items-center gap-2 bg-gradient-to-l from-teal-500 via-teal-600 to-teal-600 rounded-b-xl rounded-br-xl w-full p-2"
          >
            <div className="flex items-center gap-2">
              <button
                className="cursor-pointer text-white"
                type="button"
                aria-label="Add"
                onClick={() => {
                  /* your add handler here */
                }}
              >
                <Plus />
              </button>
              <button
                className="cursor-pointer text-white"
                type="button"
                aria-label="Smile"
                onClick={() => {
                  /* your smile handler here */
                }}
              >
                <Smile />
              </button>
            </div>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask me anything..."
              className="border border-gray-300 p-2 rounded-lg focus:outline-none bg-white w-[150px] md:w-[230px]"
              disabled={loading}
              aria-label="Chat input"
            />
            <button
              className={`rounded-lg btn border-none ${
                loading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gradient-to-br from-teal-100 to-teal-200"
              }`}
              disabled={loading}
              type="submit"
              aria-label="Send message"
            >
              <Send className="text-xl hover:scale-95 duration-300" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
