import {
    //useErrorModal,
    useHideModal,
    useProgressModal,
    // useTransactionSubmittedModal
} from '../app/providers/BridgeModalProvider';
/*import {useTokens} from '../providers/TokensProvider';
import {useAmount} from '../providers/TransferProvider';*/

export const useTransfer = (steps: any) => {
    const showProgressModal = useProgressModal(steps);
    //const showErrorModal = useErrorModal();
    const hideModal = useHideModal();
    //const showTransactionSubmittedModal = useTransactionSubmittedModal(steps);
    /*const {updateTokenBalance} = useTokens();
    const [, , clearAmount] = useAmount();*/

    const handleProgress = (progress: any) => {
        showProgressModal(progress.type, progress.message, progress.activeStep);
    };

    const handleError = (error: any) => {
        hideModal();
        //showErrorModal(error.type, error.message);
    };

    const handleData = (transfer: any) => {
        //showTransactionSubmittedModal(transfer);
        /* updateTokenBalance(transfer.symbol);
         clearAmount();*/
    };

    return {
        handleProgress,
        handleError,
        handleData
    };
};