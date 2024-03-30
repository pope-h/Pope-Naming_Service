import { useState, useEffect } from "react";
import useGetConversation from "../hooks/useGetConversation";
import useSendMessage from "../hooks/useSendMessage";
import useGetUsers from "../hooks/useGetUsers";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

function ChatComponent() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [userMessage, setUserMessage] = useState("");
  const [allMessages, setAllMessages] = useState([])

const [allUsers, setAllUsers] = useState([]);
  const sendMessage = useSendMessage();
  const getConversation = useGetConversation();
  const getUsers = useGetUsers();
  const { address } = useWeb3ModalAccount();

  useEffect(() => {
    getUsers().then(setAllUsers);
  }, [getUsers]);


  useEffect(() => {
    if (selectedUser) {
      getConversation(selectedUser.username).then(res => {
        setAllMessages(res);
      });
    }
  }, [getConversation, selectedUser]);

  const handleSendMessage = async () => {
    if (selectedUser && userMessage) {
      await sendMessage(selectedUser.username, userMessage);
      setUserMessage("");
      getConversation(selectedUser.username).then(res => setAllMessages(res));
    }
  };

  return (
    <div className="flex gap-1 px-8 py-4 overflow-auto h-full">
      <div className="w-1/4 h-full">
        {allUsers &&
          allUsers.map((user, index) => (
            <div
              key={index}
              className={`flex items-center p-4 hover:bg-gray-200 cursor-pointer ${
                selectedUser && "bg-gray-200"
              }`}
              onClick={() => setSelectedUser(user)}
            >
              <img
                src={`https://aquamarine-famous-penguin-727.mypinata.cloud/ipfs/${user.imageCID}`}
                alt={user.username}
                className="w-12 h-12 rounded-full mr-8"
              />
              <div className="text-lg">{user.username}</div>
            </div>
          ))}
      </div>
      <div className="flex flex-col flex-1 bg-gray-200">
        <div className="overflow-auto space-y-1 flex-1 p-4">
          {allMessages.length <= 0 ? (
            <p>Nothing to display</p>
          ) : (
            allMessages.map((message, index) => (
              <div
                key={index}
                className="flex items-center w-full text-white"
              >
              <div className={`flex items-center w-full ${message[0] === address ? "justify-end" : "justify-start"}`}>
              <div
                  className={`w-max max-w-[400px] px-4 py-2 rounded-lg text-base ${
                    message[0] === address
                      ? "rounded-br-none bg-blue-600"
                      : "rounded-bl-none bg-gray-400"
                  }`}
                >
                {message[1]}
              </div>
              </div>
                  </div>
            ))
          )}
        </div>
              

        <div className="relative flex items-center h-20 p-3 mt-auto">
          <div className="w-full h-full bg-white rounded-full flex items-center pr-1.5">
            <input
              type="text"
              placeholder="Write something..."
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              className="flex-1 h-full bg-transparent border-nont focus:outline-none px-6"
            />
            <div className="items-center inset-y-0 hidden sm:flex">
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