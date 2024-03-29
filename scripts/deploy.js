const hre = require('hardhat');

async function main() {
  const Contract = await hre.ethers.getContractFactory('NFT');
  const contract = await Contract.deploy('Test NFT 1155', 'TN15', 'localhost');

  await contract.deployed();

  console.log('Contract deployed to:', contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
