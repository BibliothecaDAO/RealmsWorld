import { SessionProvider } from "next-auth/react";

import { auth, signIn, signOut } from "@realms-world/auth";

import { SIWSLogin } from "./SIWSLogin";

export async function AuthShowcase() {
  const session = await auth();

  console.log(session);

  if (!session) {
    return (
      <SessionProvider>
        {" "}
        <SIWSLogin />
      </SessionProvider>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        <span>Logged in as {session.user.name}</span>
      </p>

      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button className="bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20">
          Sign out
        </button>
      </form>
    </div>
  );
}
