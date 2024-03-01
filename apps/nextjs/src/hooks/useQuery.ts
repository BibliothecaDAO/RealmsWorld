import { usePathname, useRouter, useSearchParams } from "next/navigation";

type QueryParam = Record<string, string>;

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
  const handleAttributeClick = (
    key: string,
    value: string,
    multi?: boolean,
  ) => {
    const params = new URLSearchParams(searchParams);

    if (multi) {
      if (params.getAll(key).includes(value) || params.get(key) == value) {
        params.delete(key, value);
      } else {
        params.append(key, value);
      }
    } else {
      params.get(key) == value ? params.delete(key) : params.set(key, value);
    }

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    router.replace(`${pathname}?${params}`);
  };

  const isAttributeInQuery = (key: string, value: string): boolean => {
    return (
      searchParams.has(key) &&
      (searchParams.get(key) === value ||
        searchParams.getAll(key).includes(value))
    );
  };

  const isKeyInQuery = (key: string): boolean => {
    return searchParams.has(key);
  };

  return {
    getQueriesFromUrl,
    handleAttributeClick,
    isAttributeInQuery,
    isKeyInQuery,
  };
};
