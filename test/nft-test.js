const { expect } = require('chai');
const { ethers } = require('hardhat');
let Contract;
let contract;
let owner;
let addr1;
let addr2;
let addrs;

beforeEach(async function () {
  Contract = await ethers.getContractFactory('NFT');
  [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

  contract = await Contract.deploy('NFT', 'NFT', 'localhost');
});

describe('NFT', function () {
  it('Should set the right owner', async function () {
    expect(await contract.owner()).to.equal(owner.address);
  });

  it('Should get default URI', async function () {
    expect(await contract.uri(0)).to.equal('localhost');
  });

  it('Should set URI', async function () {
    const setURITx = await contract.setURI('localhost1');
    await setURITx.wait();

    expect(await contract.uri(0)).to.equal('localhost1');
  });

  it('Should create new token', async function () {
    const setURITx = await contract.create(owner.address, 1, 0x0);
    await setURITx.wait();
    expect(await contract.balanceOf(owner.address, 1)).to.equal(1);
  });

  it('Should fail if not owner tries to mint', async function () {
    await expect(
      contract.connect(addr1).mint(addr1.address, 1, 1, 0x0)
    ).to.be.revertedWith('Ownable: caller is not the owner');
  });
});
