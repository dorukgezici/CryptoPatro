import { atom } from "nanostores";
import type { Asset, PortfolioAsset } from "@/types";
import { createFetcherStore, createMutatorStore } from "@/store/fetcher";
import { $axios } from "@/store/axios";

export const $assetsLimit = atom(5);
export const $assetsOffset = atom(0);
export const $assets = createFetcherStore<Asset[]>(
  ["assets", $assetsLimit, $assetsOffset],
  {
    fetcher: async () => {
      const client = await $axios.get();
      const res = await client.apps_exchange_api_assets(
        $assetsLimit.get(),
        $assetsOffset.get(),
      );
      return res.data.items;
    },
  },
);

export const $portfolioAssets = createFetcherStore<PortfolioAsset[]>(
  ["portfolioAssets"],
  {
    fetcher: async () => {
      const client = await $axios.get();
      const res = await client.apps_exchange_api_portfolio_assets();
      return res.data.sort((a, b) => b.value - a.value);
    },
  },
);

type CreatePortfolioAsset = {
  portfolioId: number;
  assetId: number;
};
export const $createPortfolioAsset = createMutatorStore<CreatePortfolioAsset>(
  async ({ data, revalidate }) => {
    revalidate("portfolioAssets");
    const client = await $axios.get();
    const res = await client.apps_exchange_api_create_portfolio_asset(
      undefined,
      {
        portfolio_id: 1,
        asset_id: data.assetId,
      },
    );
    return res.data;
  },
);

export const $deletePortfolioAsset = createMutatorStore<{ id: number }>(
  async ({ data, revalidate }) => {
    revalidate("portfolioAssets");
    const client = await $axios.get();
    const res = await client.apps_exchange_api_delete_portfolio_asset(data.id);
    return res.data;
  },
);

export const $refreshPortfolio = createMutatorStore(async ({ revalidate }) => {
  revalidate("portfolioAssets");
  const client = await $axios.get();
  const res = await client.apps_exchange_api_refresh();
  return res.data;
});
