export const Constants = Object.freeze({
  WALLETCONNECT_PROJECT_ID: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  EXPLORER_BASE_URL: "https://explorer.axiom.xyz/v2/goerli/query/",
  UNISWAP_UNIV_ROUTER_GOERLI: "0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD".toLowerCase(),

  NFT_ADDR: "0x47B2929bbd5d3BaE908599161B677cAa9571308e",
  ERC20_ADDR: "0xCeFe70F74b7A550f921cf3Dd6b2ff3e7A908b8E6",

  // Transfer (index_topic_1 address from, index_topic_2 address to, index_topic_3 uint256 tokenId)
  TRANSFER_EVENT_SCHEMA: "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
});
