import { useListResults, type ListResultsQueryResult } from "@workspace/api-client-react";

export type StateResultItem = ListResultsQueryResult["results"][number];

export function useStateResults(stateName: string) {
  const query = useListResults(
    {
      state: stateName,
      page: 1,
      limit: 50,
    },
    {
      query: {
        queryKey: ["state-results", stateName],
      },
    },
  );

  return {
    ...query,
    results: query.data?.results ?? [],
    total: query.data?.total ?? 0,
  };
}
