import * as React from "react";
import { shortenAddress } from "@starkware-industries/commons-js-utils";
import { Github, Twitter } from "lucide-react";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@realms-world/ui";

interface DelegationProfileProps {
  address: string;
  description: string;
  delegated: string;
  twitter?: string;
  github?: string;
  telegram?: string;
}

export function DelegationProfile({
  address,
  description,
  telegram,
  twitter,
  github,
  delegated,
}: DelegationProfileProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-2">
          <img
            src="https://avatars.githubusercontent.com/u/1?v=4"
            className="h-14 w-14 rounded-full"
          />
          <div>
            <div>{shortenAddress(address)}</div>
            <div className="text-lg font-bold uppercase text-muted-foreground">
              {delegated} Votes delegated
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>{description}</CardContent>
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
          {twitter && (
            <Button variant={"outline"} size={"sm"} rel="noopener noreferrer">
              <Twitter />
            </Button>
          )}
          {github && (
            <Button variant={"outline"} size={"sm"} rel="noopener noreferrer">
              <Github />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
