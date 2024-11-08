'use client'
import { useContext, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";
import { AlertCircle, Upload, Loader2 } from "lucide-react";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../pinata";
import marketplace from "./../marketplace.json";
import { WalletContext } from "@/context/wallet";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function SellNFT() {
  const [formParams, updateFormParams] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [fileURL, setFileURL] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [message, updateMessage] = useState({ type: "", content: "" });
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const { isConnected, signer } = useContext(WalletContext);

  const validateForm = () => {
    const { name, description, price } = formParams;
    if (!name.trim()) return "NFT name is required";
    if (!description.trim()) return "Description is required";
    if (!price || price <= 0) return "Please enter a valid price";
    if (!fileURL) return "Please upload an image";
    if (isNaN(parseFloat(price))) return "Price must be a valid number";
    return null;
  };

  const handleFileChange = useCallback(async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      updateMessage({
        type: "error",
        content: "Please upload a valid image file (JPEG, PNG, or GIF)"
      });
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      updateMessage({
        type: "error",
        content: "File size must be less than 5MB"
      });
      return;
    }

    try {
      setIsUploading(true);
      updateMessage({
        type: "info",
        content: "Uploading image... Please wait"
      });

      const preview = URL.createObjectURL(file);
      setPreviewURL(preview);

      const data = new FormData();
      data.set("file", file);
      
      const response = await uploadFileToIPFS(data);
      if (response.success) {
        setFileURL(response.pinataURL);
        updateMessage({
          type: "success",
          content: "Image uploaded successfully!"
        });
      }
    } catch (error) {
      console.error("Error during file upload:", error);
      updateMessage({
        type: "error",
        content: "Failed to upload image. Please try again."
      });
    } finally {
      setIsUploading(false);
    }
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      updateMessage({ type: "error", content: error });
      return;
    }

    try {
      setIsProcessing(true);
      updateMessage({
        type: "info",
        content: "Creating your NFT... This may take a moment"
      });

      const metadataURL = await uploadJSONToIPFS(formParams);
      if (!metadataURL) throw new Error("Failed to upload metadata");

      const contract = new ethers.Contract(
        marketplace.address,
        marketplace.abi,
        signer
      );
      
      const price = ethers.parseEther(formParams.price);
      const transaction = await contract.createToken(metadataURL, price);
      await transaction.wait();

      updateMessage({
        type: "success",
        content: "NFT created successfully!"
      });
      
      updateFormParams({ name: "", description: "", price: "" });
      setFileURL(null);
      setPreviewURL(null);

      setTimeout(() => router.push("/"), 2000);
    } catch (error) {
      console.error("Error creating NFT:", error);
      updateMessage({
        type: "error",
        content: error.message || "Failed to create NFT. Please try again."
      });
    } finally {
      setIsProcessing(false);
    }
  }, [formParams, fileURL, signer, router]);

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="bg-gray-800 rounded-lg p-8 text-center mb-[50vh]">
            <AlertCircle className="mx-auto h-12 w-12 text-yellow-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Wallet Not Connected</h2>
            <p className="text-gray-400">Please connect your wallet to create and list NFTs</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-4xl font-bold">Create New NFT</h2>
            <div className="text-sm text-gray-400"><span className="text-red-600">*</span> Required fields</div>
          </div>

          <div className="bg-gray-800 rounded-lg p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <label className="block font-medium mb-2">
                    NFT Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="bg-gray-700 text-white rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={formParams.name}
                    onChange={(e) =>
                      updateFormParams({ ...formParams, name: e.target.value })
                    }
                    placeholder="Enter NFT name"
                    maxLength={100}
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    className="bg-gray-700 text-white rounded-lg px-4 py-2 w-full h-32 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={formParams.description}
                    onChange={(e) =>
                      updateFormParams({
                        ...formParams,
                        description: e.target.value,
                      })
                    }
                    placeholder="Describe your NFT"
                    maxLength={1000}
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2">
                    Price (ETH) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.001"
                    min="0"
                    className="bg-gray-700 text-white rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={formParams.price}
                    onChange={(e) =>
                      updateFormParams({ ...formParams, price: e.target.value })
                    }
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div>
                <label className="block font-medium mb-2">
                  Upload Image <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center relative">
                  {previewURL ? (
                    <div className="relative">
                      <img
                        src={previewURL}
                        alt="NFT Preview"
                        className="max-h-48 mx-auto rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewURL(null);
                          setFileURL(null);
                        }}
                        className="absolute top-2 right-2 bg-red-500 rounded-full p-1 hover:bg-red-600"
                      >
                        <span className="sr-only">Remove image</span>
                        ×
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="text-sm text-gray-400">
                        Drag and drop or click to upload
                        <br />
                        Max size: 5MB
                        <br />
                        Supported formats: JPEG, PNG, GIF
                      </div>
                    </div>
                  )}
                  <input
                    type="file"
                    accept=".jpeg,.jpg,.png,.gif"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                    disabled={isUploading}
                  />
                </div>
              </div>
            </div>
          </div>

          {message.content && (
            <Alert variant={message.type === "error" ? "destructive" : "info"} className="mb-8">
              <AlertDescription>
                {message.type === "error" && <AlertCircle className="w-5 h-5 inline-block mr-2" />}
                {message.content}
              </AlertDescription>
            </Alert>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={isProcessing || isUploading}
          >
            {isProcessing ? (
              <Loader2 className="h-5 w-5 inline-block animate-spin mr-2" />
            ) : (
              "List NFT"
            )}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
