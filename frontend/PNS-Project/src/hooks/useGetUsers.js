import { useCallback } from "react";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import getPNSContract from "../constants/contract";
import { isSupportedChain } from "../utils";
import { wssProvider } from "../constants/providers";

const useGetUsers = () => {
  const { chainId, isConnected } = useWeb3ModalAccount();

  const getUsers = useCallback(async () => {
    if (!isSupportedChain(chainId)) return console.error("Wrong network");
    if (!isConnected) return console.error("Please connect your wallet");

    const contract = getPNSContract(wssProvider);
    console.log(contract.interface.fragments.map((f) => f.name));

    try {
      const totalUsers = await contract.getTotalUsers();
      const users = [];

      for (let i = 0; i < totalUsers; i++) {
        const [username, imageCID] = await contract.getUserByIndex(i);
        users.push({ username, imageCID });
      }

      return users;
    } catch (error) {
      console.log(error);
      alert(`Error: ${error.message}`);
    }
  }, [chainId, isConnected]);

  return getUsers;
};

export default useGetUsers;