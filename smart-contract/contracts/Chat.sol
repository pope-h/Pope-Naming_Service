// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./PNS.sol";

contract Chat {
    PNS pnsContract;
    mapping(address => mapping(address => string[])) private conversations;

    constructor(address _pnsAddress) {
        pnsContract = PNS(_pnsAddress);
    }

    event MessageSent(address indexed from, address indexed to, string message);

    function sendMessage(string calldata toName, string calldata message) external {
        address to = pnsContract.getAddressForUsername(toName);
        require(to != address(0), "Recipient not found");

        conversations[msg.sender][to].push(message);
        emit MessageSent(msg.sender, to, message);
    }

    function getConversationWith(string calldata withName) external view returns (string[] memory) {
        address with = pnsContract.getAddressForUsername(withName);
        require(with != address(0), "User not found");

        return conversations[msg.sender][with];
    }
}