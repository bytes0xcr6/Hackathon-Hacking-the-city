// With this Script we request NFTs URI, Holdings in the locked contract and remaining locked period.

const { ethers } =  require("ethers");

const NFTsAddress = "0x8247218edbe92F3e4c4298e166B1659DB56c2355";
const HoldingsAddress ="0x873E97fdB6ddC8C7604c9b167e4210cCe0eF03D7";

// Getting the blockchain provider
const INFURA_API_KEY = "<API-KEY>";
const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${INFURA_API_KEY}`
);

// Contracts ABI
const HoldingsABI = [
" function checkFunds(uint _year) public view returns(uint)", 
" function remainingLockedPeriod() public view returns (uint)"]

const NFTsABI = [
" function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory)"
]

// Declare the contract address, Contract inferface (ABI or functions we wan to interact) and provider
const HoldingsContract = new ethers.Contract(HoldingsAddress, HoldingsABI, provider);
const NFTsContract = new ethers.Contract(NFTsAddress, NFTsABI, provider);

const main = async() => {

    let year = new Date().getFullYear();
    // Getter for the total funds collected this year.
    const totalFunds = await HoldingsContract.checkFunds(year);
    // Getter for the remaining locked period to unlock the funds and transfer it to the most voted Artists
    const remainingLockedPeriod = await HoldingsContract.remainingLockedPeriod();
    // Getter for the JSON of that NFT ID
    const URI1 = await NFTsContract.tokenURI(1);
    const URI2 = await NFTsContract.tokenURI(2);
    const URI3 = await NFTsContract.tokenURI(3);

    
    
    console.log(`The total Funds currently collected this year is: ${totalFunds}`);
    console.log(`\nThe remaining locked period to unlock the funds is: ${remainingLockedPeriod}`);
    console.log(`\nThe URI/JSON of the NFT ID is: ${URI1}`)
    console.log(`\nThe URI/JSON of the NFT ID is: ${URI2}`)
    console.log(`\nThe URI/JSON of the NFT ID is: ${URI3}`)

}

main();

// Transfer Funds from the Smart contract to the most voted Artists, after the votes are submited and the funds unlocked
// (Amount -> total funds to transfer, WinnerAddres -> Most voted Artis Address)
async function lockFunds(amount, winnerAddress) {
    await HoldingsContract.transferFunds(amount, winnerAddress);
}
