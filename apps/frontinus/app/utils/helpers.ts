import { Proposal } from "app/gql/graphql";
import { Choice } from "app/types";
import { validateAndParseAddress } from "starknet";
import { VoteType, VoteTypeInfo } from "@/types";
import { format as formatDate } from "date-fns";

const IPFS_GATEWAY: string =
  import.meta.env.VITE_IPFS_GATEWAY || "https://cloudflare-ipfs.com";

export function clone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export function shorten(
  str: string,
  key?: number | "symbol" | "name" | "choice",
): string {
  if (!str) return str;
  let limit;
  if (typeof key === "number") limit = key;
  if (key === "symbol") limit = 12;
  if (key === "name") limit = 64;
  if (key === "choice") limit = 12;
  if (limit)
    return str.length > limit ? `${str.slice(0, limit).trim()}...` : str;
  return shortenAddress(str);
}

export function shortenAddress(str = "") {
  const formatted = formatAddress(str);

  return `${formatted.slice(0, 6)}...${formatted.slice(formatted.length - 4)}`;
}
export function formatAddress(address: string) {
  //if (address.length === 42) return getAddress(address);
  try {
    return validateAndParseAddress(address);
  } catch {
    return address;
  }
}
export function getUrl(uri: string) {
  const ipfsGateway = `https://${IPFS_GATEWAY}`;
  if (!uri) return null;
  if (
    !uri.startsWith("ipfs://") &&
    !uri.startsWith("ipns://") &&
    !uri.startsWith("https://") &&
    !uri.startsWith("http://")
  ) {
    return `${ipfsGateway}/ipfs/${uri}`;
  }

  const uriScheme = uri.split("://")[0];
  if (uriScheme === "ipfs")
    return uri.replace("ipfs://", `${ipfsGateway}/ipfs/`);
  if (uriScheme === "ipns")
    return uri.replace("ipns://", `${ipfsGateway}/ipns/`);
  return uri;
}
export function getProposalId(proposal: Proposal) {
  const proposalId = proposal.proposal_id.toString();

  if (proposalId.startsWith("0x")) {
    return `#${proposalId.slice(2, 7)}`;
  }

  if ([46, 59].includes(proposalId.length)) {
    return `#${proposalId.slice(-5)}`;
  }

  return `#${proposalId}`;
}

export function _p(value: number) {
  const formatter = new Intl.NumberFormat("en", {
    style: "percent",
    maximumFractionDigits: 2,
  });
  return formatter.format(value);
}

export function getChoiceText(availableChoices: string[], choice: Choice) {
  if (typeof choice === "string") {
    return ["for", "against", "abstain"].includes(choice)
      ? choice.charAt(0).toUpperCase() + choice.slice(1)
      : "Invalid choice";
  }

  if (typeof choice === "number") {
    return availableChoices[choice - 1] ?? "Invalid choice";
  }

  if (Array.isArray(choice)) {
    if (!choice.length) return "Blank vote";
    return choice.map((index) => availableChoices[index - 1]).join(", ");
  }

  if (!Object.keys(choice).length) return "Blank vote";

  const total = Object.values(choice).reduce((acc, weight) => acc + weight, 0);

  return Object.entries(choice)
    .filter(([, weight]) => weight > 0)
    .map(
      ([index, weight]) =>
        `${_p(weight / total)} for ${availableChoices[Number(index) - 1]}`,
    )
    .join(", ");
}

export const MAX_SYMBOL_LENGTH = 12;

export const BASIC_CHOICES = ["For", "Against", "Abstain"];
export const SUPPORTED_VOTING_TYPES: VoteType[] = [
  "basic",
  "single-choice",
  "approval",
  "ranked-choice",
  "weighted",
  "quadratic",
] as const;
export const VOTING_TYPES_INFO: Record<
  Exclude<VoteType, "custom">,
  VoteTypeInfo
> = {
  basic: {
    label: "Basic voting",
    description:
      'Voters have three choices: they can vote "For", "Against" or "Abstain".',
  },
  "single-choice": {
    label: "Single choice voting",
    description: "Voters can select only one choice from a predefined list.",
  },
  approval: {
    label: "Approval voting",
    description:
      "Voters can select multiple choices, each choice receiving full voting power.",
  },
  "ranked-choice": {
    label: "Ranked choice voting",
    description:
      "Each voter may select and rank any number of choices. Results are calculated by instant-runoff counting method.",
  },
  weighted: {
    label: "Weighted voting",
    description:
      "Each voter may spread voting power across any number of choices.",
  },
  quadratic: {
    label: "Quadratic voting",
    description:
      "Each voter may spread voting power across any number of choices. Results are calculated quadratically.",
  },
};

export function _t(number: number, format = "MMM d, yyyy · h:mm a") {
  try {
    return formatDate(new Date(number * 1000), format);
  } catch (e) {
    console.log(e);
    return "";
  }
}
