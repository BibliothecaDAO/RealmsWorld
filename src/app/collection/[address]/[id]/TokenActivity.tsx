"use client";

import { ActivityCard } from "@/app/components/ActivityCard";
import { getData } from "@/functions";
import { Activity, Token } from "@/types";
import { useEffect, useMemo, useState } from "react";

interface Props {
  token: Token;
}

export const TokenActivity = ({ token }: Props) => {
  const [tokenActivity, setTokenActivity] = useState<Activity[]>([]);

  const token_params = token.collection.id + ":" + token.tokenId;

  const getActivity = async () => {
    try {
      const token_activity = await getData(
        { token: token_params },
        "tokenActivity"
      );
      setTokenActivity(token_activity.activities);

      console.log(token_activity);
    } catch (e) {
      console.log(e);
    }
  };

  useMemo(() => {
    getActivity();
  }, [token]);

  return (
    <div className="grid grid-cols-1 my-4 overflow-y-scroll border rounded border-white/20 h-96">
      {tokenActivity &&
        tokenActivity.map((activity: Activity, index: number) => {
          return <ActivityCard key={index} activity={activity} />;
        })}
    </div>
  );
};
