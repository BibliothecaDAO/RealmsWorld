import { EthereumLoginButton } from "@/app/_components/wallet/EthereumLoginButton";
import {
  Card,
  CardFooter,
  CardTitle,
  CardContent,
  CardHeader,
} from "@realms-world/ui/components/ui/card";
import {
  useAccount as useEthereumAccount,
  useSwitchChain as useSwitchEthereumChain,
} from "wagmi";

export const EthereumAccountLogin = () => {
  const { chainId: ethereumChainId, isConnected: isEthereumConnected } =
    useEthereumAccount();
  const { chains: ethereumChains } = useSwitchEthereumChain();
  const isEthereumRightNetwork = ethereumChainId === ethereumChains[0].id;

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>
          <span className="font-sans text-xl">Ethereum</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          Sign in with your wallet to access:
          <ul className="mt-1 list-inside list-disc">
            <li>L1 Realms Bridge</li>
            <li>Legacy Lords claims</li>
          </ul>
        </p>
      </CardContent>
      <div className="flex-grow" />
      <CardFooter>
        {!isEthereumConnected && (
          <EthereumLoginButton variant="default" buttonClass="w-full" />
        )}
      </CardFooter>
    </Card>
  );
};
