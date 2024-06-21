"use client";

import { useMemo, useRef } from "react";
import { SIWSLogin } from "@/app/_components/auth/SIWSLogin";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

import type { RouterOutputs } from "@realms-world/api";
import { CreateDelegateProfileSchema } from "@realms-world/db/schema";
import {
  Alert,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
  toast,
  ToggleGroup,
  ToggleGroupItem,
} from "@realms-world/ui";
import { padAddress } from "@realms-world/utils";

export const ProfileForm = ({
  delegateId,
  delegateProfile,
}: {
  delegateId: string;
  delegateProfile?: NonNullable<
    RouterOutputs["delegates"]["byId"]
  >["delegateProfile"];
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm({
    resolver: zodResolver(CreateDelegateProfileSchema),
    defaultValues: {
      statement: "",
      interests: [],
      twitter: "",
      telegram: "",
      discord: "",
      github: "",
    },
    values: delegateProfile ?? undefined,
  });
  const { data: session } = useSession();

  const utils = api.useUtils();
  const createDelegateProfile = api.delegates.createProfile.useMutation({
    onSuccess: async () => {
      form.reset();
      await utils.delegates.invalidate();
    },
    onError: (err) => {
      toast({
        title: "Submission Error",
        description:
          err.data?.code === "UNAUTHORIZED"
            ? "You must be logged in to post"
            : "Failed to create post",
      });
    },
  });

  const requiresSignature = useMemo(() => {
    return !session?.user.name || padAddress(session.user.name) != delegateId;
  }, [session?.user.name, delegateProfile?.delegateId, delegateId]);

  return (
    <Form {...form}>
      <form
        ref={formRef}
        className="space-y-8"
        onSubmit={form.handleSubmit((data) => {
          createDelegateProfile.mutate(data);
        })}
      >
        <FormField
          name="statement"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Enter Your Profile description"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="discord"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discord</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter Your Discord handle" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="interests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Interests</FormLabel>
              <FormControl>
                <ToggleGroup
                  {...field}
                  //value={field.value}
                  onValueChange={field.onChange}
                  type={"multiple"}
                  variant="outline"
                  size={"sm"}
                  className="justify-start"
                >
                  <ToggleGroupItem value="gaming">Gaming</ToggleGroupItem>
                  <ToggleGroupItem value="game-design">
                    Game Design
                  </ToggleGroupItem>
                  <ToggleGroupItem value="dao">DAO</ToggleGroupItem>
                  <ToggleGroupItem value="defi">DeFi</ToggleGroupItem>
                  <ToggleGroupItem value="autonomous-worlds">
                    Autonomous Worlds
                  </ToggleGroupItem>
                </ToggleGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="twitter"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Twitter</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter Your Twitter handle" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="telegram"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telegram</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter Your Telegram handle" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="github"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Github</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter Your Github handle" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!requiresSignature && (
          <Button
            type="submit"
            className="mt-4"
            disabled={
              !form.formState.isDirty || createDelegateProfile.isPending
            }
          >
            {createDelegateProfile.isPending ? (
              <>
                <Loader className="mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Profile"
            )}
          </Button>
        )}
      </form>
      {requiresSignature && (
        <>
          <SIWSLogin />
          <Alert variant={"warning"}>
            You must sign a transaction with your Starknet wallet to edit your
            profile.
          </Alert>
        </>
      )}
    </Form>
  );
};
