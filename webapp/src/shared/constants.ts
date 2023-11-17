export const Constants = Object.freeze({
  WALLETCONNECT_PROJECT_ID: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  EXPLORER_BASE_URL: "https://explorer.axiom.xyz/v2/goerli/query/",
  UNISWAP_UNIV_ROUTER_GOERLI: "0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD".toLowerCase(),

  NFT_ADDR: "0x8106Faf19a9A4426515611bC6Ebf35F3170Fd81c",
  ERC20_ADDR: "0xbFAC66DDe0fC7c19e22D1AEC8D1b89F1704D980F",

  // Transfer (index_topic_1 address from, index_topic_2 address to, index_topic_3 uint256 tokenId)
  TRANSFER_EVENT_SCHEMA: "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
});
