import type { Components } from "@/types/openapi";

export type TaskStatus =
  | string
  | "PENDING"
  | "RECEIVED"
  | "STARTED"
  | "SUCCESS"
  | "FAILURE"
  | "RETRY"
  | "REVOKED";

export type Portfolio = Components.Schemas.PortfolioSchema;
export type Asset = Components.Schemas.AssetSchema;
export type PortfolioAsset = Components.Schemas.PortfolioAssetSchema;

export type BinanceOrder = {
  symbol: string;
  orderId: number;
  orderListId: number;
  clientOrderId: string;
  price: string;
  origQty: string;
  executedQty: string;
  cummulativeQuoteQty: string;
  status: string;
  timeInForce: string;
  type: string;
  side: "BUY" | "SELL";
  stopPrice: string;
  icebergQty: string;
  time: number;
  updateTime: number;
  isWorking: boolean;
  origQuoteOrderQty: string;
};

export type CryptopanicNews = {
  kind: string;
  domain: string;
  source: {
    title: string;
    region: string;
    domain: string;
    path: string | null;
  };
  title: string;
  published_at: string;
  slug: string;
  id: number;
  url: string;
  created_at: string;
  votes: {
    negative: number;
    positive: number;
    important: number;
    liked: number;
    disliked: number;
    lol: number;
    toxic: number;
    saved: number;
    comments: number;
  };
  metadata: {
    description: string;
  };
};
