import type { Address } from "@starknet-react/core";
import { L2_C1ERC20 } from "@/abi/L2/C1ERC20";
import { RewardPool } from "@/abi/L2/RewardPool";
import { VeLords } from "@/abi/L2/VeLords";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import {
  useAccount,
  useContract,
  useSendTransaction,
} from "@starknet-react/core";

import { LORDS, StakingAddresses } from "@realms-world/constants";

export const useVeLords = () => {
  const veLordsAddress = StakingAddresses.velords[SUPPORTED_L2_CHAIN_ID];
  const rewardPoolAddress = StakingAddresses.rewardpool[SUPPORTED_L2_CHAIN_ID];

  const { address } = useAccount();

  const { contract: veLords } = useContract({
    abi: VeLords,
    address: veLordsAddress as Address,
  });

  const { contract: rewardPool } = useContract({
    abi: RewardPool,
    address: rewardPoolAddress as Address,
  });
  const { contract: lordsContract } = useContract({
    abi: L2_C1ERC20,
    address: LORDS[SUPPORTED_L2_CHAIN_ID]?.address as `0x${string}`,
  });
  const {
    sendAsync: manageLordsLock,
    data: manageHash,
    isPending: manageIsSubmitting,
  } = useSendTransaction({});

  const {
    sendAsync: claimRewards,
    data: claimHash,
    isPending: claimIsSubmitting,
  } = useSendTransaction({});

  const {
    sendAsync: withdraw,
    data: withdrawHash,
    isPending: withdrawsSubmitting,
  } = useSendTransaction({
    calls: veLords && address ? [veLords?.populate("withdraw", [])] : undefined,
  });

  const manageLock = async (amount: bigint, unlockTime: number) => {
    console.log(unlockTime);
    console.log(amount);
    if (lordsContract) {
      await manageLordsLock([
        lordsContract?.populate("approve", [
          veLordsAddress as `0x${string}`, //Marketplace address
          amount,
          0,
        ]),
        veLords?.populate("manage_lock", [amount, unlockTime, address]),
      ]);
    }
  };

  const claim = async (recipient?: Address) => {
    const endRecipient = recipient ?? address;

    if (!endRecipient) {
      return;
    }
    return await claimRewards([rewardPool?.populate("claim", [endRecipient])]);
  };

  return { manageLock, claim, withdraw };
};
