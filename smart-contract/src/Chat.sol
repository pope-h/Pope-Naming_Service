// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interface/IPNS.sol";

contract Chat {
    IPNS pnsContract;

    struct Message {
        address sender;
        string content;
    }

    mapping(bytes32 => Message[]) private conversations;

    constructor(address _pnsAddress) {
        pnsContract = IPNS(_pnsAddress);
    }

    event MessageSent(address indexed from, address indexed to, string message);

    function sendMessage(string calldata toName, string calldata message) external {
        address to = pnsContract.getAddressForUsername(toName);
        require(to != address(0), "Recipient not found");

        bytes32 conversationKey = getConversationKey(msg.sender, to);
        conversations[conversationKey].push(Message({
            sender: msg.sender,
            content: message
        }));

        emit MessageSent(msg.sender, to, message);
    }

    function getConversationWith(string calldata withName) external view returns (Message[] memory) {
        address with = pnsContract.getAddressForUsername(withName);
        require(with != address(0), "User not found");

        bytes32 conversationKey = getConversationKey(msg.sender, with);
        return conversations[conversationKey];
    }

    function getConversationKey(address a, address b) private pure returns (bytes32) {
        return a < b ? keccak256(abi.encodePacked(a, b)) : keccak256(abi.encodePacked(b, a));
    }
}