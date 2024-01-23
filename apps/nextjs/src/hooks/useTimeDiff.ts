import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";

dayjs.extend(relativeTime);

export function useTimeDiff(timestamp?: number) {
  const [timeSince, setTimeSince] = useState("");

  useEffect(() => {
    if (timestamp) {
      setTimeSince(dayjs.unix(timestamp).fromNow());
    } else {
      setTimeSince("");
    }
  }, [timestamp]);

  return timeSince;
}
