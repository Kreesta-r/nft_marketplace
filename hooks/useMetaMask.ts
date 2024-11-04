import { useState } from "react";
import { ethers } from "ethers";

export default function useMetaMask() {
  const [account, setAccount] = useState(null);

  async function connect() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Connection to MetaMask failed:", error);
      }
    } else {
      alert("MetaMask is not installed.");
    }
  }

  return { account, connect };
}
