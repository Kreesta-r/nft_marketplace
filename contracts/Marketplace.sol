// contracts/Marketplace.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "./NFT.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Marketplace is Ownable {
    struct Listing {
        uint256 price;
        address seller;
    }

    mapping(uint256 => Listing) public listings;
    IERC721 public nftContract;

    constructor(address initialOwner, address _nftContract) Ownable(initialOwner) {
        nftContract = IERC721(_nftContract);
    }

    function listItem(uint256 tokenId, uint256 price) public {
        require(nftContract.ownerOf(tokenId) == msg.sender, "Not the owner");
        require(price > 0, "Price must be greater than zero");

        listings[tokenId] = Listing(price, msg.sender);
    }

    function buyItem(uint256 tokenId) public payable {
        Listing memory listing = listings[tokenId];
        require(listing.price > 0, "Item not for sale");
        require(msg.value >= listing.price, "Insufficient funds");

        delete listings[tokenId];
        payable(listing.seller).transfer(listing.price);
        nftContract.transferFrom(listing.seller, msg.sender, tokenId);
    }
}
