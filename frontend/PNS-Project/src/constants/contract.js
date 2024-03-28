import { ethers } from "ethers";
import PNSAbi from "./abi/PNS.json";
import ChatAbi from "./abi/Chat.json";

const getPNSContract = (providerOrSigner) => {
  return new ethers.Contract(
    import.meta.env.VITE_pns_contract_address,
    PNSAbi,
    providerOrSigner
  );
};

export const getChatContract = (providerOrSigner) => {
  return new ethers.Contract(
    import.meta.env.VITE_chat_contract_address,
    ChatAbi,
    providerOrSigner
  );
};

export default getPNSContract;
