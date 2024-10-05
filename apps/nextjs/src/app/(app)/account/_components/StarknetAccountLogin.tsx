import { StarknetLoginButton } from "@/app/_components/wallet/StarknetLoginButton";
import {
  Card,
  CardFooter,
  CardTitle,
  CardContent,
  CardHeader,
} from "@realms-world/ui/components/ui/card";
import { useAccount as useStarknetAccount } from "@starknet-react/core";

export const StarknetAccountLogin = () => {
  const { isConnected: isStarknetConnected } = useStarknetAccount();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span className="font-sans text-xl">Starknet</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          Sign in with your wallet to access:
          <ul className="mt-1 list-inside list-disc">
            <li>veLords</li>
            <li>L2 Assets and Marketplaces</li>
            <li>Delegation and Lords Rewards for Realms</li>
          </ul>
        </p>
      </CardContent>
      <CardFooter>
        {!isStarknetConnected && (
          <StarknetLoginButton variant="default" buttonClass="w-full" />
        )}
      </CardFooter>
    </Card>
  );
};
