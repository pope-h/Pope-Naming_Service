import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useRegisterUsername from "../hooks/useRegisterUsername";
import { UserIcon, UploadIcon } from "@heroicons/react/solid";

function Register() {
  const [username, setUsername] = useState("");
  const [file, setFile] = useState(null);
  const [imageUri, setImageHash] = useState("");
  const registerUsername = useRegisterUsername();
  const navigate = useNavigate();

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

      const imageUri = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
      const imageCID = response.data.IpfsHash;
      setImageHash(imageUri);

      await registerUsername(username, imageCID);
      console.log("Username registered with image uri:", imageUri);

      // Redirect to the login page
      navigate("/login");
    } catch (error) {
      console.error("Error during file upload or contract interaction:", error);
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
          <h2 className="text-xl">Welcome to Our Platform</h2>
          <p className="text-sm text-gray-500 py-3">Create your account</p>
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
          <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 focus:outline-none">
            <UploadIcon className="h-5 w-5 text-gray-500" />
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full text-lg px-4 py-2 focus:outline-none"
            />
          </div>
          <button
            onClick={register}
            className="w-full py-3 bg-blue-600 text-white rounded-lg px-4 hover:bg-blue-700"
          >
            Register
          </button>
        </div>
        {imageUri && (
          <p className="text-green-500 mt-4 text-center">
            Image uploaded to Pinata with uri: {imageUri}
          </p>
        )}
      </div>
    </div>
  );
}

export default Register;