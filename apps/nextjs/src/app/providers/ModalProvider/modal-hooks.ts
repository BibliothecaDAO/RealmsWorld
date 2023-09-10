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
import { ModalContext } from './modal-context';
import { XOctagon } from 'lucide-react';

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

export const useModal = () => {
  return {
    ...useContext(ModalContext)
  };
};

export const useHideModal = () => {
  const { hideModal } = useContext(ModalContext);

  return useCallback(() => {
    hideModal();
  }, [hideModal]);
};

export const useProgressModal = (steps = []) => {
  const { showModal } = useContext(ModalContext);
  const { containerStyle } = TRANSACTION_MODAL_STYLE;

  return useCallback(
    (title: string, message: any, activeStep = 0, type = ModalType.INFO) => {
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

export const useTransactionSubmittedModal = (steps: any) => {
  const { showModal } = useContext(ModalContext);
  const { containerStyle, buttonProps } = TRANSACTION_MODAL_STYLE;

  return useCallback(
    (transfer: any) => {
      showModal({
        header: {
          components: [
            {
              path: 'ui/stepper',
              props: {
                steps,
                activeStep: steps.length
              }
            },
            {
              path: 'modal/TransactionSubmittedModal/TransactionSubmittedModalHeader'
            }
          ]
        },
        body: {
          components: [
            {
              path: 'modal/TransactionSubmittedModal/TransactionSubmittedModalBody',
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
              path: 'modal/TransactionSubmittedModal/TransactionSubmittedModalButton',
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
  const { showModal } = useContext(ModalContext);
  const { buttonProps, containerStyle } = MODAL_HEADER_WITH_ICON_STYLE;

  return useCallback(
    (title: string, text: string) => {
      showModal({
        header: {
          components: [
            {
              path: 'modal/ModalHeaderWithIcon',
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
              path: 'modal/ErrorModal',
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