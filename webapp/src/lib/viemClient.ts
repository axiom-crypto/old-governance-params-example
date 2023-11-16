import { createPublicClient, http } from 'viem'
import { goerli } from 'viem/chains'

export const publicClient = createPublicClient({
  chain: goerli,
  transport: http(process.env.NEXT_PUBLIC_ALCHEMY_URI_GOERLI as string)
})