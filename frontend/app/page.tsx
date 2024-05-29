import { Dashboard } from "@/components/dashboard";
import usePortfolios from "@/hooks/usePortfolios";

export default async function Home() {
  const { portfolios } = usePortfolios();

  return <Dashboard portfolio={portfolios ? portfolios[0] : null} />;
}
