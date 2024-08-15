import { RewardPool } from "@/abi/L2/RewardPool";
import { VeLords } from "@/abi/L2/VeLords";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import {
  Address,
  useAccount,
  useContract,
  useSendTransaction,
} from "@starknet-react/core";

import { StakingAddresses } from "@realms-world/constants";

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

  const manageLock = async (amount: number, unlockTime: Date) => {
    await manageLordsLock([
      veLords?.populate("manage_lock", [amount, unlockTime, address]),
    ]);
  };

  const claim = async (recipient: Address) => {
    const endRecipient = recipient ?? address;

    if (!endRecipient) {
      return;
    }
    await claimRewards([rewardPool?.populate("claim", [endRecipient])]);
  };
  return { manageLock, claim };
};