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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-2">
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
        </CardTitle>
      </CardHeader>
      {delegate.delegateProfile && (
        <>
          <CardContent>
            <div className="mb-2 flex gap-1">
              {delegate.delegateProfile.interests?.map((interest) => (
                <Badge variant={"outline"} className="px-1 py-0.5 text-xs">
                  {interest}
                </Badge>
              ))}
            </div>
            <div>{delegate.delegateProfile.statement}</div>
          </CardContent>
        </>
      )}
      <CardFooter>
        <div className="flex w-full justify-end gap-3">
          <Button
            className="justify-start"
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
          {/*delegate.delegateProfile?.twitter && (
            <Button
              asChild
              variant={"outline"}
              size={"sm"}
              rel="noopener noreferrer"
            >
              <Link
                href={"https://x.com/" + delegate.delegateProfile.twitter}
                target="_blank"
              >
                <Twitter />
              </Link>
            </Button>
          )*/}
          {/*github && (
            <Button variant={"outline"} size={"sm"} rel="noopener noreferrer">
              <Github />
            </Button>
          )*/}
        </div>
      </CardFooter>
    </Card>
  );
}
