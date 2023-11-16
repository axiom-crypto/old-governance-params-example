import MainLayout from '@/components/layout/MainLayout'
import MintNft from '@/components/nftContract/MintNft'
import Parameters from '@/components/tokenContract/Parameters'
import ConnectWallet from '@/components/ui/ConnectWallet'
import LinkButton from '@/components/ui/LinkButton'
import Title from '@/components/ui/Title'
import { forwardSearchParams } from '@/lib/utils'

interface PageProps {
  params: Params;
  searchParams: SearchParams;
}

interface Params {
  slug: string;
}

interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export default async function Home({ searchParams }: PageProps) {
  const connected = searchParams?.connected as string ?? "";
  console.log(searchParams);

  const renderButton = () => {
    if (connected) {
      return <LinkButton
        label="Check Eligibility"
        href={"/check?" + forwardSearchParams(searchParams)}
      />;
    }
    return <ConnectWallet connected={connected} />;
  }

  return (
    <>
      <Title>
        Governance Parameters Example
      </Title>
      <div className="flex flex-col text-center items-center gap-4">
        <p>
          This autonomous governance example app gives users who have <b>minted</b> a project&apos;s NFT 
          <b>and</b> are still holding it the ability to vote on a proposal and instantaneously contribute to the outcome.
        </p>
        <p>
          Users who qualify have the ability to increase the transfer tax rate and staking rate on an example ERC-20 
          token called UselessToken (which does not actually implement tax or staking functionality). 
        </p>
        <p>
          The minting qualifications are low in this example so that anyone can run it, but you can imagine that if you were to 
          have this run 1 year after an NFT&apos;s mint, it would be a very exclusive group of users who would be 
          able to participate.
        </p>
        <p>
          Eligible users who vote YES (1) on the proposal will increase the tax and staking rates by 
          <span className="font-mono">0.1%</span>, while users who vote NO (2) will decrease the tax and staking rates 
          by <span className="font-mono">0.1%</span>.
        </p>
        <Parameters />
        <div className="flex flex-col gap-4 w-fit">
          <div className="flex flex-col gap-2">
            <p className="text-lg text-highlight">
              <b>Step 1</b>
            </p>
            <MintNft />
            <p className="text-sm">
              You may need to wait a minute or two for the indexer to pick up the Mint event
            </p>
          </div>
          <div className="flex flex-col gap-2 ">
            <p className="text-lg text-highlight">
              <b>Step 2</b>
            </p>
            { renderButton() }
          </div>
        </div>
      </div>
    </>
  )
}
