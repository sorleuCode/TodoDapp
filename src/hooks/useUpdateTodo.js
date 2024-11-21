import { useCallback } from "react"
import useContractInstance from "./useContractInstance";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { baseSepolia } from "@reown/appkit/networks";
import { ErrorDecoder } from "ethers-decode-error";
import { toast } from "react-toastify";



const useUpdateTodo = () => {

    const contract = useContractInstance(true);
    const { address } = useAppKitAccount();
    const { chainId } = useAppKitNetwork();

    return useCallback(async (index, title, description) => {if (!title || !description) {
        toast.error("Title and description are required");
        return;
      }

      if (!address) {
        toast.error("Please connect your wallet");
        return;
      }

      if (!contract) {
        toast.error("Contract not found");
        return;
      }

      if (Number(chainId) !== Number(baseSepolia.id)) {
        toast.error("You're not connected to baseSepolia");
        return;
      }

      try {
        const estimatedGas = await contract.updateTodo.estimateGas(
            index,
          title,
          description
        );

        const tx = await contract.updateTodo(index, title, description, {
          gasLimit: (estimatedGas * BigInt(120)) / BigInt(100),
        });

        const receipt = await tx.wait();
        

        if (receipt.status === 1) {
          toast.success("Todo updated successfully");
          return;
        }

        toast.error("Failed to update todo");
        return;
      } catch (error) {
        const errorDecoder = ErrorDecoder.create();
        const decodeError = await errorDecoder.decode(error);
        console.error("Error from upating todo", error);
        toast.error(decodeError.reason);
      }
    },
    [contract, address, chainId])
}

export default useUpdateTodo