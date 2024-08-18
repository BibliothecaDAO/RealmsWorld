import type { SystemStatus } from "@/types/ark";
import type { ArkClient } from "./client";

interface GetSystemStatusParams {
  client: ArkClient
};

export async function getSystemStatus({ client }: GetSystemStatusParams): Promise<SystemStatus> {
  try {
    return await client.fetch('');
  } catch (_) {
    return { status: "error getting system status" }
  }
}
