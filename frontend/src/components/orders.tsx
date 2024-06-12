import { useStore } from "@nanostores/react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { $assets, $assetsLimit } from "@/store/portfolio";
import { $selectedPair, $orders } from "@/store/binance";
import { formatFloat } from "@/lib/utils";

export function Orders() {
  $assetsLimit.set(20);
  const { data: assets } = useStore($assets);
  const selectedPair = useStore($selectedPair);
  const { data: orders } = useStore($orders);

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
                <TableCell>{order.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
