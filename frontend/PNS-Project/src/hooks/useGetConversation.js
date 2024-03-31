import { useCallback } from "react";
import { isSupportedChain } from "../utils";
import { getProvider } from "../constants/providers";
import { getChatContract } from "../constants/contract";
import {
  useWeb3ModalAccount, useWeb3ModalProvider,
} from "@web3modal/ethers/react";

const useGetConversation = () => {
  const { chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  return useCallback(
    async (withName) => {
      if (!isSupportedChain(chainId)) return console.error("Wrong network");
      if (!isConnected) return console.error("Please connect your wallet");

      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();

      const contract = getChatContract(signer);
      try {
        console.log("first");
        console.log("withName", withName);
        const tx = await contract.getConversationWith(withName);
        console.log("tx", tx);

        return tx;
      } catch (error) {
        console.log(error);
        alert(`Error: ${error.message}`);
      }

      return []; // return empty array in case of error
    },
    [chainId, isConnected, walletProvider]
  );
};

export default useGetConversation;