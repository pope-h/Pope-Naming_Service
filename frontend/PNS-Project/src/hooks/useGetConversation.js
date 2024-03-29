import { useCallback } from "react";
import { isSupportedChain } from "../utils";
import { wssProvider } from "../constants/providers";
import { getChatContract } from "../constants/contract";
import {
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";

const useGetConversation = (withName) => {
  const { chainId } = useWeb3ModalAccount();
  // const { walletProvider } = useWeb3ModalProvider();

  return useCallback(async () => {
    if (!isSupportedChain(chainId)) return console.error("Wrong network");

    // const readWriteProvider = getProvider(walletProvider);
    // const signer = await readWriteProvider.getSigner();

    const contract = getChatContract(wssProvider);
    console.log(contract.interface.fragments.map((f) => f.name));

    try {
      const messages = contract.getConversationWith(withName); // removed await

      if (messages) {
        alert("Message recieved");
        console.log(messages);
      } else {
        alert("Unable to get message");
      }
    } catch (error) {
      console.log(error);
      alert(`Error: ${error.message}`);
    }
  }, [chainId, withName]);
};

export default useGetConversation;