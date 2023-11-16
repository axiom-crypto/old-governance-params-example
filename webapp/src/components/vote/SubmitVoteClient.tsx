"use client";

import { Constants } from "@/shared/constants";
import { useCallback, useEffect, useState } from "react";
import {
  useAccount,
  useContractEvent,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";
import { formatEther } from "viem";
import Link from "next/link";
import { useAxiomCircuit } from '@axiom-crypto/react';

export default function SubmitVoteClient({
  contractAbi,
  tokenId,
}: {
  contractAbi: any[],
  tokenId: string,
}) {
  const { address } = useAccount();
  const router = useRouter();
  const { axiom, builtQuery, payment } = useAxiomCircuit();
  const [showExplorerLink, setShowExplorerLink] = useState(false);

  const axiomQueryAbi = axiom.getAxiomQueryAbi();
  const axiomQueryAddress = axiom.getAxiomQueryAddress();

  const queryParams = [
    builtQuery?.sourceChainId,
    builtQuery?.dataQueryHash,
    builtQuery?.computeQuery,
    builtQuery?.callback,
    builtQuery?.userSalt,
    builtQuery?.maxFeePerGas,
    builtQuery?.callbackGasLimit,
    address,
    builtQuery?.dataQuery
  ];

  // Prepare hook for the sendQuery transaction
  const { config } = usePrepareContractWrite({
    address: axiomQueryAddress as `0x${string}`,
    abi: axiomQueryAbi,
    functionName: 'sendQuery',
    args: queryParams,
    value: BigInt(payment ?? 0),
  });
  const { data, isLoading, isSuccess, isError, write } = useContractWrite(config);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setShowExplorerLink(true);
      }, 30000);
    }
  }, [isSuccess, setShowExplorerLink]);

  const proofGeneratedAction = useCallback(() => {
    router.push(`success/?address=${address}`);
  }, [router, address]);

  const proofValidationFailedAction = useCallback(() => {
    if (isError) {
      router.push(`fail/?address=${address}`);
    }
  }, [isError, router, address]);

  // Monitor contract for `ParametersUpdated` event
  useContractEvent({
    address: Constants.ERC20_ADDR as `0x${string}`,
    abi: contractAbi,
    eventName: 'ParametersUpdated',
    listener(log) {
      console.log("Voted successfully");
      console.log(log);
      proofGeneratedAction();
    },
  });

  const renderButtonText = () => {
    if (isSuccess) {
      return "Waiting for callback...";
    }
    if (isLoading) {
      return "Confrm transaction in wallet...";
    }
    return "Submit Vote";
  }

  const renderVoteProofText = () => {
    return `Generating the proof for the vote costs ${formatEther(BigInt(payment ?? 0)).toString()}ETH`;
  }

  const renderExplorerLink = () => {
    if (!showExplorerLink) {
      return null;
    }
    return (
      <Link href={`https://explorer.axiom.xyz/v2/goerli/mock`} target="_blank">
        View status on Axiom Explorer
      </Link>
    )
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        disabled={isLoading || isSuccess}
        onClick={() => write?.()}
      >
        {renderButtonText()}
      </Button>
      <div className="flex flex-col items-center text-sm gap-2">
        <div>
          {isSuccess ? "Proof generation may take up to 3 minutes" : renderVoteProofText()}
        </div>
        {renderExplorerLink()}
      </div>
    </div>
  )
}