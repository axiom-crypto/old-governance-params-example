import {
  addToCallback,
  CircuitValue,
  getReceipt,
  checkEqual,
  isEqual,
  or,
} from '@axiom-crypto/client';
export const inputs = {
  nftContract: "0x7EDC6e6c487658075f6A359e68E4C223a54dCfC9",
  mintBlock: 10040663,
  mintTxNo: 2,
  vote: 1
};
export type CircuitInputType = typeof inputs;
export interface CircuitInputs extends CircuitInputType { }
export interface CircuitValueInputs {
  nftContract: CircuitValue,
  mintBlock: CircuitValue,
  mintTxNo: CircuitValue,
  vote: CircuitValue,
}

export const autonomousGovernance = async({
  nftContract,
  mintBlock,
  mintTxNo,
  vote,
}: CircuitValueInputs) => {
    // Autonomous Community Governance
  // Example NFT mint tx here:
  // https://goerli.etherscan.io/tx/0x562053660e01a69b7739d8953fb923bd1312b5a4439c6a88d5eaccee6fb1895f#eventlog
  //
  // Transfer (index_topic_1 address from, index_topic_2 address to, uint256 tokens)
  const transferEventSchema =
    "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";
  const transferLog = (await getReceipt(mintBlock, mintTxNo)).log(0);

  // 1. check that the address that emitted the transfer is the NFT contract
  const contractAddr = await transferLog.address();
  checkEqual(contractAddr.toCircuitValue(), nftContract);

  // 2. check that the tx is a mint tx (from = address(0))
  const fromAddr = await transferLog.topic(1, transferEventSchema);
  checkEqual(fromAddr.toCircuitValue(), 0);

  // 3. get the minter's address and the token id of the NFT
  const toAddr = await transferLog.topic(2, transferEventSchema);
  const tokenId = await transferLog.topic(3, transferEventSchema);

  // 4. check that the vote is 1 (yes) or 2 (no)
  const isOne = isEqual(1, vote);
  const isTwo = isEqual(2, vote);
  const isVoteValid = or(isOne, isTwo);
  checkEqual(isVoteValid, 1);

  // 5. add [nft holder address, tokenId, vote] to the callback
  // to be passed to the on-chain contract for consumption
  addToCallback(toAddr);
  addToCallback(tokenId);
  addToCallback(vote);
};
