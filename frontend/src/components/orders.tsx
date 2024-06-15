import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatFloat, formatTimestamp } from "@/lib/utils";
import { $orders, $selectedPair } from "@/store/binance";
import { $assets, $assetsLimit } from "@/store/portfolio";
import { useStore } from "@nanostores/react";
import { useMemo } from "react";

export function Orders() {
  $assetsLimit.set(20);
  const { data: assets } = useStore($assets);
  const selectedPair = useStore($selectedPair);
  const { data: orders } = useStore($orders);

  const calculated = useMemo(() => {
    const totalBought = {
      amount: 0,
      value: 0,
    };
    const totalSold = {
      amount: 0,
      value: 0,
    };

    orders?.forEach((order) => {
      if (order.side === "BUY") {
        totalBought.amount += parseFloat(order.executedQty);
        totalBought.value +=
          parseFloat(order.executedQty) * parseFloat(order.price);
      } else {
        totalSold.amount += parseFloat(order.executedQty);
        totalSold.value +=
          parseFloat(order.executedQty) * parseFloat(order.price);
      }
    });

    return {
      totalBought,
      totalSold,
      realizedPNL: totalSold.value - totalBought.value,
    };
  }, [orders]);

  return (
    <>
      <div className="flex items-center gap-4">
        <h1 className="font-semibold text-lg md:text-xl">Transactions</h1>
        <Select
          value={selectedPair}
          onValueChange={(value) => $selectedPair.set(value)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select a pair" />
          </SelectTrigger>
          <SelectContent>
            {assets?.map((asset) => (
              <SelectItem
                key={asset.symbol}
                value={`${asset.symbol.toUpperCase()}USDT`}
              >
                {`${asset.symbol.toUpperCase()}USDT`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6">
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardDescription>Total Bought</CardDescription>
              <CardTitle>
                ${formatFloat(calculated.totalBought.value)}
              </CardTitle>
              <CardTitle className="text-gray-500">
                {formatFloat(calculated.totalBought.amount)}
              </CardTitle>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Total Sold</CardDescription>
              <CardTitle>${formatFloat(calculated.totalSold.value)}</CardTitle>
              <CardTitle className="text-gray-500">
                {formatFloat(calculated.totalSold.amount)}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Realized PNL</CardDescription>
              <CardTitle>${formatFloat(calculated.realizedPNL)}</CardTitle>
              <CardTitle className="text-gray-500">
                {formatFloat(
                  calculated.totalBought.amount - calculated.totalSold.amount,
                )}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        <div className="border shadow-sm rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pair</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders?.map((order) => (
                <TableRow key={order.orderId}>
                  <TableCell>{order.symbol}</TableCell>
                  <TableCell
                    className={
                      order.side === "BUY" ? "text-green-500" : "text-red-500"
                    }
                  >
                    {order.side}
                  </TableCell>
                  <TableCell>${formatFloat(order.price)}</TableCell>
                  <TableCell>{formatFloat(order.executedQty)}</TableCell>
                  <TableCell>
                    $
                    {formatFloat(
                      parseFloat(order.price) * parseFloat(order.executedQty),
                    )}
                  </TableCell>
                  <TableCell>{formatTimestamp(order.time)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
