"use client";

import { useAxiomCircuit } from "@axiom-crypto/react";
import { CircuitInputs } from "../../lib/circuit";
import { AxiomV2Callback } from "@axiom-crypto/core";
import { useEffect, useState } from "react";
import LoadingAnimation from "../ui/LoadingAnimation";
import SubmitVoteClient from "./SubmitVoteClient";
import { useAccount, useContractRead } from "wagmi";
import { Constants } from "@/shared/constants";
import LinkButton from "../ui/LinkButton";

export default function BuildQuery({
  inputs,
  callback,
  tokenId,
  contractAbi
}: {
  inputs: CircuitInputs,
  callback: AxiomV2Callback,
  tokenId: string,
  contractAbi: any[],
}) {
  const { address } = useAccount();
  const [voteValue, setVoteValue] = useState<number | null>(null);
  const {
    build,
    builtQuery,
    payment,
    setParams,
    areParamsSet
  } = useAxiomCircuit();

  useEffect(() => {
    if (voteValue === null) {
      return;
    }
    const inputsWithVote = {
      ...inputs,
      vote: voteValue,
    };
    setParams(inputsWithVote, callback);
  }, [voteValue, setParams, inputs, callback]);

  useEffect(() => {
    const buildQuery = async () => {
      if (voteValue === null) {
        return;
      }
      if (!areParamsSet) {
        return;
      }
      await build();
    };
    buildQuery();
  }, [voteValue, build, areParamsSet]);

  // Check that the user has not voted with this tokenId yet
  const { data: didUserVote, isLoading: didUserVoteLoading } = useContractRead({
    address: Constants.ERC20_ADDR as `0x${string}`,
    abi: contractAbi,
    functionName: 'didUserVote',
    args: [address, tokenId],
  });
  console.log("didUserVote?", didUserVote);

  if (!!didUserVote) {
    return (
      <div className="flex flex-col items-center text-center gap-2">
        <p>
          User has already voted with tokenId {BigInt(tokenId).toString()}.
        </p>
        <LinkButton
          label="Go back"
          href="/"
        />
      </div>
    )
  }

  if (voteValue === null) {
    return (
      <div className="flex flex-col items-center text-center gap-2">
        <p>
          Voting with tokenId {BigInt(tokenId).toString()}.
        </p>
        <div className="grid grid-cols-2 gap-4 w-fit">
          <div className="flex flex-row font-mono gap-2">
            <input type="radio" name="vote" value={1} onChange={() => setVoteValue(1)} />
            YES
          </div>
          <div className="flex flex-row font-mono gap-2">
            <input type="radio" name="vote" value={2} onChange={() => setVoteValue(2)} />
            NO
          </div>
        </div>
      </div>
    )
  }

  if (!builtQuery || !payment) {
    return (
      <div className="flex flex-row items-center font-mono gap-2">
        {"Building Query"} <LoadingAnimation />
      </div>
    );
  }

  

  return <SubmitVoteClient />;
}
