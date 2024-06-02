import { $axios, $queryClient } from "@/lib/store";
import { useStore } from "@nanostores/react";
import { useQuery } from "@tanstack/react-query";

export default function usePortfolios() {
  const queryClient = useStore($queryClient);
  const axios = useStore($axios);
  const { data, error, isPending, isFetching } = useQuery(
    {
      queryKey: ["portfolios"],
      queryFn: () => axios.portfolios_list(),
    },
    queryClient,
  );

  return {
    portfolios: data?.data,
    error,
    isPending,
    isFetching,
  };
}
