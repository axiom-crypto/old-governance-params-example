import { Constants } from "@/shared/constants";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { goerli } from "viem/chains";

const projectId = Constants.WALLETCONNECT_PROJECT_ID!

const metadata = {
  name: 'Governance Parameters Example',
  description: 'Users who qualify can autonomously update governance parameters generating a Zero Knowledge proof that they minted an NFT and are still holding it.',
  url: 'https://www.axiom.xyz',
  icons: ['']
}

const chains = [goerli]

export const config = defaultWagmiConfig({ chains, projectId, metadata })

createWeb3Modal({ wagmiConfig: config, projectId, chains })