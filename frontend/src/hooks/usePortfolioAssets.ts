import { $axios, $queryClient } from "@/lib/store";
import { useStore } from "@nanostores/react";
import { useQuery } from "@tanstack/react-query";

export default function usePortfolioAssets() {
  const queryClient = useStore($queryClient);
  const axios = useStore($axios);
  const { data, error, isPending, isFetching } = useQuery(
    {
      queryKey: ["portfolioAssets"],
      queryFn: async () => (await axios).apps_exchange_api_portfolio_assets(),
    },
    queryClient,
  );

  return {
    portfolioAssets: data?.data.sort((a, b) => b.value - a.value),
    error,
    isPending,
    isFetching,
  };
}
