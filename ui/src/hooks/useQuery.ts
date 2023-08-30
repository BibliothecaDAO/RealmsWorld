import { useSearchParams, useRouter, usePathname } from "next/navigation";

type QueryParam = {
    [key: string]: string;
};


export const useQuery = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    function getQueriesFromUrl(): QueryParam[] {
        const queryParams: QueryParam[] = [];

        for (const [key, value] of searchParams.entries()) {
            queryParams.push({ key, value });
        }

        return queryParams;
    }

    const handleAttributeClick = (key: string, value: string) => {
        // @ts-ignore
        const params = new URLSearchParams(searchParams);

        if (params.has(key) || params.get(key) === "") {
            // If the attribute with the same value exists, delete it.
            params.delete(key);
        } else {
            // Otherwise, set the attribute to the new value.
            params.set(key, value);
        }

        router.replace(`${pathname}?${params}`);
    };

    const isAttributeInQuery = (key: string, value: string): boolean => {
        return searchParams.has(key) && searchParams.get(key) === value;
    };

    const isKeyInQuery = (key: string): boolean => {
        return searchParams.has(key);
    };

    return {
        getQueriesFromUrl,
        handleAttributeClick,
        isAttributeInQuery,
        isKeyInQuery
    }
}