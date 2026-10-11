import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ReadMore } from "@/components/ui/read-more";
import { useCurrentDelegate } from "@/hooks/governance/use-current-delegate";
import { useDelegateRealms } from "@/hooks/governance/use-delegate-realms";
import { useStarkDisplayName } from "@/hooks/use-stark-name";
import { toast } from "@/hooks/use-toast";
import { formatAddress, formatNumber } from "@/utils/utils";
import { UserPen } from "lucide-react";
import { num } from "starknet";

export function DelegateCard({
  delegate,
}: {
  delegate: {
    user: string;
    delegateProfile?: {
      twitter?: string;
      github?: string;
      telegram?: string;
      discord?: string;
      interests?: string[];
      statement?: string;
    };
    delegatedVotes: string;
    id: string;
  };
}) {
  const { data: currentDelegate } = useCurrentDelegate();
  const isCurrentDelegate =
    !!currentDelegate &&
    formatAddress(num.toHex(currentDelegate)) === delegate.user;

  const { sendAsync: delegateRealms } = useDelegateRealms({
    delegatee: delegate.user,
  });
  // Handler function when a delegate button is clicked.
  const handleDelegate = async () => {
    await delegateRealms();
    toast({
      title: "Delegation successful",
      description: "You have successfully delegated your Realms",
    });
  };

  const name = useStarkDisplayName(delegate.user as `0x${string}`);

  return (
    <Card key={delegate.id} className="flex h-full min-w-0 flex-col">
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
          <div className="flex min-w-0 items-center gap-3">
            <Avatar className="h-12 w-12 shrink-0">
              <AvatarImage
                alt={name}
                src={`https://cdn.stamp.fyi/avatar/${delegate.user}?s=64`}
              />
            </Avatar>
            <h2 className="min-w-0 truncate text-xl" title={name}>
              {name}
            </h2>
          </div>
          {isCurrentDelegate ? (
            <Badge className="shrink-0">Current Delegate</Badge>
          ) : null}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-2">
        <p className="realm-stat text-xl">
          {formatNumber(Number(delegate.delegatedVotes), 0)}{" "}
          <span className="text-muted-foreground text-sm uppercase">
            Votes Delegated
          </span>
        </p>

        <div className="flex flex-wrap gap-2">
          {delegate.delegateProfile?.interests
            ?.slice(0, 3)
            .map((interest, index) => (
              <Badge
                key={index}
                variant={"outline"}
                className="px-1 py-0.5 text-xs"
              >
                {interest}
              </Badge>
            ))}
          {delegate.delegateProfile?.interests &&
            delegate.delegateProfile.interests.length > 3 && (
              <Popover>
                <PopoverTrigger asChild>
                  <Badge
                    variant={"outline"}
                    className="cursor-pointer px-1.5 py-0.5 text-xs"
                  >
                    +{delegate.delegateProfile.interests.length - 3}
                  </Badge>
                </PopoverTrigger>
                <PopoverContent className="w-[min(24rem,calc(100vw-2rem))]">
                  <div className="flex flex-wrap gap-1">
                    {delegate.delegateProfile.interests
                      .slice(3)
                      .map((interest, index) => (
                        <Badge
                          key={index}
                          variant={"outline"}
                          className="px-1 py-0.5 text-xs"
                        >
                          {interest}
                        </Badge>
                      ))}
                  </div>
                </PopoverContent>
              </Popover>
            )}
        </div>

        {delegate.delegateProfile?.statement ? (
          <div className="mt-2 text-base break-words">
            <ReadMore
              id={delegate.id}
              text={delegate.delegateProfile.statement}
            />
          </div>
        ) : null}
      </CardContent>
      <CardFooter>
        <Button
          disabled={isCurrentDelegate}
          onClick={() => handleDelegate()}
          className="w-full sm:w-auto"
        >
          <UserPen className="h-4 w-4" />
          Choose Delegate
        </Button>
      </CardFooter>
    </Card>
  );
}
