// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PNS {
    struct Record {
        string username;
        string imageHash;
        address owner;
    }

    mapping(bytes32 => Record) private records;

    event UsernameRegistered(string indexed _username, address indexed owner, string _imageHash);

    function registerUsername(string calldata _username, string calldata _imageHash) external {
        bytes32 key = keccak256(abi.encodePacked(_username));
        require(records[key].owner == address(0), "Name already registered");
        
        records[key] = Record({
            username: _username,
            imageHash: _imageHash,
            owner: msg.sender
        });

        emit UsernameRegistered(_username, msg.sender, _imageHash);
    }

    function getAddressForUsername(string calldata _username) external view returns (address) {
        bytes32 key = keccak256(abi.encodePacked(_username));
        return records[key].owner;
    }

    function getImageHashForUsername(string calldata _username) external view returns (string memory) {
        bytes32 key = keccak256(abi.encodePacked(_username));
        return records[key].imageHash;
    }
}