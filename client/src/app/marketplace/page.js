"use client";

import { WalletContext } from "@/context/wallet";
import { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import MarketplaceJson from "../marketplace.json";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import axios from "axios";
import NFTCard from "../components/nftCard/NFTCard";
import { Wallet, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import Link from "next/link";

export default function Marketplace() {
  const [items, setItems] = useState();
  const { isConnected, signer } = useContext(WalletContext);

  async function getNFTitems() {
    const itemsArray = [];
    if (!signer) return;
    let contract = new ethers.Contract(
      MarketplaceJson.address,
      MarketplaceJson.abi,
      signer
    );

    let transaction = await contract.getAllListedNFTs();
    for (const i of transaction) {
      const tokenId = parseInt(i.tokenId);
      const tokenURI = await contract.tokenURI(tokenId);
      const meta = (await axios.get(tokenURI)).data;
      const price = ethers.formatEther(i.price);

      const item = {
        price,
        tokenId,
        seller: i.seller,
        owner: i.owner,
        image: meta.image,
        name: meta.name,
        description: meta.description,
      };

      itemsArray.push(item);
    }
    return itemsArray;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsArray = await getNFTitems();
        setItems(itemsArray);
      } catch (error) {
        console.error("Error fetching NFT items:", error);
      }
    };

    fetchData();
  }, [isConnected]);

  const NotConnectedView = () => (
    <div className="max-w-4xl mx-auto text-center py-16">
      <div className="bg-gray-800/50 rounded-2xl p-8 md:p-12 backdrop-blur-sm border border-gray-700">
        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur-2xl opacity-20" />
              </div>
              <Wallet className="w-16 h-16 text-blue-500 relative" />
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6 pt-8">Connect Your Wallet to Start</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Unlock the full potential of our NFT marketplace by connecting your wallet. Browse exclusive collections, 
            trade unique digital assets, and join our thriving community.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 rounded-xl bg-gray-800/50 border border-gray-700">
              <ShieldCheck className="w-8 h-8 text-green-500 mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Secure Access</h3>
              <p className="text-gray-400 text-sm">Connect safely with your preferred Web3 wallet</p>
            </div>
            <div className="p-6 rounded-xl bg-gray-800/50 border border-gray-700">
              <AlertCircle className="w-8 h-8 text-blue-500 mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Always in Control</h3>
              <p className="text-gray-400 text-sm">Full ownership of your assets and transactions</p>
            </div>
            <div className="p-6 rounded-xl bg-gray-800/50 border border-gray-700">
              <ArrowRight className="w-8 h-8 text-purple-500 mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Quick Setup</h3>
              <p className="text-gray-400 text-sm">Connect in seconds to start exploring</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => {}} // Add your wallet connect function here
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl font-semibold 
                hover:opacity-90 transition-all flex items-center gap-2 group w-full sm:w-auto justify-center"
            >
              Connect Wallet
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <Link 
              href="/learn-more"
              className="px-8 py-4 bg-gray-700/50 rounded-xl font-semibold hover:bg-gray-700 
                transition-all w-full sm:w-auto text-center"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold mb-6">Featured Collections Preview</h3>
        <div className="grid md:grid-cols-3 gap-6 opacity-60">
          {[1, 2, 3].map((i) => (
            <div key={i} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur opacity-25" />
              <div className="relative p-4 bg-gray-800 rounded-lg">
                <div className="h-48 bg-gray-700 rounded-lg mb-4 animate-pulse" />
                <div className="h-4 bg-gray-700 rounded w-2/3 mb-2 animate-pulse" />
                <div className="h-4 bg-gray-700 rounded w-1/2 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="content">
          {isConnected ? (
            <>
              <div>
                <h2 className="text-4xl font-bold mb-8">NFT Marketplace</h2>
                {items?.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items?.map((value, index) => (
                      <NFTCard item={value} key={index} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="max-w-md mx-auto">
                      <h3 className="text-2xl font-semibold mb-4">No NFTs Listed Yet</h3>
                      <p className="text-gray-400 mb-8">
                        Be the first to list your NFT in our marketplace and start trading!
                      </p>
                      <Link 
                        href="/list"
                        className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl 
                          font-semibold hover:opacity-90 transition-all inline-flex items-center gap-2"
                      >
                        Create NFT
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <NotConnectedView />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}