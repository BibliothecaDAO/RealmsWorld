"use client";

import { Button } from "@realms-world/ui";

interface ErrorProps {
  error: Error;
  reset: () => void;
}
export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="grid h-screen place-content-center px-4">
      <div className="text-center">
        <h1 className="text-9xl">401</h1>

        <p className="text-2xl font-bold tracking-tight text-flamingo sm:text-4xl">
          Steady Lord!
        </p>

        <p className="my-4 text-lg">Something Went Wrong</p>
        <p className="my-4 text-lg">{error.message || "undefined error"}</p>
        <Button onClick={() => reset()}>Try Again</Button>
      </div>
    </div>
  );
}
