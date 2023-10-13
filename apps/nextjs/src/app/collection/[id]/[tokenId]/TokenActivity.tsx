"use client";

import { useMemo, useState } from "react";
import { ActivityCard } from "@/app/collection/[id]/(list)/activity/ActivityCard";
import { getTokenActivity } from "@/lib/reservoir/getTokenActivity";
import type { Activity, Token } from "@/types";

interface Props {
  token: Token;
}

export const TokenActivity = ({ token }: Props) => {
  const [tokenActivity, setTokenActivity] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const token_params = token.collection.id + ":" + token.tokenId;

  const getActivity = async () => {
    setLoading(true);
    try {
      const token_activity = await getTokenActivity({ token: token_params });
      setTokenActivity(token_activity.activities);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useMemo(() => {
    getActivity();
  }, [token]);

  return (
    <div className="my-4 grid h-96 grid-cols-1 overflow-y-scroll rounded border border-white/20">
      {tokenActivity &&
        tokenActivity.map((activity: Activity, index: number) => {
          return <ActivityCard key={index} activity={activity} />;
        })}
      {loading && (
        <>
          {new Array(6).fill(0).map((index) => (
            <div
              key={index}
              className="flex h-20 w-full animate-pulse flex-wrap border-b border-white/30 bg-gray-600 p-2"
            ></div>
          ))}
        </>
      )}
    </div>
  );
};
