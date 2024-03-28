import { useState } from "react";
import axios from "axios";
import useRegisterUsername from "../hooks/useRegisterUsername";

function Register() {
  const [username, setUsername] = useState("");
  const [file, setFile] = useState(null);
  const [imageHash, setImageHash] = useState("");
  const registerUsername = useRegisterUsername();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const register = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
            pinata_secret_api_key: import.meta.env.VITE_PINATA_API_SECRET,
          },
        }
      );

      const imageHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
      setImageHash(imageHash);

      await registerUsername(username, imageHash);
      console.log("Username registered with image hash:", imageHash);
    } catch (error) {
      console.error("Error during file upload or contract interaction:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 w-full">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="file"
          >
            Profile Picture
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="file"
            type="file"
            onChange={handleFileChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={register}
          >
            Register
          </button>
        </div>
        {imageHash && (
          <p className="text-green-500 mt-4">
            Image uploaded to Pinata with hash: {imageHash}
          </p>
        )}
      </div>
    </div>
  );
}

export default Register;