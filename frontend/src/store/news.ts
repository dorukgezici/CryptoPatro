import type { CryptopanicNews } from "@/types";
import { createFetcherStore } from "@/store/fetcher";
import { $axios } from "@/store/axios";

export const $news = createFetcherStore<CryptopanicNews[]>(["news"], {
  fetcher: async () => {
    const client = await $axios.get();
    const res = await client.apps_exchange_api_news();
    return (res.data as { results: CryptopanicNews[] }).results;
  },
});
