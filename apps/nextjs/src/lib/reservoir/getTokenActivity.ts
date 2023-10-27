import { RESERVOIR_API_URL } from "@/constants/env";

export const getTokenActivity = async ({ token }: { token: any }) => {
  try {
    const res = await fetch(
      `${RESERVOIR_API_URL}/tokens/${token}/activity/v4`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.RESERVOIR_API_KEY || "",
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
    const data: any = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};
