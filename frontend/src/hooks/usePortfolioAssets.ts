import { $axios, $queryClient } from "@/lib/store";
import { useStore } from "@nanostores/react";
import { useQuery } from "@tanstack/react-query";

export default function usePortfolioAssets() {
  const queryClient = useStore($queryClient);
  const axios = useStore($axios);
  const { data, error, isPending, isFetching } = useQuery(
    {
      queryKey: ["portfolioAssets"],
      queryFn: async () => (await axios).portfolio_assets_list(),
    },
    queryClient,
  );

  return {
    portfolioAssets: data?.data.sort((a, b) => b.percentage - a.percentage),
    error,
    isPending,
    isFetching,
  };
}
