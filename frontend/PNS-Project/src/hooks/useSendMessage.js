import { useCallback } from "react";
import { isSupportedChain } from "../utils";
import { getProvider } from "../constants/providers";
import { getChatContract } from "../constants/contract";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";

const useSendMessage = () => {
  const { chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  return useCallback(
    async (toName, message) => {
      if (!isSupportedChain(chainId)) return console.error("Wrong network");
      if (!isConnected) return console.error("Please connect your wallet");

      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();

      const contract = getChatContract(signer);

      try {
        // https://pope-naming-service.onrender.com/sendMessage(toName, message);
        const tx = await contract.sendMessage(toName, message);
        const receipt = await tx.wait();

        if (receipt.status) {
          alert("Message sent");
        } else {
          alert("Unable to send message");
        }
      } catch (error) {
        console.log(error);
        alert(`Error: ${error.message}`);
      }
    },
    [chainId, isConnected, walletProvider]
  );
};

export default useSendMessage;