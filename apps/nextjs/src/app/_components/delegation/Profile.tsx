import * as React from "react";
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

export function DelegationProfile(
  props: RouterOutputs["delegates"]["all"]["items"][0],
) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-2">
          <img
            src="https://avatars.githubusercontent.com/u/1?v=4"
            className="h-14 w-14 rounded-full"
          />
          <div>
            <div>{shortenAddress(props.id)}</div>
            <div className="text-lg font-bold uppercase text-muted-foreground">
              {props.delegatedVotes} Votes delegated
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      {props.delegateProfile && (
        <CardContent>{props.delegateProfile.statement}</CardContent>
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
          {props.delegateProfile && (
            <Button variant={"outline"} size={"sm"} rel="noopener noreferrer">
              <Twitter />
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
