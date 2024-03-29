import { useCallback } from "react";
import { isSupportedChain } from "../utils";
import { getProvider } from "../constants/providers";
import getPNSContract from "../constants/contract";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";

const useRegisterUsername = (username, imageHash) => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  return useCallback(async () => {
    if (!isSupportedChain(chainId)) return console.error("Wrong network");

    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();

    const contract = getPNSContract(signer);

    try {
      const tx = await contract.registerUsername(username, imageHash);
      const receipt = await tx.wait();

      if (receipt.status) {
        alert("Username registration successful");
      } else {
        alert("Username registration failed");
      }
    } catch (error) {
      console.log(error);
      alert(`Error: ${error.message}`);
    }
  }, [chainId, imageHash, username, walletProvider]);
};

export default useRegisterUsername;