// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";
import "../src/Chat.sol";

contract ChatScript is Script {
    function setUp() public {}

    function run() public {
        address pns_contract_address = vm.envAddress("PNS_CONTRACT_ADDRESS");
        console.log("PNS Contract Address", pns_contract_address);
        uint private_key = vm.envUint("DEV_PRIVATE_KEY");
        address account = vm.addr(private_key);
        console.log("Account", account);
        
        // vm.broadcast();

        vm.startBroadcast(private_key);

        Chat chat = new Chat(pns_contract_address);
        console.log("Contract deployed to: ", address(chat));

        vm.stopBroadcast();
    }
}