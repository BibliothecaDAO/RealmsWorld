import { RESERVOIR_API_URL } from "@/constants/env";
import { env } from "@/env";

export const getTokenActivity = async ({ token }: { token: string }) => {
  try {
    const res = await fetch(
      `${RESERVOIR_API_URL}/tokens/${token}/activity/v4`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": env.RESERVOIR_API_KEY,
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await res.json();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return data;
  } catch (error) {
    return error;
  }
};
