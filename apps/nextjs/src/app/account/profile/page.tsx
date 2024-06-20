import type { Metadata } from "next";
import Image from "next/image";
import { AuthShowcase } from "@/app/_components/auth/auth-showcase";
import { shortenAddress } from "@starkware-industries/commons-js-utils";

import { Card, CardContent, CardHeader, CardTitle } from "@realms-world/ui";

import { ProfileForm } from "./ProfileForm";

export function generateMetadata(): Metadata {
  return {
    title: `RAW Account`,
    description: `Raw Account - Created for Adventurers by Bibliotheca DAO`,
  };
}

export default function Page() {
  return (
    <div>
      <AuthShowcase />

      <div className="w-full">
        <h4 className="my-4 text-3xl">Delegation Profile</h4>

        <Card className="w-1/2">
          <CardHeader>
            <CardTitle className="flex gap-2">
              <Image
                alt="profile image"
                width={48}
                height={48}
                src="https://avatars.githubusercontent.com/u/1?v=4"
                className="h-14 w-14 rounded-full"
              />
              <div>
                <div>
                  {shortenAddress(
                    "0x01BFC84464f990C09Cc0e5D64D18F54c3469fD5c467398BF31293051bAde1C39",
                  )}
                </div>
                <div className="text-lg font-bold uppercase text-muted-foreground">
                  10 Votes delegated
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <ProfileForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
