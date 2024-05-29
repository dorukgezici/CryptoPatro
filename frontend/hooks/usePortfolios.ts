import { useQuery } from "@tanstack/react-query";
import exchange from "@/lib/api/exchange";

export default function usePortfolios(): {
  portfolios?: any[];
  error: Error | null;
  isPending: boolean;
  isFetching: boolean;
} {
  const { data, error, isPending, isFetching } = useQuery({
    queryKey: ["portfolios"],
    queryFn: exchange.getPortfolios,
  });

  return {
    portfolios: data,
    error,
    isPending,
    isFetching,
  };
}
