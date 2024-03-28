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
    <div>
      {messages &&
        messages.map((message, index) => <p key={index}>{message}</p>)}
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

export default ChatComponent;
