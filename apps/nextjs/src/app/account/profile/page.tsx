import type { Metadata } from "next";

import { Card, CardContent, CardHeader } from "@realms-world/ui";

import { Profile } from "./Profile";
import { SignInSIWS } from "./SignInSIWS";

export function generateMetadata(): Metadata {
  return {
    title: `RAW Account`,
    description: `Raw Account - Created for Adventurers by Bibliotheca DAO`,
  };
}

export default function Page() {
  return (
    <div>
      <div className="w-full">
        <h4 className="my-4 text-3xl">Delegate Profile</h4>
        <div className="grid grid-cols-5 gap-x-6">
          <Card className="col-span-3">
            <Profile />
          </Card>
          <div className="sticky top-[5rem] col-span-2 h-[200px]">
            <Card className="w-auto">
              <SignInSIWS />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
