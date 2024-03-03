/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useContext } from "react";
import { XOctagon } from "lucide-react";

import { ModalContext } from "./modal-context";

export const ModalType = {
  INFO: "info",
  SUCCESS: "success",
  WARNING: "warning",
  ERROR: "error",
};

const TRANSACTION_MODAL_STYLE = {
  containerStyle: {
    width: "495px",
    padding: "32px",
  },
  buttonProps: {
    height: "48px",
    style: {
      fontSize: "12px",
      fontWeight: "600",
      lineHeight: "18px",
      margin: "8px 8px",
    },
  },
};

const MODAL_HEADER_WITH_ICON_STYLE = {
  containerStyle: {
    width: "466px",
    padding: "24px",
  },
  buttonProps: {
    height: "52px",
    style: {
      margin: "0",
    },
  },
};

export const useModal = () => {
  return {
    ...useContext(ModalContext),
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
              path: "stepper",
              props: {
                steps,
                activeStep,
              },
            },
            {
              path: "ProgressModal/ProgressModalHeader",
              props: {
                title,
              },
            },
          ],
        },
        body: {
          components: [
            {
              path: "ProgressModal/ProgressModalBody",
              props: {
                message,
              },
            },
          ],
        },
        type,
        containerStyle,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [showModal],
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
              path: "stepper",
              props: {
                steps,
                activeStep: steps.length,
              },
            },
            {
              path: "TransactionSubmittedModal/TransactionSubmittedModalHeader",
            },
          ],
        },
        body: {
          components: [
            {
              path: "TransactionSubmittedModal/TransactionSubmittedModalBody",
              props: {
                transfer,
              },
            },
          ],
        },
        footer: {
          withButtons: true,
          components: [
            {
              path: "TransactionSubmittedModal/TransactionSubmittedModalButton",
              props: {
                transfer,
                buttonProps,
              },
            },
          ],
          buttonProps,
        },
        containerStyle,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [showModal],
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
              path: "ModalHeaderWithIcon",
              props: {
                title,
                icon: XOctagon,
              },
            },
          ],
        },
        body: {
          components: [
            {
              path: "ErrorModal",
              props: {
                text,
              },
            },
          ],
        },
        footer: {
          withButtons: true,
          buttonProps,
        },
        containerStyle,
        type: ModalType.ERROR,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [showModal],
  );
};
