import { useCallback } from "react";
import { isSupportedChain } from "../utils";
import { wssProvider } from "../constants/providers";
import { getChatContract } from "../constants/contract";
import {
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";

const useGetConversation = () => {
  const { chainId } = useWeb3ModalAccount();

  return useCallback(
    async (withName) => {
      if (!isSupportedChain(chainId)) return console.error("Wrong network");

      const contract = getChatContract(wssProvider);
      console.log(contract.interface.fragments.map((f) => f.name));

      try {
        const messages = await contract.getConversationWith(withName); // added await

        if (messages) {
          alert("Message received");
          console.log(messages);
        } else {
          alert("Unable to get message");
        }

        return messages; // added return
      } catch (error) {
        console.log(error);
        alert(`Error: ${error.message}`);
      }

      return []; // return empty array in case of error
    },
    [chainId]
  );
};

export default useGetConversation;