import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
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
import { formatAddress, formatNumber, shortenAddress } from "@/utils/utils";
import { UserPen } from "lucide-react";
import { num } from "starknet";

export interface DelegateCardData {
  user: string;
  delegateProfile?: {
    twitter?: string | null;
    github?: string | null;
    telegram?: string | null;
    discord?: string | null;
    interests?: string[] | null;
    statement?: string | null;
  } | null;
  delegatedVotes: string;
  id: string;
}

function InterestChip({ children }: { children: string }) {
  return (
    <Badge variant="outline" className="text-muted-foreground">
      {children}
    </Badge>
  );
}

/** Presentational delegate card: avatar, votes, interests, statement and delegate CTA. */
export function DelegateCardView({
  delegate,
  name,
  isCurrentDelegate = false,
  onDelegate,
}: {
  delegate: DelegateCardData;
  name?: string;
  isCurrentDelegate?: boolean;
  onDelegate?: () => void;
}) {
  const displayName = name || shortenAddress(delegate.user);
  const interests = delegate.delegateProfile?.interests ?? [];

  return (
    <Card className="flex h-full min-w-0 flex-col">
      <CardHeader>
        <div className="flex min-w-0 items-center gap-3">
          <Avatar className="border-border size-11 shrink-0 border">
            <AvatarImage
              alt={displayName}
              src={`https://cdn.stamp.fyi/avatar/${delegate.user}?s=64`}
            />
            <AvatarFallback className="realm-chip">
              {displayName.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1 space-y-1">
            <h2 className="realm-card-title truncate" title={displayName}>
              {displayName}
            </h2>
            {isCurrentDelegate ? <Badge>Current delegate</Badge> : null}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3">
        <div>
          <p className="realm-label">Votes delegated</p>
          <p className="realm-stat text-xl font-semibold">
            {formatNumber(Number(delegate.delegatedVotes), 0)}
          </p>
        </div>

        {interests.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {interests.slice(0, 3).map((interest, index) => (
              <InterestChip key={index}>{interest}</InterestChip>
            ))}
            {interests.length > 3 && (
              <Popover>
                <PopoverTrigger asChild>
                  <Badge
                    asChild
                    variant="outline"
                    className="text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <button type="button">+{interests.length - 3}</button>
                  </Badge>
                </PopoverTrigger>
                <PopoverContent className="w-[min(24rem,calc(100vw-2rem))]">
                  <div className="flex flex-wrap gap-1.5">
                    {interests.slice(3).map((interest, index) => (
                      <InterestChip key={index}>{interest}</InterestChip>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        ) : null}

        {delegate.delegateProfile?.statement ? (
          <div className="text-muted-foreground text-sm break-words">
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
          onClick={onDelegate}
          variant={isCurrentDelegate ? "outline" : "default"}
          className="w-full"
        >
          <UserPen />
          {isCurrentDelegate ? "Delegated" : "Choose Delegate"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export function DelegateCard({ delegate }: { delegate: DelegateCardData }) {
  const { data: currentDelegate } = useCurrentDelegate();
  const isCurrentDelegate =
    !!currentDelegate &&
    formatAddress(num.toHex(currentDelegate)) === delegate.user;

  const { sendAsync: delegateRealms } = useDelegateRealms({
    delegatee: delegate.user,
  });
  const handleDelegate = async () => {
    await delegateRealms();
    toast({
      title: "Delegation successful",
      description: "You have successfully delegated your Realms",
    });
  };

  const name = useStarkDisplayName(delegate.user as `0x${string}`);

  return (
    <DelegateCardView
      delegate={delegate}
      name={name}
      isCurrentDelegate={isCurrentDelegate}
      onDelegate={() => void handleDelegate()}
    />
  );
}
