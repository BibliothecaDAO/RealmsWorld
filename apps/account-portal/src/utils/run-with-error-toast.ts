import { toast } from "@/hooks/use-toast";

/** Await a wallet action and surface failures (including user rejection) as a toast. */
export async function runWithErrorToast(
  action: () => Promise<unknown>,
  title: string,
): Promise<void> {
  try {
    await action();
  } catch (error) {
    console.error(`${title}:`, error);
    toast({
      variant: "destructive",
      title,
      description:
        error instanceof Error ? error.message : "The transaction was not sent.",
    });
  }
}
