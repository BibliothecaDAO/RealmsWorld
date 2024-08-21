"use client";

import { useMemo, useRef } from "react";
import Discord from "@/icons/discord.svg";
import Telegram from "@/icons/telegram.svg";
import X from "@/icons/x.svg";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Github, Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

import type { DelegateProfile } from "@/app/account/profile/Profile";

import { CreateDelegateProfileSchema } from "@realms-world/db/schema";
import {
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
  delegateProfile?: NonNullable<DelegateProfile>;
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
    values: delegateProfile,
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

  const interests = [
    { value: "gaming", label: "Gaming" },
    { value: "game-design", label: "Game Design" },
    { value: "game-development", label: "Game Development" },
    { value: "dao", label: "DAO" },
    { value: "defi", label: "DeFi" },
    { value: "autonomous-worlds", label: "Autonomous Worlds" },
    { value: "cybersecurity", label: "Cybersecurity" },
    { value: "esports", label: "Esports" },
    { value: "encryption", label: "Encryption" },
    { value: "ai-in-gaming", label: "AI in Gaming" },
    { value: "nfts", label: "NFTs" },
    { value: "economics", label: "Economics" },
    { value: "cryptography", label: "Cryptography" },
    { value: "scaling", label: "Scaling" },
    { value: "starknet", label: "Starknet" },
    { value: "governance", label: "Governance" },
    { value: "finance", label: "Finance" },
  ];

  const requiresSignature = useMemo(() => {
    return !session?.user.name || padAddress(session.user.name) != delegateId;
  }, [session?.user.name, delegateId]);

  return (
    <>
      <Form {...form}>
        <form
          ref={formRef}
          onSubmit={form.handleSubmit((data) => {
            createDelegateProfile.mutate(data);
          })}
        >
          <fieldset disabled={requiresSignature} className="space-y-8">
            <FormField
              name="statement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile</FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-[100px]"
                      {...field}
                      placeholder="Enter Your Profile description"
                    />
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
                      onValueChange={field.onChange}
                      type="multiple"
                      variant="outline"
                      size="sm"
                      className="grid grid-cols-4 justify-start lg:grid-cols-6"
                    >
                      {interests.map(({ value, label }) => (
                        <ToggleGroupItem
                          className="leading-none"
                          key={value}
                          value={value}
                        >
                          {label}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
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
                    <div className="flex items-center">
                      <Discord className="mr-3 h-6 w-6" />
                      <Input
                        {...field}
                        placeholder="Enter Your Discord handle"
                      />
                    </div>
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
                    <div className="flex items-center">
                      <X className="mr-3 h-6 w-6" />
                      <Input
                        {...field}
                        placeholder="Enter Your Twitter handle"
                      />
                    </div>
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
                    <div className="flex items-center">
                      <Telegram className="mr-3 h-6 w-6" />
                      <Input
                        {...field}
                        placeholder="Enter Your Telegram handle"
                      />
                    </div>
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
                    <div className="flex items-center">
                      <Github className="mr-3 h-6 w-6" />
                      <Input
                        {...field}
                        placeholder="Enter Your Github handle"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>
          <Button
            type="submit"
            className="mt-4"
            disabled={
              !form.formState.isDirty ||
              createDelegateProfile.isPending ||
              requiresSignature
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
        </form>
      </Form>
    </>
  );
};
