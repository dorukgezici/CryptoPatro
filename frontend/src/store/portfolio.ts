import { atom } from "nanostores";
import type { Asset, PortfolioAsset } from "@/types";
import { createFetcherStore, createMutatorStore } from "@/store/fetcher";
import { $axios } from "@/store/axios";

const $assets_limit = atom(5);
const $assets_offset = atom(0);
export const $assets = createFetcherStore<Asset[]>(
  ["assets", $assets_limit, $assets_offset],
  {
    fetcher: async () => {
      const client = await $axios.get();
      const res = await client.apps_exchange_api_assets(5, 1);
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
