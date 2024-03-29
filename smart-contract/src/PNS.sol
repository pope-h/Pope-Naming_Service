// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PNS {
    struct Record {
        string username;
        string imageCID;
        address owner;
    }

    bytes32[] public keys;
    mapping(bytes32 => Record) private records;
    mapping(address => bytes32) private owners;

    event UsernameRegistered(string indexed _username, address indexed owner, string _imageCID);

    function registerUsername(string calldata _username, string calldata _imageCID) external {
        bytes32 key = keccak256(abi.encodePacked(_username));
        require(records[key].owner == address(0), "Name already registered");
        require(owners[msg.sender] == bytes32(0), "Address already registered a username");

        records[key] = Record({
            username: _username,
            imageCID: _imageCID,
            owner: msg.sender
        });

        owners[msg.sender] = key;
        keys.push(key);

        emit UsernameRegistered(_username, msg.sender, _imageCID);
    }

    function getAddressForUsername(string calldata _username) external view returns (address) {
        bytes32 key = keccak256(abi.encodePacked(_username));
        return records[key].owner;
    }

    function getImageCIDForUsername(string calldata _username) external view returns (string memory) {
        bytes32 key = keccak256(abi.encodePacked(_username));
        return records[key].imageCID;
    }

    function getTotalUsers() external view returns (uint) {
        return keys.length;
    }

    function getUserByIndex(uint index) external view returns (string memory username, string memory imageCID) {
        require(index < keys.length, "Index out of bounds");

        Record memory record = records[keys[index]];
        return (record.username, record.imageCID);
    }
}