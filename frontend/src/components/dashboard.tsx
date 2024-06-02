// import { BarChart, PieChart, TimeseriesChart } from "@/components/charts";
import { CalendarClockIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import usePortfolioAssets from "@/hooks/usePortfolioAssets";
import { $queryClient } from "@/lib/store";
import { useStore } from "@nanostores/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { useMemo } from "react";

export function Dashboard() {
  const queryClient = useStore($queryClient);
  const { portfolioAssets } = usePortfolioAssets();

  const totalPortfolioValue = useMemo(
    () =>
      portfolioAssets?.reduce(
        (total, item) => total + parseInt(item.value || "0"),
        0,
      ),
    [portfolioAssets],
  );

  const totalRealizedPnl = useMemo(
    () =>
      portfolioAssets?.reduce(
        (total, item) => total + parseInt(item.realizedPnl || "0"),
        0,
      ),
    [portfolioAssets],
  );
  const totalUnrealizedPnl = useMemo(
    () =>
      portfolioAssets?.reduce(
        (total, item) => total + parseInt(item.unrealizedPnl || "0"),
        0,
      ),
    [portfolioAssets],
  );

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex items-center gap-4">
        <h1 className="font-semibold text-lg md:text-xl">Portfolio</h1>
        <div className="ml-auto flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="w-[280px] justify-start text-left font-normal"
                id="date"
                variant="outline"
              >
                <CalendarClockIcon className="mr-2 h-4 w-4" />
                June 01, 2023 - June 30, 2023
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-auto p-0">
              <Calendar initialFocus mode="range" numberOfMonths={2} />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="grid gap-6">
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardDescription>Total Portfolio Value</CardDescription>
              <CardTitle>${totalPortfolioValue}</CardTitle>
            </CardHeader>
            <CardContent>
              <span className="aspect-[4/3]" />
              {/* <TimeseriesChart className="aspect-[4/3]" /> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Total Profit/Loss</CardDescription>
              <CardTitle>${totalRealizedPnl}</CardTitle>
              <CardTitle className="text-yellow-500">
                ${totalUnrealizedPnl}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="aspect-[4/3]" />
              {/* <BarChart className="aspect-[4/3]" /> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Asset Allocation</CardDescription>
              <CardTitle>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-gray-900 dark:bg-gray-50" />
                  <div>Bitcoin</div>
                  <div className="text-gray-500 dark:text-gray-400">50%</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-gray-100 dark:bg-gray-800" />
                  <div>Ethereum</div>
                  <div className="text-gray-500 dark:text-gray-400">30%</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-tertiary" />
                  <div>Litecoin</div>
                  <div className="text-gray-500 dark:text-gray-400">20%</div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="aspect-[4/3]" />
              {/* <PieChart className="aspect-[4/3]" /> */}
            </CardContent>
          </Card>
        </div>
        <div className="border shadow-sm rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Total Value</TableHead>
                <TableHead>Realized PNL</TableHead>
                <TableHead>Unrealized PNL</TableHead>
                <TableHead>Buy Avg.</TableHead>
                <TableHead>Sell Avg.</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {portfolioAssets?.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-gray-900 dark:bg-gray-50" />
                      <div>{item.asset.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>${item.asset.price}</TableCell>
                  <TableCell>${item.value}</TableCell>
                  <TableCell className="text-green-500">
                    {item.realizedPnl}
                  </TableCell>
                  <TableCell className="text-green-500">
                    {item.unrealizedPnl}
                  </TableCell>
                  <TableCell>${item.avgCost}</TableCell>
                  <TableCell>${item.avgCharge}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </QueryClientProvider>
  );
}
