// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import { Script, console2 } from "forge-std/Script.sol";
import { UselessGovernanceToken } from '../src/UselessGovernanceToken.sol';
import { UselessNFT } from '../src/UselessNFT.sol';

contract DeployScript is Script {
    address public constant AXIOM_V2_QUERY_GOERLI_MOCK_ADDR = 0xf15cc7B983749686Cd1eCca656C3D3E46407DC1f;
    bytes32 public constant QUERY_SCHEMA = 0x00d0e4a5e7243fdfd411ca1f85c898215ddaa06b4161d35bbb064c84b80f555b;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        // Deploy NFT
        UselessNFT nft = new UselessNFT();

        // Mint NFT
        nft.mint();

        // Deploy Gov token
        UselessGovernanceToken ugt = new UselessGovernanceToken(
            address(nft),
            AXIOM_V2_QUERY_GOERLI_MOCK_ADDR,
            QUERY_SCHEMA,
            100, // 10.0% taxRate
            100  // 10.0% rewardRate
        );

        vm.stopBroadcast();
    }
}
