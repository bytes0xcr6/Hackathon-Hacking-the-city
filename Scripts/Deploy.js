
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {

  const owner = await ethers.getSigners();

  const Holdings = await hre.ethers.getContractFactory("Holdings");
  const holdings = await Holdings.deploy();
  await holdings.deployed();

  console.log(`The Holdings contract has been deployed! Contract address is: ${holdings.address}`);

  const NFTs = await hre.ethers.getContractFactory("NFTs");
  const nfts = await NFTs.deploy();
  await nfts.deployed();

  // Pedro Mints his 3 NFTs and sends it to Hidden Art wallet (1 Blue, 2 Graffiti, 3 Grey)
  await nfts.safeMint( 1, "https://cristianricharte6test.infura-ipfs.io/ipfs/Qmca6LBrUSixZzyMBPN6RLsvYfBhT1UkEro1FES3Dy1or9");
  await nfts.safeMint( 2, "https://cristianricharte6test.infura-ipfs.io/ipfs/QmVjPTnYv1ve3ksVicvgYoBn52JjrHuS1X2ZBDwj54sitx");
  await nfts.safeMint( 3, "https://cristianricharte6test.infura-ipfs.io/ipfs/Qmcp76RK4DCRv7v7vaTcFtShmzv8jf12bRvzFC2Q27kD8u");

  console.log(`The NFTs contract has been deployed and set! Contract address is: ${nfts.address}`);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
