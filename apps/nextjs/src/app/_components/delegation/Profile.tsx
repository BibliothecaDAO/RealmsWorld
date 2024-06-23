"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useDelegateRealms } from "@/hooks/staking/useDelegateRealms";
import { shortenHex } from "@/utils/utils";
import { Github, Twitter } from "lucide-react";

import type { RouterOutputs } from "@realms-world/api";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@realms-world/ui";

import { SocialIcons } from "../SocialIcons";

export function DelegateProfile({
  delegate,
}: {
  delegate: RouterOutputs["delegates"]["all"]["items"][0];
}) {
  const { sendAsync: delegateRealms } = useDelegateRealms({
    delegatee: delegate.id,
  });

  const [showFullStatement, setShowFullStatement] = React.useState(false);

  const toggleStatement = () => {
    setShowFullStatement((prev) => !prev);
  };

  const statementLines = delegate.delegateProfile?.statement.split("\n") || [];

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex flex-wrap gap-2">
          <div className="flex w-full gap-3">
            <Image
              alt="profile"
              width={48}
              height={48}
              src="https://avatars.githubusercontent.com/u/1?v=4"
              className="h-14 w-14 rounded-full"
            />
            <div>
              <div>{delegate.id && shortenHex(delegate.id)}</div>

              <div className="text-lg font-bold uppercase text-muted-foreground">
                {delegate.delegatedVotesRaw} Votes delegated
              </div>
            </div>
          </div>

          {delegate.delegateProfile && (
            <div className="mb-2 flex gap-1">
              {delegate.delegateProfile.interests?.map((interest) => (
                <Badge variant={"outline"} className="px-1 py-0.5 text-xs">
                  {interest}
                </Badge>
              ))}
            </div>
          )}
        </CardTitle>
      </CardHeader>
      {delegate.delegateProfile && (
        <>
          <CardContent className="overflow-hidden">
            <div className="text-lg">
              {showFullStatement
                ? delegate.delegateProfile.statement
                : statementLines.slice(0, 3).join("\n")}
            </div>
            {statementLines.length > 3 && (
              <Button onClick={toggleStatement} variant={"ghost"} size={"xs"}>
                {showFullStatement ? "Show Less" : "Show More"}
              </Button>
            )}
          </CardContent>
        </>
      )}
      <CardFooter className="mt-auto flex w-full justify-between">
        <Button
          variant={"default"}
          size={"sm"}
          rel="noopener noreferrer"
          onClick={() => delegateRealms()}
        >
          Delegate To
        </Button>
        <SocialIcons
          x={delegate.delegateProfile?.twitter ?? undefined}
          github={delegate.delegateProfile?.github ?? undefined}
          discord={delegate.delegateProfile?.discord ?? undefined}
        />
      </CardFooter>
    </Card>
  );
}
