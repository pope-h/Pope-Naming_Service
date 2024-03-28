import { useState, useEffect } from "react";
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

  useEffect(() => {
    if (!isSupportedChain(chainId)) alert("Unsupported chain");

    const checkUsername = async () => {
      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();
      const pnsContract = getPNSContract(signer);

      try {
        const username = await pnsContract.getAddressForUsername(address);

        setHasUsername(!!username);
      } catch (error) {
        console.log(error);
        alert(`Error: ${error.message}`);
      }
    };

    checkUsername();
  }, [address, walletProvider, chainId]);

  return hasUsername;
}

export default useHasUsername;