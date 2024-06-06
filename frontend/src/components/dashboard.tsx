import { BarChart, PieChart, TimeseriesChart } from "@/components/charts";
import { CalendarClockIcon, RefreshCwIcon } from "@/components/icons";
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
import { $axios } from "@/lib/store";
import { useStore } from "@nanostores/react";
import { useMemo } from "react";

const formatFloat = (value?: number) => value?.toFixed(2) || "0.00";

export function Dashboard() {
  const { portfolioAssets } = usePortfolioAssets();
  const axios = useStore($axios);

  const totalPortfolioValue = useMemo(
    () => portfolioAssets?.reduce((total, item) => total + item.value, 0),
    [portfolioAssets],
  );
  const totalRealizedPnl = useMemo(
    () =>
      portfolioAssets?.reduce((total, item) => total + item.realized_pnl, 0),
    [portfolioAssets],
  );
  const totalUnrealizedPnl = useMemo(
    () =>
      portfolioAssets?.reduce((total, item) => total + item.unrealized_pnl, 0),
    [portfolioAssets],
  );

  return (
    <>
      <div className="flex items-center gap-4">
        <h1 className="font-semibold text-lg md:text-xl">Portfolio</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={async () => (await axios).apps_exchange_api_refresh()}
          >
            <RefreshCwIcon className="h-4 w-4" />
            <span className="sr-only">Refresh portfolio</span>
          </Button>
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
              <CardTitle>${formatFloat(totalPortfolioValue)}</CardTitle>
            </CardHeader>
            <CardContent>
              <span className="aspect-[4/3]" />
              <TimeseriesChart className="aspect-[4/3]" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Total Profit/Loss</CardDescription>
              <CardTitle>${formatFloat(totalUnrealizedPnl)}</CardTitle>
              <CardTitle className="text-gray-500">
                ${formatFloat(totalRealizedPnl)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="aspect-[4/3]" />
              <BarChart className="aspect-[4/3]" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Asset Allocation</CardDescription>
              <CardTitle>
                {portfolioAssets?.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-gray-900 dark:bg-gray-50" />
                    <div>{item.asset.name}</div>
                    <div className="text-gray-500 dark:text-gray-400">
                      {item.percentage}%
                    </div>
                  </div>
                ))}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="aspect-[4/3]" />
              <PieChart className="aspect-[4/3]" assets={portfolioAssets} />
            </CardContent>
          </Card>
        </div>
        <div className="border shadow-sm rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Total Value</TableHead>
                <TableHead>Unrealized PNL</TableHead>
                <TableHead>Realized PNL</TableHead>
                <TableHead>Buy Avg. x Amount</TableHead>
                <TableHead>Sell Avg. x Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {portfolioAssets?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-gray-900 dark:bg-gray-50" />
                      <div>{item.asset.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>${formatFloat(item.asset.price)}</TableCell>
                  <TableCell>{formatFloat(item.amount)}</TableCell>
                  <TableCell>${formatFloat(item.value)}</TableCell>
                  <TableCell className="text-green-500">
                    {formatFloat(item.unrealized_pnl)}
                  </TableCell>
                  <TableCell className="text-green-500">
                    {formatFloat(item.realized_pnl)}
                  </TableCell>
                  <TableCell>
                    ${formatFloat(item.avg_cost)} x{" "}
                    {formatFloat(item.buy_amount)} ={" "}
                    {formatFloat(item.avg_cost * item.buy_amount)}
                  </TableCell>
                  <TableCell>
                    ${formatFloat(item.avg_charge)} x{" "}
                    {formatFloat(item.sell_amount)} ={" "}
                    {formatFloat(item.avg_charge * item.sell_amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
