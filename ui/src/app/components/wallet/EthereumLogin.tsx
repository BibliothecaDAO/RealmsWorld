"use client";

import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsName,
} from "wagmi";
import { Button } from "@/app/components/ui/button";
import { shortenHex } from "@/functions/utils";
import { LogOut } from "lucide-react";
import { ConnectKitButton } from "connectkit";
import { useNetwork } from "wagmi";
import { useWalletsProviderContext } from "@/app/providers/WalletsProvider";
import { formatBigInt } from "@/app/lib/utils";
import EthereumLogo from "@/icons/ethereum.svg";
import Lords from "@/icons/lords.svg";
function EthereumLogin() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();
  const { balances } = useWalletsProviderContext();
  const { data: ensAddress, isError } = useEnsName({
    address: address,
  });

  if (isConnected)
    return (
      <div className="border p-2 rounded">
        <div className="flex mb-3 justify-between">
          <div className="flex">
            <EthereumLogo className="w-6 px-1" /> <div className="self-center">{chain?.name}</div>
          </div>
          <div>
            <Button
              variant="outline"
              size={"xs"}
              className=""
              onClick={() => disconnect()}
            >
              <LogOut className="self-center w-4" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 align-items-center space-x-3">
          <div className="px-4 pt-4 pb-2 border rounded flex justify-between">

            <div className="text-2xl flex">
              <EthereumLogo className="w-5 px-1" />{balances.l1.eth ? formatBigInt(balances.l1.eth, 3) : 0}
            </div>


          </div>
          <div className="px-4 pt-4 pb-2 border rounded  flex justify-between">

            <div className="text-2xl flex">
              <Lords className="w-6 fill-current pr-2" />{balances.l1.lords && balances.l1.lords > 0 ? formatBigInt(balances.l1.lords, 3) : 0}

            </div>
            <Button href="/bridge" size={'xs'} variant={'subtle'} className="self-center">Bridge</Button>
          </div>
        </div>
      </div>

    );
  return (
    <div className="self-center w-full">
      {connectors && (
        <ConnectKitButton.Custom>
          {({ show, isConnected, isConnecting, truncatedAddress, ensName }) => {
            return (
              <>
                <Button
                  className="self-center w-full"
                  variant={"outline"}
                  size={"lg"}
                  onClick={show}
                >
                  {isConnected ? (
                    ensName ?? truncatedAddress
                  ) : (
                    <>
                      <span className="normal-case flex">
                        <EthereumLogo className="w-6 px-1" />  <span className="self-center pl-2">Connect Ethereum Wallet</span>
                      </span>
                      {isConnecting && (
                        <div className="right-0 absolute mr-8">
                          <svg
                            aria-hidden="true"
                            className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                        </div>
                      )}
                    </>
                  )}
                </Button>
              </>
            );
          }}
        </ConnectKitButton.Custom>
      )}
      {error && <div>{error.message}</div>}
    </div>
  );
}

export default EthereumLogin;
