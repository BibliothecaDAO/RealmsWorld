import { useCurrentDelegate } from "@/hooks/staking/useCurrentDelegate";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@realms-world/ui/components/ui/alert";
import { Button } from "@realms-world/ui/components/ui/button";
import { TriangleAlert, Link } from "lucide-react";

export const RealmDelegationWarning = () => {
  const { data: currentDelegate, isSuccess } = useCurrentDelegate();

  return (
    <>
      {!currentDelegate && isSuccess && (
        <Alert variant={"warning"} className="mt-4">
          <TriangleAlert className="h-5 w-5" />
          <AlertTitle className="text-lg">
            Your Realms are not earning Lords
          </AlertTitle>
          <AlertDescription>
            You must delegate to yourself or others at
            <Button asChild className="ml-2">
              <Link href="/account/delegates">Delegates</Link>
            </Button>
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};
