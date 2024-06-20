"use client";

import { useRef } from "react";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { CreateDelegateProfileSchema } from "@realms-world/db/schema";
import {
  Button,
  Form,
  FormControl,
  FormDescription,
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

export const ProfileForm = () => {
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
  });

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
  return (
    <Form {...form}>
      <form
        ref={formRef}
        className="space-y-8"
        onSubmit={form.handleSubmit((data) => {
          console.log(data);
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
                <>
                  <ToggleGroup
                    {...field}
                    value={field.value}
                    onValueChange={field.onChange}
                    type={"multiple"}
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
                  <Input {...field} placeholder="Select Interests" />
                </>
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

        <Button type="submit" className="mt-4">
          Save Profile
        </Button>
      </form>
    </Form>
  );
};
