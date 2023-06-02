"use client";

//import {NetworkType, WalletStatus} from '@starkware-industries/commons-js-enums';
import { useCallback, useContext, useEffect } from 'react';


export const ModalType = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error'
};

//import {useL2Wallet} from '../WalletsProvider';
import { BridgeModalContext } from './bridge-modal-context';
import { AlertCircle, XOctagon } from 'lucide-react';

const TRANSACTION_MODAL_STYLE = {
  containerStyle: {
    width: '495px',
    padding: '32px'
  },
  buttonProps: {
    height: '48px',
    style: {
      fontSize: '12px',
      fontWeight: '600',
      lineHeight: '18px',
      margin: '8px 8px'
    }
  }
};

const MODAL_HEADER_WITH_ICON_STYLE = {
  containerStyle: {
    width: '466px',
    padding: '24px'
  },
  buttonProps: {
    height: '52px',
    style: {
      margin: '0'
    }
  }
};

export const useBridgeModal = () => {
  return {
    ...useContext(BridgeModalContext)
  };
};

export const useHideModal = () => {
  const { hideModal } = useContext(BridgeModalContext);

  return useCallback(() => {
    hideModal();
  }, [hideModal]);
};

export const useProgressModal = (steps = []) => {
  const { showModal } = useContext(BridgeModalContext);
  const { containerStyle } = TRANSACTION_MODAL_STYLE;

  return useCallback(
    (title, message, activeStep = 0, type = ModalType.INFO) => {
      console.log('showing progress modal')
      showModal({
        header: {
          components: steps.length > 0 && [
            {
              path: 'ui/stepper',
              props: {
                steps,
                activeStep
              }
            },
            {
              path: 'modal/ProgressModal/ProgressModalHeader',
              props: {
                title
              }
            }
          ]
        },
        body: {
          components: [
            {
              path: 'modal/ProgressModal/ProgressModalBody',
              props: {
                message
              }
            }
          ]
        },
        type,
        containerStyle
      });
    },
    [showModal]
  );
};

/*export const useTransactionSubmittedModal = steps => {
  const { showModal } = useContext(BridgeModalContext);
  const { containerStyle, buttonProps } = TRANSACTION_MODAL_STYLE;

  return useCallback(
    transfer => {
      showModal({
        header: {
          components: [
            {
              path: 'UI/Stepper/Stepper',
              props: {
                steps,
                activeStep: steps.length
              }
            },
            {
              path: 'UI/Modal/TransactionSubmittedModal/TransactionSubmittedModalHeader/TransactionSubmittedModalHeader'
            }
          ]
        },
        body: {
          components: [
            {
              path: 'UI/Modal/TransactionSubmittedModal/TransactionSubmittedModalBody/TransactionSubmittedModalBody',
              props: {
                transfer
              }
            }
          ]
        },
        footer: {
          withButtons: true,
          components: [
            {
              path: 'UI/Modal/TransactionSubmittedModal/TransactionSubmittedModalButton',
              props: {
                transfer,
                buttonProps
              }
            }
          ],
          buttonProps
        },
        containerStyle
      });
    },
    [showModal]
  );
};

export const useErrorModal = () => {
  const { showModal } = useContext(BridgeModalContext);
  const { buttonProps, containerStyle } = MODAL_HEADER_WITH_ICON_STYLE;

  return useCallback(
    (title, text) => {
      showModal({
        header: {
          components: [
            {
              path: 'UI/Modal/ModalHeaderWithIcon/ModalHeaderWithIcon',
              props: {
                title,
                icon: XOctagon
              }
            }
          ]
        },
        body: {
          components: [
            {
              path: 'UI/Modal/ErrorModal/ErrorModal',
              props: {
                text
              }
            }
          ]
        },
        footer: {
          withButtons: true,
          buttonProps
        },
        containerStyle,
        type: ModalType.ERROR
      });
    },
    [showModal]
  );
};

/*export const useOnboardingModal = () => {
  const {showModal} = useContext(ModalContext);
  const {titleTxt} = useOnboardingModalTranslation();
  const {buttonProps, containerStyle} = MODAL_HEADER_WITH_ICON_STYLE;

  return useCallback(() => {
    showModal({
      header: {
        components: [
          {
            path: 'UI/Modal/ModalHeaderWithIcon/ModalHeaderWithIcon',
            props: {
              icon: AlertCircle,
              title: titleTxt
            }
          }
        ]
      },
      body: {
        components: [
          {
            path: 'UI/Modal/OnboardingModal/OnboardingModal'
          }
        ]
      },
      footer: {
        withButtons: true,
        buttonProps
      },
      containerStyle
    });
  }, [showModal]);
};

export const useLoginModal = () => {
  const {showModal, show} = useContext(ModalContext);
  const prevShow = usePrevious(show);
  const {status, resetWallet} = useL2Wallet();

  useEffect(() => {
    // reset L2 wallet if the user closed the modal on connecting
    if (prevShow && !show && status === WalletStatus.CONNECTING) {
      resetWallet();
    }
  }, [show, status]);

  return useCallback(
    (networkName = NetworkType.L1) => {
      showModal({
        withHeader: false,
        body: {
          components: [
            {
              path: 'UI/Modal/LoginModal/LoginModal',
              props: {networkName}
            }
          ]
        },
        containerStyle: {
          background: 'unset',
          boxShadow: 'unset',
          width: '464px'
        },
        exitable: true
      });
    },
    [showModal]
  );
};

export const useBlockedAddressModal = () => {
  const {showModal} = useContext(ModalContext);
  const {titleTxt, closeButtonTxt} = useBlockedAddressModalTranslation();
  const {buttonProps, containerStyle} = MODAL_HEADER_WITH_ICON_STYLE;

  return useCallback(
    account => {
      showModal({
        header: {
          components: [
            {
              path: 'UI/Modal/ModalHeaderWithIcon/ModalHeaderWithIcon',
              props: {
                icon: WarningIcon,
                title: titleTxt,
                subtitle: account
              }
            }
          ]
        },
        body: {
          components: [
            {
              path: 'UI/Modal/BlockedAddressModal/BlockedAddressModal'
            }
          ]
        },
        footer: {
          withButtons: true,
          buttonProps: {
            ...buttonProps,
            text: closeButtonTxt
          }
        },
        containerStyle
      });
    },
    [showModal]
  );
};*/