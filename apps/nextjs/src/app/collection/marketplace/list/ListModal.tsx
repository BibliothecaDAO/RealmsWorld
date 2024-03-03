import type { ReactElement } from "react";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import Lords from "@/icons/lords.svg";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import ListCheckout from './ListCheckout'
import dayjs from "dayjs";
import { Loader } from "lucide-react";

import type { RouterOutputs } from "@realms-world/api";
//import { formatUnits, zeroAddress } from "viem";

import {
  Alert,
  Button,
  DatePicker,
  Dialog,
  DialogContent,
  DialogTrigger,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@realms-world/ui";
import { formatNumber } from "@realms-world/utils";

import Earnings from "./Earnings";
import ListItem from "./ListItem";
import { ListModalRenderer, ListStep } from "./ListModalRender";

const ModalCopy = {
  title: "List Item for sale",
  ctaClose: "Close",
  ctaSetPrice: "Set your price",
  ctaList: "List for Sale",
  ctaAwaitingApproval: "Waiting for Approval",
  ctaGoToToken: "Go to Token",
};

interface Props {
  token:
    | RouterOutputs["erc721Tokens"]["all"]["items"][number]
    | RouterOutputs["erc721Tokens"]["byId"];
  trigger?: React.ReactNode;
}

const MINIMUM_AMOUNT = 0.000000000000001;
const MAXIMUM_AMOUNT = Infinity;

export function ListModal({ token, trigger }: Props): ReactElement {
  const copy: typeof ModalCopy = { ...ModalCopy /*, ...copyOverrides*/ };
  const [open, setOpen] = useState(false);

  if (!token?.contract_address) return <>Contract Not Found</>;

  return (
    <ListModalRenderer
      open={open} //TODO
      tokenId={token.token_id}
      collectionId={token?.contract_address}
    >
      {({
        loading,
        //collection,
        //usdPrice,
        listStep,
        expirationOption,
        expirationOptions,
        //listingData,
        transactionError,
        stepData,
        price,
        setPrice,
        listToken,
        setExpirationOption,
      }) => {
        //TODO add minimum date
        /*const minimumDate = useMemo(() => {
          return dayjs().add(1, "h").format("MM/DD/YYYY h:mm A");
        }, [open]);*/

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const expirationDate = useMemo(() => {
          if (expirationOption?.relativeTime) {
            const newExpirationTime = expirationOption.relativeTimeUnit
              ? dayjs().add(
                  expirationOption.relativeTime,
                  expirationOption.relativeTimeUnit,
                )
              : dayjs.unix(expirationOption.relativeTime);
            return newExpirationTime.toDate();
          }
        }, [expirationOption]);

        /* useEffect(() => {
          if (transactionError && onListingError) {
            const data: ListingCallbackData = {
              tokenId: tokenId,
              collectionId: collectionId,
              listings: listingData,
            }
            onListingError(transactionError, data) TODO show error on listing
          }
        }, [transactionError])*/

        /*const floorAskPrice = collection?.floorAsk?.price;
        const decimalFloorPrice = collection?.floorAsk?.price?.amount?.decimal;
        const nativeFloorPrice = collection?.floorAsk?.price?.amount?.native;
        const usdFloorPrice = collection?.floorAsk?.price?.amount?.usd;*/

        const floorButtonEnabled = true;

        const minimumAmount = MINIMUM_AMOUNT;
        const maximumAmount = MAXIMUM_AMOUNT;

        const withinPricingBounds =
          price &&
          Number(price) !== 0 &&
          Number(price) <= maximumAmount &&
          Number(price) >= minimumAmount;

        const canPurchase = price !== 0 && withinPricingBounds;

        const handleSetFloor = () => {
          // If currency matches floor ask currency, use decimal floor price
          /*if (decimalFloorPrice) {
            setPrice(decimalFloorPrice.toString());
          }*/
        };

        return (
          <Dialog
            open={open}
            onOpenChange={(open) => {
              if (!open /*&& onClose*/) {
                /*const data: ListingCallbackData = {
                  tokenId: tokenId,
                  collectionId: collectionId,
                  listings: listingData,
                };*/
                // onClose(data, stepData, listStep)
              }

              setOpen(open);
            }}
            //loading={loading}
          >
            <DialogTrigger>{trigger}</DialogTrigger>
            <DialogContent>
              {!loading && listStep == ListStep.Unavailable && (
                <div className="flex flex-col gap-y-3">
                  <div className="mt-24">
                    <FontAwesomeIcon
                      icon={faTag}
                      style={{ width: "32px", height: "32px" }}
                    />
                  </div>

                  <span>Listing is not available for this collection.</span>
                  <Button
                    className="w-full"
                    onClick={() => {
                      //setOpen(false)
                    }}
                  >
                    {copy.ctaClose}
                  </Button>
                </div>
              )}
              {!loading && listStep == ListStep.SetPrice && (
                <div className="flex flex-col">
                  {transactionError && (
                    <Alert
                      variant={"warning"}
                      message={transactionError.message}
                    />
                  )}
                  <ListItem token={token} />
                  <div className="flex flex-col items-center">
                    <div className="flex w-full flex-col">
                      <span className="mb-1 text-lg">Lords listing price</span>
                      <div className="flex w-full items-center justify-between gap-x-4">
                        <div className="relative w-full">
                          <Input
                            type="number"
                            value={price}
                            min={0}
                            onChange={(e) => {
                              setPrice(parseInt(e.target.value || "0"));
                            }}
                            placeholder="Amount"
                            className={"h-12 w-full"}
                          />
                          <div className="absolute right-0 top-0 z-0 mr-8 flex pr-2 pt-3">
                            <Lords className="h-6 w-6 fill-bright-yellow" />
                          </div>
                        </div>

                        {floorButtonEnabled ? (
                          <Button
                            color="secondary"
                            variant={"outline"}
                            size="lg"
                            className="px-6"
                            disabled
                            onClick={() => handleSetFloor()}
                          >
                            +Floor
                          </Button>
                        ) : null}
                        {/*TODO <FloorDropdown
                        token={token}
                        currency={currency}
                        defaultCurrency={defaultCurrency}
                        setPrice={setPrice}
                        setCurrency={setCurrency}
                      />*/}
                      </div>
                      {Number(price) !== 0 && !withinPricingBounds && (
                        <div className="border p-3">
                          <span className="text-red-400">
                            {maximumAmount !== Infinity
                              ? `Amount must be between ${formatNumber(
                                  minimumAmount,
                                )} - ${formatNumber(maximumAmount)}`
                              : `Amount must be higher than ${formatNumber(
                                  minimumAmount,
                                )}`}
                          </span>
                        </div>
                      )}
                      {/*collection &&
                      collection?.floorAsk?.price?.amount?.native !==
                        undefined &&
                      Number(price) !== 0 &&
                      Number(price) >= minimumAmount &&
                      currency.contract === zeroAddress &&
                      Number(price) <
                        collection?.floorAsk?.price.amount.native && (
                        <Box>
                          <Text style="body2" color="error">
                            Price is{' '}
                            {Math.round(
                              ((collection.floorAsk.price.amount.native -
                                +price) /
                                ((collection.floorAsk.price.amount.native +
                                  +price) /
                                  2)) *
                                100 *
                                1000
                            ) / 1000}
                            % below the floor
                          </Text>
                        </Box>
                                )*/}
                    </div>
                    <div className="my-4 flex w-full flex-col">
                      <span className="mb-1 text-lg">Expiration Date</span>
                      <div className="align-items-center flex w-full gap-x-4">
                        <Select
                          value={expirationOption?.text || ""}
                          onValueChange={(value: string) => {
                            const option = expirationOptions.find(
                              (option) => option.value == value,
                            );
                            if (option) {
                              setExpirationOption(option);
                            }
                          }}
                        >
                          <SelectTrigger className="h-12 w-[180px]">
                            <SelectValue
                              aria-label={expirationOption.text}
                              placeholder="Select an expiry"
                            >
                              {expirationOption.text}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {expirationOptions
                              .filter(({ value }) => value !== "custom")
                              .map((option) => (
                                <SelectItem
                                  key={option.text}
                                  value={option.value}
                                >
                                  {option.text}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <DatePicker
                          // TODO Add minimum date check (24hrs)

                          mode={"single"}
                          showTimePicker={true}
                          //ref={datetimeElement}
                          value={expirationDate}
                          defaultValue={expirationDate}
                          onChange={(e: Date | undefined) => {
                            if (e) {
                              const customOption = expirationOptions.find(
                                (option) => option.value === "custom",
                              );
                              if (customOption && e) {
                                setExpirationOption({
                                  ...customOption,
                                  //@ts-expect-error datepicker wrong type
                                  relativeTime: e[0] / 1000,
                                });
                              }
                            }
                          }}
                          className="mb-3 h-12 w-full border p-3"
                        />
                      </div>
                    </div>
                    <Earnings
                      price={price}
                      //usdPrice={usdPrice}
                      royaltiesBps={500} //TODO make dynamic
                      quantity={1}
                    />
                  </div>
                  <div className="mt-2 w-full">
                    <Button
                      disabled={canPurchase ? false : true}
                      size={"lg"}
                      onClick={listToken}
                      className="w-full"
                    >
                      {copy.ctaList}
                    </Button>
                  </div>
                </div>
              )}
              {!loading && listStep == ListStep.Listing && (
                <div className="flex flex-col">
                  <ListItem
                    token={token}
                    price={price}
                    quantity={1}
                    expirationOption={expirationOption}
                    containerCss={{
                      borderBottom: "1px solid",
                      borderBottomColor: "$neutralLine",
                      borderColor: "$neutralLine",
                    }}
                  />
                  <div className="flex w-full flex-col items-center gap-2 p-8">
                    {stepData ? <></> : null}
                    {!stepData && (
                      <div className="flex h-full items-center justify-center py-2">
                        <Loader className="animate-spin" />
                      </div>
                    )}
                  </div>
                  <div className="flex w-full p-2">
                    <Button className="mt-auto w-full" disabled={true}>
                      <Loader className="mr-2 animate-spin py-0.5" />
                      {copy.ctaAwaitingApproval}
                    </Button>
                  </div>
                </div>
              )}
              {!loading && listStep == ListStep.Complete && (
                <div className="flex flex-col items-center">
                  <div className="flex w-full flex-col items-center gap-6 px-2 pt-2">
                    <div className="flex w-full flex-col items-center gap-6 overflow-hidden">
                      {token.image && (
                        <Image
                          src={token?.image /*?? collection?.image*/}
                          alt={token?.name ?? token?.token_id.toString() ?? ""}
                          width={120}
                          height={120}
                        />
                      )}
                      <h6 className="h6 text-ellipsis">
                        {token?.token_id ? `#${token?.token_id}` : token?.name}
                      </h6>
                      {/*<span className="text-ellipsis text-medium-dark-green">
                        {collection?.name}
                      </span>*/}
                    </div>
                    <h5>Your item has been listed!</h5>
                  </div>
                  <div className="flex w-full flex-col gap-3">
                    <Button
                      onClick={() => {
                        setOpen(false);
                      }}
                      className="flex flex-1"
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
    </ListModalRenderer>
  );
}

ListModal.Custom = ListModalRenderer;
