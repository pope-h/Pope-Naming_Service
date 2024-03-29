import { useState, useEffect } from "react";
import useGetConversation from "../hooks/useGetConversation";
import useSendMessage from "../hooks/useSendMessage";
import useGetUsers from "../hooks/useGetUsers";

function ChatComponent() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const sendMessage = useSendMessage();
  const getConversation = useGetConversation();
  const getUsers = useGetUsers();

  useEffect(() => {
    getUsers().then(setUsers);
  }, [getUsers]);

  useEffect(() => {
    if (selectedUser) {
      getConversation(selectedUser.username).then(setMessages);
    }
  }, [getConversation, selectedUser]);

  const handleSendMessage = async () => {
    await sendMessage(selectedUser.username, message);
    setMessage("");
    getConversation(selectedUser.username).then(setMessages);
  };

  return (
    <div className="flex h-full">
      <div className="w-1/3 border-r-2 border-gray-200 overflow-auto">
        {users.map((user, index) => (
          <div
            key={index}
            className="flex items-center p-4 hover:bg-gray-200 cursor-pointer"
            onClick={() => setSelectedUser(user)}
          >
            <img
              src={`https://gateway.pinata.cloud/ipfs/${user.imageCID}`}
              alt={user.username}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div className="text-sm">{user.username}</div>
          </div>
        ))}
      </div>
      <div className="w-2/3 flex flex-col">
        <div className="overflow-auto">
          {messages.map((message, index) => (
            <div key={index} className="flex items-start mb-4 text-white">
              <div className="flex items-end">
                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                  <div>
                    <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-blue-600 text-white">
                      {message.content}
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
    </div>
  );
}

export default ChatComponent;