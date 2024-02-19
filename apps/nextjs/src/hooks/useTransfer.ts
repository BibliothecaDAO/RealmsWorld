/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useErrorModal,
  useHideModal,
  useProgressModal,
  useTransactionSubmittedModal,
} from "@/app/providers/ModalProvider";
import { useWalletsProviderContext } from "@/app/providers/WalletsProvider";

/*import {useTokens} from '../providers/TokensProvider';
import {useAmount} from '../providers/TransferProvider';*/

export const useTransfer = (steps: any) => {
  const showProgressModal = useProgressModal(steps);
  const showErrorModal = useErrorModal();
  const hideModal = useHideModal();
  const showTransactionSubmittedModal = useTransactionSubmittedModal(steps);
  /*const {updateTokenBalance} = useTokens();
    const [, , clearAmount] = useAmount();*/
  const { refetch } = useWalletsProviderContext();

  const handleProgress = (progress: any) => {
    showProgressModal(progress.type, progress.message, progress.activeStep);
  };

  const handleError = (error: any) => {
    hideModal();
    console.log("show error modal");
    showErrorModal(error.type, error.message);
  };

  const handleData = (transfer: any) => {
    showTransactionSubmittedModal(transfer);
    refetch();
    /*updateTokenBalance(transfer.symbol);
         clearAmount();*/
  };

  return {
    handleProgress,
    handleError,
    handleData,
  };
};
