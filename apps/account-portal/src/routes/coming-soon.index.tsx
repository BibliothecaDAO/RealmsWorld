import { PageContainer } from "@/components/layout/page-container";
import { StatusState } from "@/components/layout/status-state";
import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Hourglass } from "lucide-react";

export const Route = createFileRoute("/coming-soon/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageContainer width="narrow" className="min-h-96 justify-center">
      <StatusState
        icon={<Hourglass />}
        eyebrow="In the forge"
        title="Coming Soon"
        description="We're working hard to bring you an amazing new experience. Stay tuned!"
        actions={
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link to="/">Back to dashboard</Link>
          </Button>
        }
      />
    </PageContainer>
  );
}
