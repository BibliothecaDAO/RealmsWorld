import SnapshotLogo from "@/components/icons/snapshot.svg?react";
import { ExternalLink } from "lucide-react";

export const SNAPSHOT_SPACE_URL =
  "https://snapshot.box/#/sn:0x07bd3419669f9f0cc8f19e9e2457089cdd4804a4c41a5729ee9c7fd02ab8ab62";

/** Outbound link to the Realms DAO Snapshot space. */
export function SnapshotLink() {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={SNAPSHOT_SPACE_URL}
      className="border-border bg-card hover:border-border-strong hover:bg-muted flex items-center justify-between gap-3 rounded-md border px-3 py-2 transition-colors"
    >
      <SnapshotLogo className="[&_#snapshot]:fill-foreground h-8 w-32" />
      <ExternalLink className="text-muted-foreground size-4" />
    </a>
  );
}
