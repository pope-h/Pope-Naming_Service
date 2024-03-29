import { useState } from "react";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { getProvider } from "../constants/providers";
import { isSupportedChain } from "../utils";
import getPNSContract from "../constants/contract";

function useHasUsername() {
  const { chainId, address } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [hasUsername, setHasUsername] = useState(false);

  const checkUsername = async (username) => {
    if (!isSupportedChain(chainId)) return console.error("Wrong network");

    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();
    const pnsContract = getPNSContract(signer);

    try {
      const userAddress = await pnsContract.getAddressForUsername(username);
      const usernameExists = address === userAddress;
      setHasUsername(usernameExists);
      return usernameExists;
    } catch (error) {
      console.log(error);
      alert(`Error: ${error.message}`);
    }
  };

  return [hasUsername, checkUsername];
}

export default useHasUsername;