import Header from "../components/Header";
import { configureWeb3Modal } from "../connection";
import Register from "../components/Register";

configureWeb3Modal();

function App() {
  return (
    <div className="App">
      <Header />
      <Register />
    </div>
  );
}

export default App;