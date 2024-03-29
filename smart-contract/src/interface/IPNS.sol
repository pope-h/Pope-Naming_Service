// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

interface IPNS {
    function registerUsername(string calldata _username, string calldata _imageCID) external;

    function getAddressForUsername(string calldata _username) external view returns (address);

    function getImageCIDForUsername(string calldata _username) external view returns (string memory);
}