import type {
  ComponentPropsWithoutRef,
  Dispatch,
  ReactElement,
  SetStateAction,
} from "react";
import React, { useEffect, useState } from "react";
import { useTimeDiff } from "@/hooks/useTimeDiff";
import { faGasPump } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Loader } from "lucide-react";

import type { RouterOutputs } from "@realms-world/api";
import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@realms-world/ui";

import ERC721LineItem from "../ERC721LineItem";
//import getChainBlockExplorerUrl from "../../lib/getChainBlockExplorerUrl";
import { CancelStep, ListCancelModalRender } from "./ListCancelModalRender";

const ModalCopy = {
  title: "Cancel Listing",
  ctaCancel: "Continue to Cancel",
  ctaAwaitingApproval: "Waiting for approval...",
  ctaAwaitingValidation: "Waiting for transaction to be validated",
  ctaClose: "Close",
};

interface Props {
  listingId?: string;
  token?: RouterOutputs["erc721Tokens"]["byId"];
  trigger?: React.ReactNode;
  copyOverrides?: Partial<typeof ModalCopy>;
  onClose?: (data: any, currentStep: CancelStep) => void;
  onCancelComplete?: (data: any) => void;
  onCancelError?: (error: Error, data: any) => void;
}

export function ListCancelModal({
  listingId,
  trigger,
  copyOverrides,
  token,
  onClose,
  onCancelComplete,
  onCancelError,
}: Props): ReactElement {
  const copy: typeof ModalCopy = { ...ModalCopy, ...copyOverrides };
  const [open, setOpen] = useState(false);

  return (
    <ListCancelModalRender token={token} listingId={listingId} open={open}>
      {({
        listing,
        tokenId,
        contract,
        cancelStep,
        transactionError,
        stepData,
        //totalUsd,
        blockExplorerName,
        cancelOrder,
      }) => {
        const expires = useTimeDiff(listing?.expiration);

        useEffect(() => {
          if (cancelStep === CancelStep.Complete && onCancelComplete) {
            const data = {
              listing,
              stepData: stepData,
            };
            onCancelComplete(data);
          }
        }, [cancelStep]);

        useEffect(() => {
          if (transactionError && onCancelError) {
            const data = {
              listing,
              stepData: stepData,
            };
            onCancelError(transactionError, data);
          }
        }, [transactionError]);

        const isListingAvailable = listing?.active;

        return (
          <Dialog
            open={open}
            onOpenChange={(open) => {
              if (!open && onClose) {
                const data = {
                  listing,
                  stepData: stepData,
                };
                onClose(data, cancelStep);
              }
              setOpen(open);
            }}
          >
            <DialogTrigger>{trigger}</DialogTrigger>
            <DialogContent>
              <DialogTitle>{copy.title}</DialogTitle>

              {!isListingAvailable && (
                <div className="flex flex-col gap-y-3 px-2">
                  <h6 className="text-center">
                    Selected listing is no longer available
                  </h6>
                </div>
              )}
              {isListingAvailable && cancelStep === CancelStep.Cancel && (
                <div className="flex flex-col">
                  {transactionError && (
                    <Alert
                      variant={"warning"}
                      message={transactionError.message}
                    />
                  )}
                  <div className="border-b p-2">
                    <ERC721LineItem
                      tokenDetails={token}
                      price={listing?.price}
                      // priceSubtitle="Price"
                      //usdPrice={totalUsd.toString()}
                      collection={
                        listing.criteria?.data?.collection?.name || ""
                      }
                      expires={expires}
                      quantity={listing?.quantityRemaining}
                    />
                  </div>
                  <span className="mx-1.5 mt-1.5 text-center">
                    This action will cancel your listing. You will be prompted
                    to confirm this cancellation from your wallet. A gas fee is
                    required.
                  </span>
                  <Button onClick={cancelOrder} className="mt-2">
                    {copy.ctaCancel}
                  </Button>
                </div>
              )}
              {cancelStep === CancelStep.Approving && (
                <div className="flex flex-col gap-1">
                  <div className="border-b p-2">
                    <ERC721LineItem
                      tokenDetails={token}
                      price={listing?.price}
                      //usdPrice={totalUsd}
                      //collection={collection?.name || ""}
                      expires={expires}
                      quantity={1}
                    />
                  </div>
                  {/* {!stepData && (
                    <Loader className="mx-auto h-24 animate-spin" />
                  )} */}
                  {/*stepData && (
                  <>
                    <Progress
                      title={
                        stepData?.currentStepItem.txHashes
                          ? "Finalizing on blockchain"
                          : "Confirm cancelation in your wallet"
                      }
                      txHashes={stepData?.currentStepItem?.txHashes}
                    />
                  </>
                    )*/}
                  <Button disabled={true} className="m-2">
                    <Loader className="animate-spin" />
                    {stepData?.currentStepItem.txHashes
                      ? copy.ctaAwaitingValidation
                      : copy.ctaAwaitingApproval}
                  </Button>
                </div>
              )}
              {cancelStep === CancelStep.Complete && (
                <div className="flex flex-col">
                  <div className="flex flex-col items-center px-2 py-3 text-center">
                    <h5 className="mb-2">Listing Canceled!</h5>
                    <span className="mb-8">
                      <>
                        Your listing for{" "}
                        <span>
                          {
                            token?.name /*||
                          collection?.name*/
                          }{" "}
                        </span>
                        at {listing?.price} Lords has been canceled.
                      </>
                    </span>
                    <div className="flex flex-col items-center gap-2 px-2 py-3">
                      {/*stepData?.currentStepItem?.txHashes?.map((hash, index) => {
                      const truncatedTxHash = truncateAddress(hash.txHash);
                      const blockExplorerBaseUrl = getChainBlockExplorerUrl(
                        hash.chainId,
                      );
                      return (
                        <Anchor
                          key={index}
                          href={`${blockExplorerBaseUrl}/tx/${hash.txHash}`}
                          color="primary"
                          weight="medium"
                          target="_blank"
                          css={{ fontSize: 12 }}
                        >
                          View transaction: {truncatedTxHash}
                        </Anchor>
                      );
                    })*/}
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      setOpen(false);
                    }}
                    className="m-2"
                  >
                    {copy.ctaClose}
                  </Button>
                </div>
              )}
            </DialogContent>
          </Dialog>
        );
      }}
    </ListCancelModalRender>
  );
}

ListCancelModal.Custom = ListCancelModalRender;
