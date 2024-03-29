import { useState, useEffect } from "react";
import useSendMessage from "../hooks/useSendMessage";
import useGetConversation from "../hooks/useGetConversation";

function ChatComponent() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const sendMessage = useSendMessage();
  const getConversation = useGetConversation();

  useEffect(() => {
    getConversation("otherUserName").then((msgs) => {
      if (msgs) {
        setMessages(msgs);
      } else {
        setMessages([]);
      }
    });
  }, [getConversation]);

  const handleSendMessage = async () => {
    await sendMessage("otherUserName", message);
    setMessage("");
    getConversation("otherUserName").then((msgs) => {
      if (msgs) {
        setMessages(msgs);
      } else {
        setMessages([]);
      }
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="overflow-auto">
        {messages &&
          messages.map((message, index) => (
            <div key={index} className="flex items-start mb-4 text-white">
              <div className="flex items-end">
                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                  <div>
                    <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-blue-600 text-white">
                      {message}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
        <div className="relative flex">
          <input
            type="text"
            placeholder="Write something..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-full py-3"
          />
          <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
              onClick={handleSendMessage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatComponent;