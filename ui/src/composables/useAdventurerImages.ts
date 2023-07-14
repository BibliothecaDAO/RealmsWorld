import { useInfiniteQuery } from "@tanstack/react-query";

export const useAccountChange = (fn: any, deps = []) => {

    const imagesQuery = useInfiniteQuery({
        queryKey: ["Adventuer Images"],
        queryFn: async () => { },
        //enabled: !!accountL1,
        //refetchInterval: GET_PENDING_WITHDRAWALS_REFETCH_INTERVAL,
    });

    return {
        imagesQuery
    }
}