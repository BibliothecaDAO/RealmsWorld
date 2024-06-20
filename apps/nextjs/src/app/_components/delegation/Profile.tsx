"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { shortenAddress } from "@starkware-industries/commons-js-utils";
import { Github, Twitter } from "lucide-react";

import type { RouterOutputs } from "@realms-world/api";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@realms-world/ui";

export function DelegationProfile({
  delegate,
}: {
  delegate: RouterOutputs["delegates"]["all"]["items"][0];
}) {
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
            <div>{delegate.id && shortenAddress(delegate.id)}</div>

            <div className="text-lg font-bold uppercase text-muted-foreground">
              {delegate.delegatedVotes} Votes delegated
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      {delegate.delegateProfile && (
        <CardContent>{delegate.delegateProfile.statement}</CardContent>
      )}
      <CardFooter>
        <div className="flex w-full justify-end gap-3">
          <Button
            className="justify-start"
            variant={"default"}
            size={"sm"}
            rel="noopener noreferrer"
          >
            Delegate To
          </Button>
          {delegate.delegateProfile?.twitter && (
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
          )}
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
