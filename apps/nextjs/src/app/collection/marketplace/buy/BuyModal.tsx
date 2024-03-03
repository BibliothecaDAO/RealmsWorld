import type { ReactElement } from "react";
import React, { useState } from "react";
import Image from "next/image";
//import NumberSelect from "@/app/_components/NumberSelect";
import { StarknetLoginButton } from "@/app/_components/wallet/StarknetLoginButton";
//import { useWalletsProviderContext } from "@/app/providers/WalletsProvider";
import Lords from "@/icons/lords.svg";
// import Progress from '../Progress'
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAccount } from "@starknet-react/core";
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
import { formatNumber } from "@realms-world/utils";

import ERC721LineItem from "../ERC721LineItem";
import { BuyModalRender, BuyStep } from "./BuyModalRender";

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
  token?:
    | RouterOutputs["erc721Tokens"]["byId"]
    | RouterOutputs["erc721Tokens"]["all"]["items"][number];
  collectionId?: string;
  defaultQuantity?: number;
  orderId?: number;
  normalizeRoyalties?: boolean;
  copyOverrides?: Partial<typeof ModalCopy>;
  usePermit?: boolean;
  trigger?: React.ReactNode;
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
  trigger,
  token,
  collectionId,
  orderId,
  normalizeRoyalties,
  defaultQuantity,
  copyOverrides,
  usePermit,
}: Props): ReactElement {
  const copy: typeof ModalCopy = { ...ModalCopy, ...copyOverrides };
  const [open, setOpen] = useState(false);

  const { address } = useAccount();
  //const { balances } = useWalletsProviderContext();

  return (
    <BuyModalRender
      token={token}
      open={open}
      defaultQuantity={defaultQuantity}
      collectionId={collectionId}
      orderId={orderId}
      normalizeRoyalties={normalizeRoyalties}
      usePermit={usePermit}
    >
      {({
        loading,
        listing,
        quantity,
        averageUnitPrice,
        buyStep,
        transactionError,
        hasEnoughCurrency,
        addFundsLink,
        //feeUsd,
        gasCost,
        usdPrice,
        isOwner,
        buyToken,
      }) => {
        const title = titleForStep(buyStep, copy, loading, isOwner);

        const price = listing?.price ?? 0;

        return (
          <Dialog
            //title={title}
            open={open}
            onOpenChange={(open) => {
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
                    usdPrice={usdPrice}
                    isUnavailable={true}
                    price={/*quantity > 1 ? averageUnitPrice :*/ price}
                    priceSubtitle={
                      /*quantity > 1 ? "Average Price" : */ undefined
                    }
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
                  {transactionError && (
                    <Alert
                      variant={"warning"}
                      message={transactionError.message}
                    />
                  )}
                  <ERC721LineItem
                    tokenDetails={token}
                    usdPrice={usdPrice}
                    price={quantity > 1 ? averageUnitPrice : price}
                    className="border-0"
                    priceSubtitle={quantity > 1 ? "Average Price" : undefined}
                    showRoyalties={true}
                  />
                  {/*quantityAvailable > 1 && (
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
                  )*/}
                  <div className="mt-4 flex items-start justify-between border-2 p-2 font-sans">
                    <div className="self-center">You Pay</div>
                    <div className="flex space-x-3">
                      <span>
                        {listing?.price &&
                          formatNumber(parseInt(listing?.price))}
                      </span>

                      <Lords className="h-6 w-6 fill-current" />
                    </div>
                  </div>
                  <div className="w-full">
                    {!address ? (
                      <StarknetLoginButton
                        openAccount={false}
                        buttonClass="w-full mt-4"
                      />
                    ) : (
                      <>
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
                            <div className="item-center my-1.5 flex flex-col">
                              <span className="mr-3 text-red-500">
                                Insufficient Balance
                              </span>
                              {/*<FormatCryptoCurrency
                            amount={paymentCurrency?.balance}
                            textStyle="body3"
                          />*/}
                            </div>

                            {gasCost > 0n && (
                              <div className="flex items-center">
                                <span className="mr-1.5 text-red-500">
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
                              {copy.ctaInsufficientFunds}
                            </Button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}

              {buyStep === BuyStep.Approving && token && (
                <div className="flex flex-col">
                  <ERC721LineItem
                    tokenDetails={token}
                    //usdPrice={paymentCurrency?.usdTotalFormatted}
                    price={quantity > 1 ? averageUnitPrice : price}
                    priceSubtitle={quantity > 1 ? "Average Price" : undefined}
                    quantity={quantity}
                  />
                  <Button disabled={true}>
                    <Loader className="mr-2 animate-spin" />
                    {copy.ctaAwaitingApproval}
                  </Button>
                </div>
              )}

              {buyStep === BuyStep.Complete && token && (
                <div className="flex flex-col">
                  <div className="flex flex-col items-center text-center">
                    <h5 className="my-8 text-center">Congratulations!</h5>
                    {token?.image && (
                      <Image
                        src={token?.image}
                        alt="token image"
                        width={100}
                        height={100}
                      />
                    )}

                    <div className="m-w-full my-8 flex items-center justify-center">
                      {/*!!token.collection?.image && (
                        <div className="mr-1">
                          <Image
                            src={token.collection?.image}
                            style={{
                              width: 24,
                              height: 24,
                              borderRadius: "50%",
                            }}
                          />
                        </div>
                          )*/}
                      <span className="text-ellipsify max-w-full">
                        {token?.name
                          ? decodeURI(token?.name)
                          : `#${token?.token_id}`}
                      </span>
                    </div>
                    <div className="mb-1 flex items-center">
                      <div className="text-green mr-1">
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </div>
                      <span>Your transaction went through successfully</span>
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
