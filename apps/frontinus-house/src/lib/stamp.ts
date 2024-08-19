import { formatAddress } from "./utils";

const resolvedAddresses = new Map<string, string | null>();

export async function getNames(
  addresses: string[],
): Promise<Record<string, string>> {
  try {
    const inputMapping = Object.fromEntries(
      addresses.map((address) => [address, formatAddress(address)]),
    );
    const resolvedAddressesKeys = Array.from(resolvedAddresses.keys());
    const unresolvedAddresses = Object.values(inputMapping).filter(
      (address) => !resolvedAddressesKeys.includes(address),
    );
    let data: string[] = [];

    if (unresolvedAddresses.length > 0) {
      const res = await fetch("https://stamp.fyi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          method: "lookup_addresses",
          params: unresolvedAddresses,
        }),
      });
      // TODO: replace with type from api
      // eslint-disable-next-line
      data = (await res.json()).result;


      unresolvedAddresses.forEach((formatted: string) => {
        // @ts-expect-error replace when data has proper type
        resolvedAddresses.set(formatted, data[formatted] as string);
      });
    }

    const entries = Object.entries(inputMapping)
      .map(([address, formatted]) => [
        address,
        resolvedAddresses.get(formatted) ?? null,
      ])
      .filter(([, name]) => name);

    // TODO: replace with real type
    // eslint-disable-next-line
    return Object.fromEntries(entries);
  } catch (e) {
    console.error("Failed to resolve names", e);
    return {};
  }
}
