import type {
  ComponentPropsWithoutRef,
  Dispatch,
  ReactElement,
  SetStateAction,
} from "react";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import NumberSelect from "@/app/_components/NumberSelect";
import { RenderExplorers } from "@/app/_components/wallet/utils";
import { useWalletsProviderContext } from "@/app/providers/WalletsProvider";
import Lords from "@/icons/lords.svg";
import type { RouterOutputs } from "@/utils/api";
import { shortenHex } from "@/utils/utils";
// import Progress from '../Progress'
import {
  faCheckCircle,
  faChevronLeft,
  faChevronRight,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAccount } from "@starknet-react/core";
import { Loader } from "lucide-react";
import { formatUnits } from "viem";

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@realms-world/ui";
import { formatNumber } from "@realms-world/utils";

import ERC721LineItem from "../../ERC721LineItem";
// import TokenLineItem from '../TokenLineItem'
import type { BuyModalStepData } from "./BuyModalRender";
import { BuyModalRender, BuyStep } from "./BuyModalRender";

//import { Execute, ReservoirWallet } from '@reservoir0x/reservoir-sdk'
//import ProgressBar from '../ProgressBar'
//import QuantitySelector from '../QuantitySelector'
//  import { ProviderOptionsContext } from '../../ReservoirKitProvider'
//import { truncateAddress } from '../../lib/truncate'
//import { SelectPaymentToken } from '../SelectPaymentToken'
// import { WalletClient } from 'viem'
//import getChainBlockExplorerUrl from '../../lib/getChainBlockExplorerUrl'
//import { Dialog } from '../../primitives/Dialog'

interface PurchaseData {
  tokenId?: string;
  collectionId?: string;
  maker?: string;
  steps?: any; //Execute['steps']
}

const ModalCopy = {
  titleInsufficientFunds: "Add Funds",
  titleUnavilable: "Selected item is no longer Available",
  titleIsOwner: "You already own this token",
  titleDefault: "Complete Checkout",
  ctaClose: "Close",
  ctaCheckout: "Checkout",
  ctaConnect: "Connect",
  ctaInsufficientFunds: "Add Funds",
  ctaGoToToken: "",
  ctaAwaitingValidation: "Waiting for transaction to be validated",
  ctaAwaitingApproval: "Waiting for approval...",
  ctaCopyAddress: "Copy Wallet Address",
};

interface Props {
  openState?: [boolean, Dispatch<SetStateAction<boolean>>];
  tokenId?: string;
  token?: RouterOutputs["erc721Tokens"]["byId"];
  collectionId?: string;
  defaultQuantity?: number;
  orderId?: number;
  normalizeRoyalties?: boolean;
  copyOverrides?: Partial<typeof ModalCopy>;
  usePermit?: boolean;
  trigger?: React.ReactNode;
  /*onConnectWallet: () => void;
  onGoToToken?: () => any;*/
  onPurchaseComplete?: (data: PurchaseData) => void;
  onPurchaseError?: (error: Error, data: PurchaseData) => void;
  onClose?: (
    data: PurchaseData,
    stepData: BuyModalStepData | null,
    currentStep: BuyStep,
  ) => void;
  /*onPointerDownOutside?: ComponentPropsWithoutRef<
    typeof Dialog
  >["onPointerDownOutside"];*/
}

function titleForStep(
  step: BuyStep,
  copy: typeof ModalCopy,
  isLoading: boolean,
  isOwner: boolean,
) {
  if (isLoading) {
    return copy.titleDefault;
  }

  switch (step) {
    case BuyStep.Unavailable:
      return isOwner ? copy.titleIsOwner : copy.titleUnavilable;
    default:
      return copy.titleDefault;
  }
}

export function BuyModal({
  openState,
  trigger,
  token,
  tokenId,
  collectionId,
  orderId,
  normalizeRoyalties,
  defaultQuantity,
  copyOverrides,
  usePermit,
  onPurchaseComplete,
  onPurchaseError,
  onClose,
}: Props): ReactElement {
  const copy: typeof ModalCopy = { ...ModalCopy, ...copyOverrides };
  const [open, setOpen] = useState(false);

  const { address } = useAccount();
  const { balances } = useWalletsProviderContext();

  return (
    <BuyModalRender
      token={token}
      open={open}
      defaultQuantity={defaultQuantity}
      tokenId={tokenId}
      collectionId={collectionId}
      orderId={orderId}
      normalizeRoyalties={normalizeRoyalties}
      usePermit={usePermit}
    >
      {({
        loading,
        token,
        collection,
        quantityAvailable,
        quantity,
        averageUnitPrice,
        totalPrice,
        buyStep,
        transactionError,
        hasEnoughCurrency,
        addFundsLink,
        steps,
        stepData,
        //feeUsd,
        gasCost,
        /*totalUsd,
        usdPrice,*/
        isOwner,
        setQuantity,
        setBuyStep,
        buyToken,
      }) => {
        const title = titleForStep(buyStep, copy, loading, isOwner);

        useEffect(() => {
          if (buyStep === BuyStep.Complete && onPurchaseComplete) {
            const data: PurchaseData = {
              tokenId: tokenId,
              collectionId: collectionId,
              maker: address,
            };
            if (steps) {
              data.steps = steps;
            }
            onPurchaseComplete(data);
          }
        }, [buyStep]);

        useEffect(() => {
          if (transactionError && onPurchaseError) {
            const data: PurchaseData = {
              tokenId: tokenId,
              collectionId: collectionId,
              maker: address,
            };
            onPurchaseError(transactionError, data);
          }
        }, [transactionError]);

        const executableSteps =
          steps?.filter((step) => step.items && step.items.length > 0) || [];
        const lastStepItems =
          executableSteps[executableSteps.length - 1]?.items || [];

        const totalPurchases =
          stepData?.currentStep?.items?.reduce((total, item) => {
            item.transfersData?.forEach((transferData) => {
              total += Number(transferData.amount || 1);
            });
            return total;
          }, 0) || 0;

        const failedPurchases = quantity - totalPurchases;
        const successfulPurchases = quantity - failedPurchases;
        const finalTxHashes = lastStepItems[lastStepItems.length - 1]?.txHashes;

        const price =
          token?.listings[0]?.price ??
          0n; /*|| BigInt(token?.token?.lastSale?.price?.amount?.raw || 0)*/

        return (
          <Dialog
            //title={title}
            open={open}
            /*onPointerDownOutside={(e) => {
              const dismissableLayers = Array.from(
                document.querySelectorAll("div[data-radix-dismissable]"),
              );
              const clickedDismissableLayer = dismissableLayers.some((el) =>
                e.target ? el.contains(e.target as Node) : false,
              );

              if (!clickedDismissableLayer && dismissableLayers.length > 0) {
                e.preventDefault();
              }
              if (onPointerDownOutside) {
                onPointerDownOutside(e);
              }
            }}*/
            onOpenChange={(open) => {
              if (!open && onClose) {
                const data: PurchaseData = {
                  tokenId: tokenId,
                  collectionId: collectionId,
                  maker: address,
                };
                onClose(data, stepData, buyStep);
              }
              setOpen(open);
            }}
          >
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
              <DialogTitle>{title}</DialogTitle>

              {buyStep === BuyStep.Unavailable && !loading && (
                <div className="flex flex-col">
                  <ERC721LineItem
                    tokenDetails={token}
                    collection={collection}
                    //usdPrice={lords?.usdTotalFormatted}
                    isUnavailable={true}
                    price={quantity > 1 ? averageUnitPrice : price}
                    priceSubtitle={quantity > 1 ? "Average Price" : undefined}
                    showRoyalties={true}
                  />
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

              {buyStep === BuyStep.Checkout && !loading && (
                <div className="flex flex-col">
                  {/*TODO Add error transactionError && <ErrorWell error={transactionError} />*/}
                  <ERC721LineItem
                    tokenDetails={token}
                    collection={collection}
                    //usdPrice={paymentCurrency?.usdTotalFormatted}
                    price={quantity > 1 ? averageUnitPrice : price}
                    className="border-0"
                    priceSubtitle={quantity > 1 ? "Average Price" : undefined}
                    showRoyalties={true}
                  />
                  {quantityAvailable > 1 && (
                    <div className="flex justify-between border-b p-2">
                      <div className="flex flex-col gap-0.5">
                        <span>Quantity</span>
                        <span>{quantityAvailable} items available</span>
                      </div>
                      <NumberSelect
                        min={1}
                        max={quantityAvailable}
                        onChange={(value) => setQuantity(Number(value))}
                      />
                    </div>
                  )}
                  <div className="flex flex-col gap-2 pb-1 pt-2">
                    <div className="flex h-16 items-start justify-between px-2">
                      <h6>You Pay</h6>
                      <div className="flex items-end gap-0.5">
                        {token?.listings[0]?.price &&
                          formatNumber(token?.listings[0].price)}
                        <Lords className="h-6 w-6 fill-current" />
                        {/*<FormatCryptoCurrency
                          textStyle="h6"
                          textColor="base"
                          amount={paymentCurrency?.currencyTotalRaw}
                          logoWidth={18}
                        />
                        <FormatCurrency
                          amount={paymentCurrency?.usdTotalPriceRaw}
                          style="tiny"
                          color="subtle"
                  />*/}
                      </div>
                    </div>
                  </div>

                  <div className="w-full p-2">
                    {hasEnoughCurrency ? (
                      <Button
                        disabled={!hasEnoughCurrency}
                        onClick={buyToken}
                        className="w-full"
                        color="primary"
                      >
                        {copy.ctaCheckout}
                      </Button>
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className="item-center mb-1.5 flex flex-col">
                          <span className="text-red mr-3">
                            Insufficient Balance
                          </span>
                          {/*<FormatCryptoCurrency
                            amount={paymentCurrency?.balance}
                            textStyle="body3"
                          />*/}
                        </div>

                        {gasCost > 0n && (
                          <div className="flex items-center">
                            <span className="text-red mr-1.5">
                              Estimated Gas Cost
                            </span>
                            {/*<FormatCryptoCurrency
                              amount={gasCost}
                              textStyle="body3"
                            />*/}
                          </div>
                        )}

                        <Button
                          onClick={() => {
                            window.open(addFundsLink, "_blank");
                          }}
                          variant={"outline"}
                          className="w-full"
                        >
                          {copy.ctaCheckout}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {buyStep === BuyStep.Approving && token && (
                <div className="flex flex-col">
                  <ERC721LineItem
                    tokenDetails={token}
                    collection={collection}
                    //usdPrice={paymentCurrency?.usdTotalFormatted}
                    price={quantity > 1 ? averageUnitPrice : price}
                    priceSubtitle={quantity > 1 ? "Average Price" : undefined}
                    quantity={quantity}
                  />
                  {/*stepData && stepData.totalSteps > 1 && (
                  <ProgressBar
                    css={{ px: "$4", mt: "$3" }}
                    value={stepData?.stepProgress || 0}
                    max={stepData?.totalSteps || 0}
                  />
                )*/}
                  {!stepData && <Loader className="h-24 animate-spin" />}
                  {/*stepData && (
                  <Progress
                    title={stepData?.currentStep.action || ""}
                    txHashes={stepData?.currentStepItem.txHashes}
                  />
                )*/}
                  <Button disabled={true} className="m-4">
                    <Loader />
                    {stepData?.currentStepItem?.txHashes
                      ? copy.ctaAwaitingValidation
                      : copy.ctaAwaitingApproval}
                  </Button>
                </div>
              )}

              {buyStep === BuyStep.Complete && token && (
                <div className="flex flex-col">
                  <div className="flex flex-col items-center text-center">
                    {totalPurchases === 1 ? (
                      <h5 className="my-8 text-center">Congratulations!</h5>
                    ) : (
                      <>
                        <div
                          className={`text-color: ${
                            failedPurchases ? "$errorAccent" : "$successAccent"
                          }
                        `}
                        >
                          <FontAwesomeIcon
                            icon={
                              failedPurchases
                                ? faCircleExclamation
                                : faCheckCircle
                            }
                            fontSize={32}
                          />
                        </div>
                        <h5 className="my-8 text-center">
                          {failedPurchases
                            ? `${successfulPurchases} ${
                                successfulPurchases > 1 ? "items" : "item"
                              } purchased, ${failedPurchases} ${
                                failedPurchases > 1 ? "items" : "item"
                              } failed`
                            : "Congrats! Purchase was successful."}
                        </h5>
                      </>
                    )}
                    {totalPurchases === 1 && token?.image && (
                      <Image
                        src={token?.image}
                        alt="token image"
                        width={100}
                        height={100}
                      />
                    )}
                    {totalPurchases > 1 && (
                      <div className="flex flex-col gap-y-2">
                        {/*TODO add explorer
                      stepData?.currentStep?.items?.map((item, itemIndex) => {
                        if (
                          Array.isArray(item?.txHashes) &&
                          item?.txHashes.length > 0
                        ) {
                          return item.txHashes.map((hash, txHashIndex) => {
                            const truncatedTxHash = shortenHex(
                              hash.txHash,
                            );
                             const blockExplorerBaseUrl =
                              getChainBlockExplorerUrl(hash.chainId);
                            return (
                              <Anchor
                                key={`${itemIndex}-${txHashIndex}`}
                                href={`${blockExplorerBaseUrl}/tx/${hash.txHash}`}
                                color="primary"
                                weight="medium"
                                target="_blank"
                                css={{ fontSize: 12 }}
                              >
                                View transaction: {truncatedTxHash}
                              </Anchor>
                            );
                          });
                        } else {
                          return null;
                        }
                      })*/}
                      </div>
                    )}

                    {totalPurchases === 1 && (
                      <>
                        <div className="m-w-full my-8 flex items-center justify-center">
                          {!!token.collection?.image && (
                            <div className="mr-1">
                              <img
                                src={token.collection?.image}
                                style={{
                                  width: 24,
                                  height: 24,
                                  borderRadius: "50%",
                                }}
                              />
                            </div>
                          )}
                          <span className="text-ellipsify max-w-full">
                            {token?.name ? token?.name : `#${token?.token_id}`}
                          </span>
                        </div>
                        <div className="mb-1 flex items-center">
                          <div className="text-green mr-1">
                            <FontAwesomeIcon icon={faCheckCircle} />
                          </div>
                          <span>
                            Your transaction went through successfully
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          {/*TODO explorers 
                        finalTxHashes?.map((hash, index) => {
                          const truncatedTxHash = shortenHex(hash.txHash);
                          const blockExplorerBaseUrl = getChainBlockExplorerUrl(
                            hash.chainId,
                          );
                          return (
                            <RenderExplorers
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
                      </>
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5 p-2">
                    <Button
                      onClick={() => {
                        setOpen(false);
                      }}
                      className="flex-1"
                      color="primary"
                    >
                      {copy.ctaClose}
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        );
      }}
    </BuyModalRender>
  );
}

BuyModal.Custom = BuyModalRender;
