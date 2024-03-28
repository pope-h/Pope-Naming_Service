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
    <div className="max-w-md mx-auto mt-10">
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <input
        type="file"
        onChange={handleFileChange}
        className="border p-2 mb-4 w-full"
      />
      <button
        onClick={register}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Register
      </button>
      {imageHash && (
        <p className="text-green-500">
          Image uploaded to Pinata with hash: {imageHash}
        </p>
      )}
    </div>
  );
}

export default Register;