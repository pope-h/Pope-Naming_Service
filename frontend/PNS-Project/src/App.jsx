import { configureWeb3Modal } from "./connection";
import Register from "./components/Register";
import ChatComponent from "./components/ChatComponent";
// import useHasUsername from "./hooks/useHasUsername";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Login";

configureWeb3Modal();

function App() {
  // const hasUsername = useHasUsername();
  // {
  //   hasUsername ? <ChatComponent /> : <Register />;
  // }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<ChatComponent />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;