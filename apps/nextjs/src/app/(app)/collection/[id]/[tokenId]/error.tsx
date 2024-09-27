"use client";

import { Button } from "@realms-world/ui/components/ui/button";

interface ErrorProps {
  error: Error;
  reset: () => void;
}
export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="grid h-screen place-content-center px-4">
      <div className="text-center">
        <h1 className="text-9xl">Token Not Found</h1>

        <p className="text-flamingo text-2xl font-bold tracking-tight sm:text-4xl">
          Steady Lord!
        </p>

        <p className="my-4 text-lg">
          We could not find the token, if it has recently been reset try reset
          below
        </p>
        <p className="my-4 text-lg">{error.message || "undefined error"}</p>
        <Button onClick={() => reset()}>Try Again</Button>
      </div>
    </div>
  );
}
