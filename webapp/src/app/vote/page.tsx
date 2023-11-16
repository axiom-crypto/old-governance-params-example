import BuildQuery from "@/components/vote/BuildQuery";
import Title from "@/components/ui/Title";
import UselessGovernanceToken from "@/lib/abi/UselessGovernanceToken.json";
import { CircuitInputs } from "@/lib/circuit";
import { publicClient } from "@/lib/viemClient";
import { Constants } from "@/shared/constants";
import { AxiomV2Callback, bytes32, getFunctionSelector } from "@axiom-crypto/core";

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

export default async function Vote({ searchParams }: PageProps) {
  const connected = searchParams?.connected as string ?? "";
  const txHash = searchParams?.txHash as string ?? "";
  const blockNumber = searchParams?.blockNumber as string ?? "";
  const tokenId = searchParams?.tokenId as string ?? "";

  const tx = await publicClient.getTransaction({
    hash: txHash as `0x${string}`,
  });
  const txIdx = tx.transactionIndex.toString();

  const inputs: CircuitInputs = {
    nftContract: Constants.NFT_ADDR as `0x${string}`,
    mintBlock: Number(blockNumber),
    mintTxNo: Number(txIdx),
    vote: 0,  // Update this value later inside `BuildQuery` component
  }
  const callback: AxiomV2Callback = {
    target: Constants.ERC20_ADDR as `0x${string}`,
    extraData: bytes32(connected),
  }

  return (
    <>
      <Title>
        Vote
      </Title>
      <div className="flex flex-col items-center text-center gap-0">
        <p>
          Vote <b>YES</b> to increase tax and staking rates by <span className="font-mono">0.1%</span>.
        </p>
        <p>
          Vote <b>NO</b> to decrease tax and staking rates by <span className="font-mono">0.1%</span>.
        </p>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <BuildQuery
          inputs={inputs}
          callback={callback}
          tokenId={tokenId}
          contractAbi={UselessGovernanceToken.abi}
        />
      </div>
    </>
  )
}
