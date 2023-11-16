"use client";

import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import UselessNFT from "@/lib/abi/UselessNFT.json";
import { Constants } from "@/shared/constants";
import Button from "@/components/ui/Button";

export default function MintNft() {
  const { config } = usePrepareContractWrite({
    address: Constants.NFT_ADDR as `0x${string}`,
    abi: UselessNFT.abi,
    functionName: 'mint',
    args: [],
  });
  
  const { data, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })
  
  const renderButtonText = () => {
    if (isLoading) {
      return "Loading...";
    } else if (isSuccess) {
      return "Minted!";
    } else if (isError) {
      return "Error";
    } else {
      return "Mint NFT";
    }
  }

  return (
    <Button 
      disabled={isLoading || isSuccess} 
      onClick={() => write?.()}
    >
      { renderButtonText() }
    </Button>
  )
};