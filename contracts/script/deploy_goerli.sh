source .env
forge script script/Deploy.s.sol:DeployScript --private-key $PRIVATE_KEY_GOERLI --broadcast --rpc-url $PROVIDER_URI_GOERLI -vvvv --verify --etherscan-api-key $ETHERSCAN_API_KEY
cp out/UselessNFT.sol/UselessNFT.json ../webapp/src/lib/abi/UselessNFT.json
cp out/UselessGovernanceToken.sol/UselessGovernanceToken.json ../webapp/src/lib/abi/UselessGovernanceToken.json