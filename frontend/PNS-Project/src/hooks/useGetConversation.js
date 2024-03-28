import { useCallback } from "react";
import { isSupportedChain } from "../utils";
import { getProvider } from "../constants/providers";
import getChatContract from "../constants/contract";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";

const useGetConversation = () => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  return useCallback(
    async (withName) => {
      if (!isSupportedChain(chainId)) alert("Unsupported chain");

      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();

      const contract = getChatContract(signer);

      try {
        const tx = await contract.getConversationWith(withName);
        const receipt = await tx.wait();

        if (receipt.status) {
          alert("Message recieved");
        } else {
          alert("Unable to get message");
        }
      } catch (error) {
        console.log(error);
        alert(`Error: ${error.message}`);
      }
    },
    [chainId, walletProvider]
  );
};

export default useGetConversation;