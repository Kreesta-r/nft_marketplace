"use client";
import { WalletContext } from "@/context/wallet";
import { BrowserProvider } from "ethers";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

export default function Header() {
  const {
    isConnected,
    setIsConnected,
    userAddress,
    setUserAddress,
    signer,
    setSigner,
  } = useContext(WalletContext);

  const connectWallet = async () => {
    if (!window.ethereum) {
      throw new Error("Metamask is not installed");
    }

    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      setSigner(signer);
      const accounts = await provider.send("eth_requestAccounts", []);
      setIsConnected(true);
      setUserAddress(accounts[0]);
      const network = await provider.getNetwork();
      const chainID = network.chainId;
      const sepoliaNetworkId = "11155111";

      if (chainID.toString() !== sepoliaNetworkId) {
        alert("Please switch your MetaMask to sepolia network");
        return;
      }
    } catch (error) {
      console.error("connection error: ", error);
    }
  };

  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center font-extrabold text-3xl">
          <Link href="/">
            Sentrail
          </Link>
        </div>
        <nav>
          <ul className="flex items-center gap-6">
            <li>
              <Link href="/marketplace" className="hover:text-blue-400 transition">
                MarketPlace
              </Link>
            </li>
            <li>
              <Link href="/sellNFT" className="hover:text-blue-400 transition">
                List
              </Link>
            </li>
            <li>
              <Link href="/profile" className="text-yellow-300 hover:text-yellow-400 transition">
                Profile
              </Link>
            </li>
            <li>
              <button
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  isConnected
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-transparent border border-blue-400 hover:bg-blue-400 hover:text-white"
                }`}
                onClick={connectWallet}
              >
                {isConnected ? `${userAddress?.slice(0, 8)}...` : "Connect Wallet"}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}