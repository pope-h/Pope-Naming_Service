import { ethers } from "ethers";

export const readOnlyProvider = new ethers.JsonRpcProvider(
  import.meta.env.VITE_rpc_url
);

export const wssProvider = new ethers.WebSocketProvider(
  import.meta.env.VITE_wss_rpc_url
);

export const getProvider = (provider) => {
  return new ethers.BrowserProvider(provider);
};