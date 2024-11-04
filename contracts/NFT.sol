// contracts/NFT.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC721, Ownable {
    uint256 public tokenCounter;

    constructor(address initialOwner) ERC721("NFT Marketplace Token", "NFTM") Ownable(initialOwner) {
        tokenCounter = 0;
    }

    function createToken(address to) public onlyOwner returns (uint256) {
        tokenCounter++;
        _safeMint(to, tokenCounter);
        return tokenCounter;
    }
}
