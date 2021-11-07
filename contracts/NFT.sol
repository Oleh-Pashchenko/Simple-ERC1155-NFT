// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract NFT is ERC1155, Ownable {
    using SafeMath for uint256;

    mapping(uint256 => address) public creators;
    mapping(uint256 => uint256) public tokenSupply;

    string public name;
    string public symbol;

    uint256 private _currentTokenId = 0;

    modifier creatorOnly(uint256 _id) {
        require(
            creators[_id] == msg.sender,
            "NFT#creatorOnly: Only creator allowed"
        );
        _;
    }

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _uri
    ) ERC1155(_uri) {
        name = _name;
        symbol = _symbol;
    }

    function setURI(string memory _newUri) public onlyOwner {
        _setURI(_newUri);
    }

    function mint(
        address _account,
        uint256 _id,
        uint256 _amount,
        bytes memory _data
    ) external onlyOwner {
        _mint(_account, _id, _amount, _data);
        tokenSupply[_id] = tokenSupply[_id].add(_amount);
    }

    function burn(
        address _account,
        uint256 _id,
        uint256 _amount
    ) external {
        require(msg.sender == _account, "NFT#burn: Only your account");
        _burn(_account, _id, _amount);
    }

    function create(
        address _initialOwner,
        uint256 _initialSupply,
        bytes memory _data
    ) external onlyOwner returns (uint256) {
        uint256 id = _getNextTokenID();
        _incrementTokenId();
        creators[id] = msg.sender;

        _mint(_initialOwner, id, _initialSupply, _data);
        tokenSupply[id] = _initialSupply;

        return id;
    }

    function totalSupply(uint256 _id) public view returns (uint256) {
        return tokenSupply[_id];
    }

    function _getNextTokenID() private view returns (uint256) {
        return _currentTokenId.add(1);
    }

    function _incrementTokenId() private {
        _currentTokenId++;
    }
}
