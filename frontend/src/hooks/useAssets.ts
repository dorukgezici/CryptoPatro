import { $axios, $queryClient } from "@/lib/store";
import { useStore } from "@nanostores/react";
import { useQuery } from "@tanstack/react-query";

export default function useAssets() {
  const queryClient = useStore($queryClient);
  const axios = useStore($axios);
  const { data, error, isPending, isFetching } = useQuery(
    {
      queryKey: ["assets"],
      queryFn: async () => (await axios).apps_exchange_api_assets(),
    },
    queryClient,
  );

  return {
    assets: data?.data,
    error,
    isPending,
    isFetching,
  };
}
