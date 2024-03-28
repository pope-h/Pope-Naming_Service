import Header from "./components/Header";
import { configureWeb3Modal } from "./connection";
import Register from "./components/Register";
import ChatComponent from "./components/ChatComponent";
import useHasUsername from "./hooks/useHasUsername";

configureWeb3Modal();

function App() {
  const hasUsername = useHasUsername();

  return (
    <div>
      <Header />
      {hasUsername ? <ChatComponent /> : <Register />}
    </div>
  );
}

export default App;