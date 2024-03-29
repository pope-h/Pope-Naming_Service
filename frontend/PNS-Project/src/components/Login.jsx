import { useState } from "react";
import { UserIcon } from "@heroicons/react/solid";
import useHasUsername from "../hooks/useHasUsername";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [, checkUsername] = useHasUsername();
  const navigate = useNavigate();

  const login = async () => {
    try {
      const usernameExists = await checkUsername(username);
      if (usernameExists) {
        console.log("Login successful");
        // Redirect to the main page or dashboard
        navigate("/chat");
      } else {
        console.log("Username does not exist");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{
        backgroundImage: "url('https://source.unsplash.com/random')",
        backgroundSize: "cover",
      }}
    >
      <div className="bg-white rounded-lg shadow-lg p-5 md:p-20 mx-2">
        <div className="text-center">
          <h2 className="text-xl">Welcome Back</h2>
          <p className="text-sm text-gray-500 py-3">Login to your account</p>
        </div>
        <div className="space-y-5">
          <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 focus:outline-none">
            <UserIcon className="h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full text-lg px-4 py-2 focus:outline-none"
            />
          </div>
          <button
            onClick={login}
            className="w-full py-3 bg-blue-600 text-white rounded-lg px-4 hover:bg-blue-700"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;