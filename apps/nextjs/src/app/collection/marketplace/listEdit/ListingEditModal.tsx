/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { Dispatch, ReactElement, SetStateAction } from "react";
import React, { useEffect, useState } from "react";
import { useTimeDiff } from "@/hooks/useTimeDiff";
import Lords from "@/icons/lords.svg";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
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
  Input,
  Progress,
  Tooltip,
  TooltipProvider,
} from "@realms-world/ui";
import { formatNumber } from "@realms-world/utils";

import ERC721LineItem from "../ERC721LineItem";
//import PriceInput from "../../primitives/PriceInput";

//import Progress from "../Progress";
//import TokenPrimitive from "../TokenPrimitive";

import {
  EditListingStep,
  ListingEditModalRender,
} from "./ListingEditModalRender";

const ModalCopy = {
  title: "Edit Listing",
  ctaClose: "Close",
  ctaConfirm: "Confirm",
  ctaConvertManually: "Convert Manually",
  ctaConvertAutomatically: "",
  ctaAwaitingApproval: "Waiting for approval...",
  ctaAwaitingValidation: "Waiting for transaction to be validated",
};

interface Props {
  openState?: [boolean, Dispatch<SetStateAction<boolean>>];
  listingId?: number;
  token?:
    | RouterOutputs["erc721Tokens"]["all"]["items"][number]
    | RouterOutputs["erc721Tokens"]["byId"];
  collectionId?: string;
  normalizeRoyalties?: boolean;
  copyOverrides?: Partial<typeof ModalCopy>;
  onClose?: (data: any, currentStep: EditListingStep) => void;
  onEditListingComplete?: (data: any) => void;
  onEditListingError?: (error: Error, data: any) => void;
  /*onPointerDownOutside?: ComponentPropsWithoutRef<
    typeof Dialog
  >["onPointerDownOutside"];*/
  trigger?: React.ReactNode;
}

const MINIMUM_AMOUNT = 0.000000000000000001;
const MAXIMUM_AMOUNT = Infinity;

export function ListingEditModal({
  token,
  collectionId,
  trigger,
  copyOverrides,
  onClose,
  onEditListingComplete,
  onEditListingError,
  //onPointerDownOutside,
}: Props): ReactElement {
  const copy: typeof ModalCopy = { ...ModalCopy, ...copyOverrides };
  const [open, setOpen] = useState(false);
  return (
    <ListingEditModalRender
      token={token}
      collectionId={collectionId}
      open={open}
    >
      {({
        loading,
        listing,
        price,
        collection,
        editListingStep,
        transactionError,
        /*usdPrice,
        totalUsd,
        royaltyBps,*/
        stepData,
        setPrice,
        editListing,
      }) => {
        const expires = useTimeDiff(listing?.expiration ?? 0);

        //const profit = ((10000 - (royaltyBps ?? 0)) * (price ?? 0)) / 1000;

        //const updatedTotalUsd = profit; /*usdPrice*/

        useEffect(() => {
          if (
            editListingStep === EditListingStep.Complete &&
            onEditListingComplete
          ) {
            const data = {
              listing,
              stepData: stepData,
            };
            onEditListingComplete(data);
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [editListingStep]);

        useEffect(() => {
          if (transactionError && onEditListingError) {
            const data = {
              listing,
              stepData: stepData,
            };
            onEditListingError(transactionError, data);
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [transactionError]);

        const isListingAvailable =
          listing && (listing.active ?? listing.status === "open") && !loading;

        const isListingEditable = listing?.active && !loading;

        const minimumAmount = MINIMUM_AMOUNT;
        const maximumAmount = MAXIMUM_AMOUNT;

        const withinPricingBounds =
          price !== 0 &&
          Number(price) <= maximumAmount &&
          Number(price) >= minimumAmount;

        const canPurchase = price && price !== 0 && withinPricingBounds;

        return (
          <Dialog
            open={open}
            onOpenChange={(open) => {
              if (!open && onClose) {
                const data = {
                  listing,
                  stepData: stepData,
                };
                onClose(data, editListingStep);
              }
              setOpen(open);
            }}
            /*onPointerDownOutside={(e) => {
              if (onPointerDownOutside) {
                onPointerDownOutside(e);
              }
            }}*/
          >
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
              <DialogTitle>{copy.title}</DialogTitle>
              {!isListingAvailable && !loading && (
                <div className="flex flex-col justify-center px-2 py-3">
                  <h6 className="text-center">
                    Selected listing is no longer available
                  </h6>
                </div>
              )}
              {!isListingEditable && isListingAvailable && (
                <div className="flex flex-col justify-center px-2 py-3">
                  <h6 className="text-center">
                    Selected listing is not an oracle order, so cannot be
                    edited.
                  </h6>
                </div>
              )}
              {isListingEditable &&
                editListingStep === EditListingStep.Edit && (
                  <div className="flex flex-col">
                    {transactionError && (
                      <Alert
                        variant={"warning"}
                        message={transactionError.message}
                      />
                    )}
                    <div className="border-b">
                      <ERC721LineItem
                        tokenDetails={token}
                        price={listing?.price}
                        // priceSubtitle="Price"
                        //usdPrice={totalUsd.toString()}
                        expires={expires}
                        quantity={1 /*listing?.quantityRemaining*/}
                      />
                    </div>
                    <div className="mt-4 flex flex-col">
                      <div className="mb-2 justify-between">
                        <p>Set New Price</p>
                        <div className="flex items-center gap-4">
                          <TooltipProvider>
                            <Tooltip
                              side="left"
                              width={200}
                              content={`How many Lords you will receive after creator royalties are subtracted.`}
                            />
                          </TooltipProvider>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="relative w-full">
                          <Input
                            type="number"
                            value={price}
                            //collection={collection}
                            //usdPrice={usdPrice}
                            //quantity={quantity}
                            min={0}
                            placeholder={"Enter a listing price"}
                            onChange={(e) => {
                              if (e.target.value === "") {
                                setPrice(0);
                              } else {
                                setPrice(parseInt(e.target.value));
                              }
                            }}
                            className={"h-12 w-full"}
                            onBlur={() => {
                              if (price === undefined) {
                                setPrice(0);
                              }
                            }}
                          />
                          <div className="absolute right-0 top-0 z-0 mr-8 flex pr-2 pt-3">
                            <Lords className="h-6 w-6 fill-bright-yellow" />
                          </div>
                        </div>
                        {price && price !== 0 && !withinPricingBounds ? (
                          <div>
                            <span className="text-red">
                              {maximumAmount !== Infinity
                                ? `Amount must be between ${formatNumber(
                                    minimumAmount,
                                  )} - ${formatNumber(maximumAmount)}`
                                : `Amount must be higher than ${formatNumber(
                                    minimumAmount,
                                  )}`}
                            </span>
                          </div>
                        ) : null}

                        {collection &&
                          collection?.floorAsk?.price?.amount?.native !==
                            undefined &&
                          canPurchase &&
                          price < collection?.floorAsk?.price.amount.native && (
                            <div>
                              <span className="text-red">
                                Price is{" "}
                                {Math.round(
                                  ((collection.floorAsk.price.amount.native -
                                    price) /
                                    ((collection.floorAsk.price.amount.native +
                                      price) /
                                      2)) *
                                    100 *
                                    1000,
                                ) / 1000}
                                % below the floor
                              </span>
                            </div>
                          )}
                      </div>
                      <div className="mt-2 flex gap-x-3">
                        <Button
                          onClick={() => {
                            setOpen(false);
                          }}
                          variant={"outline"}
                          className="flex-1"
                        >
                          {copy.ctaClose}
                        </Button>
                        <Button
                          disabled={!canPurchase}
                          onClick={editListing}
                          className="flex-1"
                        >
                          {copy.ctaConfirm}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              {editListingStep === EditListingStep.Approving && (
                <div className="flex flex-col">
                  <ERC721LineItem
                    tokenDetails={token}
                    price={price}
                    //usdPrice={updatedTotalUsd.toString()}
                    // expires={`in ${expirationOption?.text.toLowerCase()}`}
                    quantity={1}
                  />

                  {/* {!stepData && (
                    <Loader className="mx-auto my-2 h-[100px] w-auto animate-spin" />
                  )} */}
                  {stepData && (
                    <>
                      <Progress
                        title={
                          stepData?.currentStepItem.txHashes &&
                          "Finalizing on blockchain"
                        }
                      />
                    </>
                  )}
                  <Button disabled={true}>
                    <Loader className="mr-2 animate-spin" />
                    {stepData?.currentStepItem?.txHashes
                      ? copy.ctaAwaitingValidation
                      : copy.ctaAwaitingApproval}
                  </Button>
                </div>
              )}
              {editListingStep === EditListingStep.Complete && (
                <div className="flex w-full flex-col items-center">
                  <div className="flex flex-col items-center px-2 py-3 text-center">
                    <div className="text-green mb-8">
                      <FontAwesomeIcon icon={faCheckCircle} size="3x" />
                    </div>
                    <h5 className="mb-4">Listing Updated!</h5>
                    <div className="mb-8">
                      Your listing for{" "}
                      <span className="font-semibold">
                        {decodeURIComponent(token?.name ?? "")}
                      </span>{" "}
                      has been updated.
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      setOpen(false);
                    }}
                    className="mb-2"
                  >
                    {copy.ctaClose}
                  </Button>
                </div>
              )}
            </DialogContent>
          </Dialog>
        );
      }}
    </ListingEditModalRender>
  );
}

ListingEditModal.Custom = ListingEditModalRender;
