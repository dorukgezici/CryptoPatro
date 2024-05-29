"use client";
import { Button } from "@/components/ui/button";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  CardDescription,
  CardTitle,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { CalendarClockIcon } from "@/components/icons";
import { BarChart, PieChart, TimeseriesChart } from "@/components/charts";

type Props = {
  portfolio: any;
};

export function Dashboard({ portfolio }: Props) {
  return (
    <div>
      <div className="flex items-center gap-4">
        <h1 className="font-semibold text-lg md:text-xl">
          Portfolio {portfolio}
        </h1>
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
              <CardTitle>$123,456.78</CardTitle>
            </CardHeader>
            <CardContent>
              <TimeseriesChart className="aspect-[4/3]" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Total Profit/Loss</CardDescription>
              <CardTitle>$12,345.67</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart className="aspect-[4/3]" />
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
              <PieChart className="aspect-[4/3]" />
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
                <TableHead>PNL</TableHead>
                <TableHead>Buy Avg.</TableHead>
                <TableHead>Sell Avg.</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-gray-900 dark:bg-gray-50" />
                    <div>Bitcoin</div>
                  </div>
                </TableCell>
                <TableCell>$30,000.00</TableCell>
                <TableCell>$60,000.00</TableCell>
                <TableCell className="text-green-500">+20%</TableCell>
                <TableCell>$25,000.00</TableCell>
                <TableCell>$35,000.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-gray-100 dark:bg-gray-800" />
                    <div>Ethereum</div>
                  </div>
                </TableCell>
                <TableCell>$2,000.00</TableCell>
                <TableCell>$30,000.00</TableCell>
                <TableCell className="text-green-500">+50%</TableCell>
                <TableCell>$1,500.00</TableCell>
                <TableCell>$2,500.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-tertiary" />
                    <div>Litecoin</div>
                  </div>
                </TableCell>
                <TableCell>$100.00</TableCell>
                <TableCell>$10,000.00</TableCell>
                <TableCell className="text-red-500">-10%</TableCell>
                <TableCell>$120.00</TableCell>
                <TableCell>$90.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-[#ffa500]" />
                    <div>Solana</div>
                  </div>
                </TableCell>
                <TableCell>$50.00</TableCell>
                <TableCell>$5,000.00</TableCell>
                <TableCell className="text-green-500">+25%</TableCell>
                <TableCell>$40.00</TableCell>
                <TableCell>$60.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-[#9b59b6]" />
                    <div>Cardano</div>
                  </div>
                </TableCell>
                <TableCell>$1.00</TableCell>
                <TableCell>$2,000.00</TableCell>
                <TableCell className="text-red-500">-5%</TableCell>
                <TableCell>$1.20</TableCell>
                <TableCell>$0.80</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
