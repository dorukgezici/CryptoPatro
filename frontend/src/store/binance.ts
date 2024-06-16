import { atom } from "nanostores";
import type { BinanceOrder } from "@/types";
import { createFetcherStore } from "@/store/fetcher";
import { $axios } from "@/store/axios";

export const $selectedPair = atom("BTCUSDT");
export const $orders = createFetcherStore<BinanceOrder[]>(
  ["assets", $selectedPair],
  {
    fetcher: async () => {
      const client = await $axios.get();
      const res = await client.cryptopatro_exchange_api_all_orders(
        $selectedPair.get(),
      );
      return (res.data as BinanceOrder[]).sort((a, b) => b.time - a.time);
    },
  },
);
