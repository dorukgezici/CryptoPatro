import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from "openapi-client-axios";

declare namespace Components {
  namespace Schemas {
    /**
     * AssetSchema
     */
    export interface AssetSchema {
      /**
       * Price
       */
      price: number;
      /**
       * ID
       */
      id?: /* ID */ number | null;
      /**
       * Created At
       */
      created_at: string; // date-time
      /**
       * Updated At
       */
      updated_at: string; // date-time
      /**
       * Symbol
       */
      symbol: string;
      /**
       * Name
       */
      name: string;
    }
    /**
     * PortfolioAssetSchema
     */
    export interface PortfolioAssetSchema {
      portfolio: /* PortfolioSchema */ PortfolioSchema;
      asset: /* AssetSchema */ AssetSchema;
      /**
       * Amount
       */
      amount: number;
      /**
       * Value
       */
      value: number;
      /**
       * Avg Cost
       */
      avg_cost: number;
      /**
       * Buy Amount
       */
      buy_amount: number;
      /**
       * Avg Charge
       */
      avg_charge: number;
      /**
       * Sell Amount
       */
      sell_amount: number;
      /**
       * Realized Pnl
       */
      realized_pnl: number;
      /**
       * Unrealized Pnl
       */
      unrealized_pnl: number;
      /**
       * ID
       */
      id?: /* ID */ number | null;
      /**
       * Created At
       */
      created_at: string; // date-time
      /**
       * Updated At
       */
      updated_at: string; // date-time
    }
    /**
     * PortfolioSchema
     */
    export interface PortfolioSchema {
      /**
       * Total Value
       */
      total_value: number;
      /**
       * ID
       */
      id?: /* ID */ number | null;
      /**
       * Created At
       */
      created_at: string; // date-time
      /**
       * Updated At
       */
      updated_at: string; // date-time
      /**
       * User
       */
      user: number;
      /**
       * Name
       */
      name: string;
    }
  }
}
declare namespace Paths {
  namespace AppsApiHealth {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace AppsExchangeApiAccount {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace AppsExchangeApiAllOrders {
    namespace Parameters {
      /**
       * Pair
       */
      export type Pair = string;
    }
    export interface PathParameters {
      pair: /* Pair */ Parameters.Pair;
    }
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace AppsExchangeApiAssets {
    namespace Responses {
      /**
       * Response
       */
      export type $200 = /* AssetSchema */ Components.Schemas.AssetSchema[];
    }
  }
  namespace AppsExchangeApiCurrentAvgPrice {
    namespace Parameters {
      /**
       * Pair
       */
      export type Pair = string;
    }
    export interface PathParameters {
      pair: /* Pair */ Parameters.Pair;
    }
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace AppsExchangeApiInfo {
    namespace Parameters {
      /**
       * Pair
       */
      export type Pair = string;
    }
    export interface PathParameters {
      pair: /* Pair */ Parameters.Pair;
    }
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace AppsExchangeApiMyTrades {
    namespace Parameters {
      /**
       * Pair
       */
      export type Pair = string;
    }
    export interface PathParameters {
      pair: /* Pair */ Parameters.Pair;
    }
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace AppsExchangeApiNews {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace AppsExchangeApiOpenOrders {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace AppsExchangeApiOrderBook {
    namespace Parameters {
      /**
       * Pair
       */
      export type Pair = string;
    }
    export interface PathParameters {
      pair: /* Pair */ Parameters.Pair;
    }
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace AppsExchangeApiPortfolioAssets {
    namespace Responses {
      /**
       * Response
       */
      export type $200 =
        /* PortfolioAssetSchema */ Components.Schemas.PortfolioAssetSchema[];
    }
  }
  namespace AppsExchangeApiRecentTrades {
    namespace Parameters {
      /**
       * Pair
       */
      export type Pair = string;
    }
    export interface PathParameters {
      pair: /* Pair */ Parameters.Pair;
    }
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace AppsExchangeApiRefresh {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace AppsExchangeApiTickerPriceChange {
    namespace Parameters {
      /**
       * Pair
       */
      export type Pair = string;
    }
    export interface PathParameters {
      pair: /* Pair */ Parameters.Pair;
    }
    namespace Responses {
      export interface $200 {}
    }
  }
}

export interface OperationMethods {
  /**
   * apps_api_health - Health
   */
  "apps_api_health"(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.AppsApiHealth.Responses.$200>;
  /**
   * apps_exchange_api_assets - Assets
   */
  "apps_exchange_api_assets"(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.AppsExchangeApiAssets.Responses.$200>;
  /**
   * apps_exchange_api_portfolio_assets - Portfolio Assets
   */
  "apps_exchange_api_portfolio_assets"(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.AppsExchangeApiPortfolioAssets.Responses.$200>;
  /**
   * apps_exchange_api_refresh - Refresh
   */
  "apps_exchange_api_refresh"(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.AppsExchangeApiRefresh.Responses.$200>;
  /**
   * apps_exchange_api_info - Info
   */
  "apps_exchange_api_info"(
    parameters: Parameters<Paths.AppsExchangeApiInfo.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.AppsExchangeApiInfo.Responses.$200>;
  /**
   * apps_exchange_api_order_book - Order Book
   */
  "apps_exchange_api_order_book"(
    parameters: Parameters<Paths.AppsExchangeApiOrderBook.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.AppsExchangeApiOrderBook.Responses.$200>;
  /**
   * apps_exchange_api_recent_trades - Recent Trades
   */
  "apps_exchange_api_recent_trades"(
    parameters: Parameters<Paths.AppsExchangeApiRecentTrades.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.AppsExchangeApiRecentTrades.Responses.$200>;
  /**
   * apps_exchange_api_current_avg_price - Current Avg Price
   */
  "apps_exchange_api_current_avg_price"(
    parameters: Parameters<Paths.AppsExchangeApiCurrentAvgPrice.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.AppsExchangeApiCurrentAvgPrice.Responses.$200>;
  /**
   * apps_exchange_api_ticker_price_change - Ticker Price Change
   */
  "apps_exchange_api_ticker_price_change"(
    parameters: Parameters<Paths.AppsExchangeApiTickerPriceChange.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.AppsExchangeApiTickerPriceChange.Responses.$200>;
  /**
   * apps_exchange_api_all_orders - All Orders
   */
  "apps_exchange_api_all_orders"(
    parameters: Parameters<Paths.AppsExchangeApiAllOrders.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.AppsExchangeApiAllOrders.Responses.$200>;
  /**
   * apps_exchange_api_open_orders - Open Orders
   */
  "apps_exchange_api_open_orders"(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.AppsExchangeApiOpenOrders.Responses.$200>;
  /**
   * apps_exchange_api_account - Account
   */
  "apps_exchange_api_account"(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.AppsExchangeApiAccount.Responses.$200>;
  /**
   * apps_exchange_api_my_trades - My Trades
   */
  "apps_exchange_api_my_trades"(
    parameters: Parameters<Paths.AppsExchangeApiMyTrades.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.AppsExchangeApiMyTrades.Responses.$200>;
  /**
   * apps_exchange_api_news - News
   */
  "apps_exchange_api_news"(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.AppsExchangeApiNews.Responses.$200>;
}

export interface PathsDictionary {
  ["/api/health"]: {
    /**
     * apps_api_health - Health
     */
    "get"(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.AppsApiHealth.Responses.$200>;
  };
  ["/api/exchange/assets"]: {
    /**
     * apps_exchange_api_assets - Assets
     */
    "get"(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.AppsExchangeApiAssets.Responses.$200>;
  };
  ["/api/exchange/portfolio-assets"]: {
    /**
     * apps_exchange_api_portfolio_assets - Portfolio Assets
     */
    "get"(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.AppsExchangeApiPortfolioAssets.Responses.$200>;
  };
  ["/api/exchange/refresh"]: {
    /**
     * apps_exchange_api_refresh - Refresh
     */
    "get"(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.AppsExchangeApiRefresh.Responses.$200>;
  };
  ["/api/exchange/info/{pair}"]: {
    /**
     * apps_exchange_api_info - Info
     */
    "get"(
      parameters: Parameters<Paths.AppsExchangeApiInfo.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.AppsExchangeApiInfo.Responses.$200>;
  };
  ["/api/exchange/order-book/{pair}"]: {
    /**
     * apps_exchange_api_order_book - Order Book
     */
    "get"(
      parameters: Parameters<Paths.AppsExchangeApiOrderBook.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.AppsExchangeApiOrderBook.Responses.$200>;
  };
  ["/api/exchange/recent-trades/{pair}"]: {
    /**
     * apps_exchange_api_recent_trades - Recent Trades
     */
    "get"(
      parameters: Parameters<Paths.AppsExchangeApiRecentTrades.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.AppsExchangeApiRecentTrades.Responses.$200>;
  };
  ["/api/exchange/current-avg-price/{pair}"]: {
    /**
     * apps_exchange_api_current_avg_price - Current Avg Price
     */
    "get"(
      parameters: Parameters<Paths.AppsExchangeApiCurrentAvgPrice.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.AppsExchangeApiCurrentAvgPrice.Responses.$200>;
  };
  ["/api/exchange/ticker-price-change/{pair}"]: {
    /**
     * apps_exchange_api_ticker_price_change - Ticker Price Change
     */
    "get"(
      parameters: Parameters<Paths.AppsExchangeApiTickerPriceChange.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.AppsExchangeApiTickerPriceChange.Responses.$200>;
  };
  ["/api/exchange/all-orders/{pair}"]: {
    /**
     * apps_exchange_api_all_orders - All Orders
     */
    "get"(
      parameters: Parameters<Paths.AppsExchangeApiAllOrders.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.AppsExchangeApiAllOrders.Responses.$200>;
  };
  ["/api/exchange/open-orders"]: {
    /**
     * apps_exchange_api_open_orders - Open Orders
     */
    "get"(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.AppsExchangeApiOpenOrders.Responses.$200>;
  };
  ["/api/exchange/account"]: {
    /**
     * apps_exchange_api_account - Account
     */
    "get"(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.AppsExchangeApiAccount.Responses.$200>;
  };
  ["/api/exchange/my-trades/{pair}"]: {
    /**
     * apps_exchange_api_my_trades - My Trades
     */
    "get"(
      parameters: Parameters<Paths.AppsExchangeApiMyTrades.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.AppsExchangeApiMyTrades.Responses.$200>;
  };
  ["/api/exchange/news"]: {
    /**
     * apps_exchange_api_news - News
     */
    "get"(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.AppsExchangeApiNews.Responses.$200>;
  };
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>;
