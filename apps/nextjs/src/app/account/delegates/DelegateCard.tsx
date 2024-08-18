//import { useState } from "react";
import Image from "next/image";
import { ReadMore } from "@/app/_components/ReadMore";
import { StarkName } from "@/app/_components/StarkName";
import { Github, Twitter } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@realms-world/ui";

import type { RouterOutputs } from "@realms-world/api";
import {
  Badge,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@realms-world/ui";

import { SocialIcons } from "../../_components/SocialIcons";
import { DelegateActions } from "./DelegateActions";
import { useStarkName, useStarkProfile } from "@starknet-react/core";

export function DelegateCard({
  delegate,
}: {
  delegate: RouterOutputs["delegates"]["all"]["items"][0];
}) {
  //const { data, isLoading, isError } = useStarkProfile({ address: delegate.id });

  //const starkName = useStarkDisplayName(delegate.id);
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex flex-wrap gap-2">
          <div className="flex w-full gap-3">
            <Image
              alt="profile"
              width={48}
              height={48}
              src={"/pink_crown.gif"}
              className="h-14 w-14 rounded-full"
            />
            <div>
              <div>
                <StarkName address={delegate.user} />
              </div>

              <div className="text-lg font-bold uppercase text-muted-foreground">
                {delegate.delegatedVotesRaw} Votes delegated
              </div>
            </div>
          </div>

          {delegate.delegateProfile && (
            <div className="mb-2 flex gap-1">
              {delegate.delegateProfile.interests?.slice(0, 3).map((interest, index) => (
                <Badge key={index} variant={"outline"} className="px-1 py-0.5 text-xs">
                  {interest}
                </Badge>
              ))}
              {delegate.delegateProfile.interests && delegate.delegateProfile.interests.length > 3 && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Badge variant={"outline"} className="px-1 py-0.5 text-xs cursor-pointer">
                      +{delegate.delegateProfile.interests.length - 3}
                    </Badge>
                  </PopoverTrigger>
                  <PopoverContent className="w-96">
                    <div className="flex flex-wrap gap-1">
                      {delegate.delegateProfile.interests.slice(3).map((interest, index) => (
                        <Badge key={index} variant={"outline"} className="px-1 py-0.5 text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          )}
        </CardTitle>
      </CardHeader>
      {delegate.delegateProfile && (
        <>
          <CardContent className="overflow-hidden">
            <div className="text-lg">
              <ReadMore
                id={delegate.id}
                text={delegate.delegateProfile.statement}
              />
            </div>
          </CardContent>
        </>
      )}
      <CardFooter className="mt-auto flex w-full justify-between">
        <DelegateActions delegate={delegate} />
        <SocialIcons
          x={delegate.delegateProfile?.twitter ?? undefined}
          github={delegate.delegateProfile?.github ?? undefined}
        //discord={delegate.delegateProfile?.discord ?? undefined}
        />
      </CardFooter>
    </Card>
  );
}
