import type { Metadata } from "next";
import { AuthShowcase } from "@/app/_components/auth/auth-showcase";
import { shortenAddress } from "@starkware-industries/commons-js-utils";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Textarea,
} from "@realms-world/ui";

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
              <img
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
            <div>
              <Label>Profile</Label>
              <Textarea placeholder="Enter Your Profile description" />
            </div>

            <div>
              <Label>Discord</Label>
              <Input placeholder="Enter Your Discord handle" />
            </div>

            <div>
              <Label>Twitter</Label>
              <Input placeholder="Enter Your Twitter handle" />
            </div>

            <div>
              <Label>Github</Label>
              <Input placeholder="Enter Your Github handle" />
            </div>

            <Button className="mt-4">Save Profile</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
