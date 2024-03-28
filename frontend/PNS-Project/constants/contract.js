import { ethers } from "ethers";
import PNSAbi from "./abi/PNS.json";

const getPNSContract = (providerOrSigner) => {
  return new ethers.Contract(
    import.meta.env.VITE_pns_contract_address,
    PNSAbi,
    providerOrSigner
  );
};

export default getPNSContract;
