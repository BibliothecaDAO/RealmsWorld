import type {
  DefaultSession,
  NextAuthConfig,
  // Session as NextAuthSession,
} from "next-auth";
import { cookies } from "next/headers";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { SiwsTypedData } from "siws";
import { constants, RpcProvider } from "starknet";

import { db } from "@realms-world/db/client";
import { Account, Session, User } from "@realms-world/db/schema";

import { env } from "../env";

declare module "next-auth" {
  interface Session {
    // address: string;
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
const adapter = DrizzleAdapter(db, {
  usersTable: User,
  accountsTable: Account,
  sessionsTable: Session,
});

export const isSecureContext = env.NODE_ENV !== "development";

export const authConfig = {
  adapter,
  // In development, we need to skip checks to allow Expo to work
  /*...(!isSecureContext
    ? {
        skipCSRFCheck: skipCSRFCheck,
        trustHost: true,
      }
    : {}),*/
  session: {
    strategy: "jwt",
  },
  secret: env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Starknet",
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0,0x0",
        },
      },
      async authorize(credentials, req) {
        try {
          const signindata = SiwsTypedData.fromJson(
            credentials.message as string,
          );
          const chainId = signindata.domain.chainId;
          const sepoliaProvider = new RpcProvider({
            nodeUrl: "https://starknet-sepolia.public.blastapi.io",
          });

          const mainProvider = new RpcProvider({
            nodeUrl: "https://starknet-mainnet.public.blastapi.io",
          });
          const csrf = cookies()
            .get("next-auth.csrf-token")
            ?.value.split("|")[0];
          let starknetProvider: RpcProvider = sepoliaProvider;

          if (chainId == constants.NetworkName.SN_MAIN) {
            starknetProvider = mainProvider;
            console.log("mainProvider");
          } else if (chainId == constants.NetworkName.SN_SEPOLIA) {
            starknetProvider = sepoliaProvider;
          } else {
            throw new Error("Invalid chainId");
          }

          const result = await signindata.verify(
            {
              signature: (credentials.signature as string).split(","),
              domain: req.headers.get("host") ?? "http://localhost:3000", //nextAuthUrl.host,
              nonce: csrf,
              network: chainId,
            },
            // TODO: explore type differences although they have same `RpcProvider` type
            // eslint-disable-next-line
            // @ts-ignore
            { provider: starknetProvider },
          );

          if (result.success) {
            return {
              id: signindata.message.address,
            };
          }
          return null;
        } catch (e) {
          console.log(e);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session: (opts) => {
      return {
        ...opts.session,
        address: opts.token.sub,
        user: {
          ...opts.session.user,
          name: opts.token.sub,
        },
      };
    },
  },
} satisfies NextAuthConfig;

/*export const validateToken = async (
  token: string,
): Promise<NextAuthSession | null> => {
  const sessionToken = token.slice("Bearer ".length);
  const session = await adapter.getSessionAndUser?.(sessionToken);
  return session
    ? {
        user: {
          ...session.user,
        },
        address: token.sub,
        expires: session.session.expires.toISOString(),
      }
    : null;
};*/

export const invalidateSessionToken = async (token: string) => {
  await adapter.deleteSession?.(token);
};
