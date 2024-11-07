"use client";
import { useContext, useState } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { useRouter } from "next/navigation";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../pinata";
import marketplace from "./../marketplace.json";
import { ethers } from "ethers";
import { WalletContext } from "@/context/wallet";

export default function SellNFT() {
  const [formParams, updateFormParams] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [fileURL, setFileURL] = useState();
  const [message, updateMessage] = useState("");
  const [btn, setBtn] = useState(false);
  const [btnContent, setBtnContent] = useState("List NFT");
  const router = useRouter();
  const { isConnected, signer } = useContext(WalletContext);

  async function onFileChange(e) {
    try {
      const file = e.target.files[0];
      const data = new FormData();
      data.set("file", file);
      setBtn(false);
      updateMessage("Uploading image... Please don't click anything!");
      const response = await uploadFileToIPFS(data);
      if (response.success === true) {
        setBtn(true);
        updateMessage("");
        setFileURL(response.pinataURL);
      }
    } catch (e) {
      console.log("Error during file upload...", e);
    }
  }

  async function uploadMetadataToIPFS() {
    const { name, description, price } = formParams;
    if (!name || !description || !price || !fileURL) {
      updateMessage("Please fill all the fields!");
      return -1;
    }

    const nftJSON = {
      name,
      description,
      price,
      image: fileURL,
    };

    try {
      const response = await uploadJSONToIPFS(nftJSON);
      if (response.success === true) {
        return response.pinataURL;
      }
    } catch (e) {
      console.log("Error uploading JSON metadata: ", e);
    }
  }

  async function listNFT(e) {
    try {
      setBtnContent("Processing...");
      const metadataURL = await uploadMetadataToIPFS();
      if (metadataURL === -1) return;

      updateMessage("Uploading NFT...Please dont click anythying!");

      let contract = new ethers.Contract(
        marketplace.address,
        marketplace.abi,
        signer
      );
      const price = ethers.parseEther(formParams.price);

      let transaction = await contract.createToken(metadataURL, price);
      await transaction.wait();

      setBtnContent("List NFT");
      setBtn(false);
      updateMessage("");
      updateFormParams({ name: "", description: "", price: "" });
      alert("Successfully listed your NFT!");
      router.push("/");
    } catch (e) {
      alert("Upload error", e);
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      {isConnected ? (
        <div className="container mx-auto px-4 py-12 mb-11">
          <div>
            <h2 className="text-4xl font-bold mb-6">Upload your NFT</h2>
            <div className="bg-gray-800 rounded-lg p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-medium mb-2">NFT name</label>
                  <input
                    type="text"
                    className="bg-gray-700 text-white rounded-lg px-4 py-2 w-full"
                    value={formParams.name}
                    onChange={(e) =>
                      updateFormParams({ ...formParams, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block font-medium mb-2">NFT description</label>
                  <textarea
                    className="bg-gray-700 text-white rounded-lg px-4 py-2 w-full resize-none"
                    value={formParams.description}
                    onChange={(e) =>
                      updateFormParams({
                        ...formParams,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="block font-medium mb-2">Price (in Eth)</label>
                  <input
                    type="number"
                    className="bg-gray-700 text-white rounded-lg px-4 py-2 w-full"
                    value={formParams.price}
                    onChange={(e) =>
                      updateFormParams({ ...formParams, price: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block font-medium mb-2">Upload image</label>
                  <input
                    type="file"
                    className="bg-gray-700 text-white rounded-lg px-4 py-2 w-full"
                    onChange={onFileChange}
                  />
                </div>
              </div>
              <div className="mt-4 text-center">
                <div className="text-gray-400 mb-2">{message}</div>
                <button
                  onClick={listNFT}
                  type="submit"
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    btn
                      ? "bg-blue-500 hover:bg-blue-600 text-white"
                      : "bg-gray-700 hover:bg-gray-600 text-gray-400"
                  }`}
                >
                  {btnContent === "Processing..." && (
                    <span className="animate-spin mr-2 h-5 w-5 border-2 border-white rounded-full"></span>
                  )}
                  {btnContent}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-12">
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            Connect Your Wallet to Continue...
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}