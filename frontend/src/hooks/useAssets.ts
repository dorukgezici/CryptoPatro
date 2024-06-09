import { useState } from "react";
import { useStore } from "@nanostores/react";
import { useQuery } from "@tanstack/react-query";
import { $axios, $queryClient } from "@/lib/store";

export default function useAssets(page?: number, query?: string) {
  const queryClient = useStore($queryClient);
  const axios = useStore($axios);

  const [limit, setLimit] = useState<number>(5);
  const [offset, setOffset] = useState<number>(page ? page : 1);

  const { data, error, isPending, isFetching } = useQuery(
    {
      queryKey: ["assets"],
      queryFn: async () =>
        (await axios).apps_exchange_api_assets(limit, offset),
    },
    queryClient,
  );

  return {
    assets: data?.data.items,
    error,
    isPending,
    isFetching,
    limit,
    setLimit,
    offset,
    setOffset,
  };
}
