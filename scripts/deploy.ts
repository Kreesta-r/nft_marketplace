import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  // Deploy the NFT contract, with the deployer as the initial owner
  const NFT = await ethers.getContractFactory("NFT");
  const nft = await NFT.deploy(deployer.address);
  await nft.deployed();
  console.log("NFT contract deployed to:", nft.address);

  // Deploy the Marketplace contract, passing the deployer as the initial owner and the nft contract address
  const Marketplace = await ethers.getContractFactory("Marketplace");
  const marketplace = await Marketplace.deploy(deployer.address, nft.address);
  await marketplace.deployed();
  console.log("Marketplace contract deployed to:", marketplace.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
