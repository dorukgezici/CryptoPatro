import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from "openapi-client-axios";

declare namespace Components {
  namespace Schemas {
    export interface Asset {
      id: number;
      symbol: string;
      name: string;
      icon: string;
      price: string; // decimal ^-?\d{0,8}(?:\.\d{0,2})?$
      priceChange: string;
    }
    export interface AuthToken {
      username: string;
      password: string;
      token: string;
    }
    export interface AuthUser {
      id: number;
      /**
       * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
       */
      username: string; // ^[\w.@+-]+$
      firstName?: string;
      lastName?: string;
      /**
       * Email address
       */
      email?: string; // email
      password: string;
      password2?: string;
    }
    export interface PatchedAuthUser {
      id?: number;
      /**
       * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
       */
      username?: string; // ^[\w.@+-]+$
      firstName?: string;
      lastName?: string;
      /**
       * Email address
       */
      email?: string; // email
      password?: string;
      password2?: string;
    }
    export interface Portfolio {
      id: number;
      createdAt: string; // date-time
      updatedAt: string; // date-time
      name: string;
      user: number;
    }
    export interface PortfolioAsset {
      id: number;
      portfolio: Portfolio;
      asset: Asset;
      createdAt: string; // date-time
      updatedAt: string; // date-time
      /**
       * Amount (quantity)
       */
      amount?: string; // decimal ^-?\d{0,56}(?:\.\d{0,8})?$
      /**
       * Value (USD)
       */
      value?: string; // decimal ^-?\d{0,56}(?:\.\d{0,8})?$
      /**
       * Average cost
       */
      avgCost?: string; // decimal ^-?\d{0,56}(?:\.\d{0,8})?$
      buyAmount?: string; // decimal ^-?\d{0,56}(?:\.\d{0,8})?$
      /**
       * Average charge
       */
      avgCharge?: string; // decimal ^-?\d{0,56}(?:\.\d{0,8})?$
      sellAmount?: string; // decimal ^-?\d{0,56}(?:\.\d{0,8})?$
      realizedPnl?: string; // decimal ^-?\d{0,56}(?:\.\d{0,8})?$
      unrealizedPnl?: string; // decimal ^-?\d{0,56}(?:\.\d{0,8})?$
    }
    export interface User {
      id: number;
      /**
       * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
       */
      username: string; // ^[\w.@+-]+$
      firstName?: string;
      lastName?: string;
    }
  }
}
declare namespace Paths {
  namespace AccountRetrieve {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace AllOrderListRetrieve {
    namespace Parameters {
      export type Pair = string;
    }
    export interface PathParameters {
      pair: Parameters.Pair;
    }
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace AssetsList {
    namespace Responses {
      export type $200 = Components.Schemas.Asset[];
    }
  }
  namespace AssetsRetrieve {
    namespace Parameters {
      export type Id = number;
    }
    export interface PathParameters {
      id: Parameters.Id;
    }
    namespace Responses {
      export type $200 = Components.Schemas.Asset;
    }
  }
  namespace CurrentAvgPriceRetrieve {
    namespace Parameters {
      export type Pair = string;
    }
    export interface PathParameters {
      pair: Parameters.Pair;
    }
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace ExchangeInfoRetrieve {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace ExchangeInfoRetrieve2 {
    namespace Parameters {
      export type Pair = string;
    }
    export interface PathParameters {
      pair: Parameters.Pair;
    }
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace MyTradesRetrieve {
    namespace Parameters {
      export type Pair = string;
    }
    export interface PathParameters {
      pair: Parameters.Pair;
    }
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace NewsRetrieve {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace OpenOrderListRetrieve {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace OrderBookRetrieve {
    namespace Parameters {
      export type Pair = string;
    }
    export interface PathParameters {
      pair: Parameters.Pair;
    }
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace PortfolioAssetsList {
    namespace Responses {
      export type $200 = Components.Schemas.PortfolioAsset[];
    }
  }
  namespace PortfolioAssetsRetrieve {
    namespace Parameters {
      export type Id = number;
    }
    export interface PathParameters {
      id: Parameters.Id;
    }
    namespace Responses {
      export type $200 = Components.Schemas.PortfolioAsset;
    }
  }
  namespace PortfoliosList {
    namespace Responses {
      export type $200 = Components.Schemas.Portfolio[];
    }
  }
  namespace PortfoliosRetrieve {
    namespace Parameters {
      export type Id = number;
    }
    export interface PathParameters {
      id: Parameters.Id;
    }
    namespace Responses {
      export type $200 = Components.Schemas.Portfolio;
    }
  }
  namespace RecentTradesRetrieve {
    namespace Parameters {
      export type Pair = string;
    }
    export interface PathParameters {
      pair: Parameters.Pair;
    }
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace TickerPriceChangeRetrieve {
    namespace Parameters {
      export type Pair = string;
    }
    export interface PathParameters {
      pair: Parameters.Pair;
    }
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace UsersList {
    namespace Responses {
      export type $200 = Components.Schemas.User[];
    }
  }
  namespace UsersMePartialUpdate {
    export type RequestBody = Components.Schemas.PatchedAuthUser;
    namespace Responses {
      export type $200 = Components.Schemas.AuthUser;
    }
  }
  namespace UsersMeRetrieve {
    namespace Responses {
      export type $200 = Components.Schemas.AuthUser;
    }
  }
  namespace UsersMeUpdate {
    export type RequestBody = Components.Schemas.AuthUser;
    namespace Responses {
      export type $200 = Components.Schemas.AuthUser;
    }
  }
  namespace UsersRetrieve {
    namespace Parameters {
      export type Id = number;
    }
    export interface PathParameters {
      id: Parameters.Id;
    }
    namespace Responses {
      export type $200 = Components.Schemas.User;
    }
  }
  namespace UsersSignInCreate {
    export type RequestBody = Components.Schemas.AuthToken;
    namespace Responses {
      export type $200 = Components.Schemas.AuthToken;
    }
  }
  namespace UsersSignOutRetrieve {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace UsersSignUpCreate {
    namespace Responses {
      export interface $200 {}
    }
  }
}

export interface OperationMethods {
  /**
   * account_retrieve
   */
  "account_retrieve"(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.AccountRetrieve.Responses.$200>;
  /**
   * all_order_list_retrieve
   */
  "all_order_list_retrieve"(
    parameters: Parameters<Paths.AllOrderListRetrieve.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.AllOrderListRetrieve.Responses.$200>;
  /**
   * assets_list
   */
  "assets_list"(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.AssetsList.Responses.$200>;
  /**
   * assets_retrieve
   */
  "assets_retrieve"(
    parameters: Parameters<Paths.AssetsRetrieve.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.AssetsRetrieve.Responses.$200>;
  /**
   * current_avg_price_retrieve
   */
  "current_avg_price_retrieve"(
    parameters: Parameters<Paths.CurrentAvgPriceRetrieve.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.CurrentAvgPriceRetrieve.Responses.$200>;
  /**
   * exchange_info_retrieve
   */
  "exchange_info_retrieve"(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.ExchangeInfoRetrieve.Responses.$200>;
  /**
   * exchange_info_retrieve_2
   */
  "exchange_info_retrieve_2"(
    parameters: Parameters<Paths.ExchangeInfoRetrieve2.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.ExchangeInfoRetrieve2.Responses.$200>;
  /**
   * my_trades_retrieve
   */
  "my_trades_retrieve"(
    parameters: Parameters<Paths.MyTradesRetrieve.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.MyTradesRetrieve.Responses.$200>;
  /**
   * news_retrieve
   */
  "news_retrieve"(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.NewsRetrieve.Responses.$200>;
  /**
   * open_order_list_retrieve
   */
  "open_order_list_retrieve"(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.OpenOrderListRetrieve.Responses.$200>;
  /**
   * order_book_retrieve
   */
  "order_book_retrieve"(
    parameters: Parameters<Paths.OrderBookRetrieve.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.OrderBookRetrieve.Responses.$200>;
  /**
   * portfolio_assets_list
   */
  "portfolio_assets_list"(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.PortfolioAssetsList.Responses.$200>;
  /**
   * portfolio_assets_retrieve
   */
  "portfolio_assets_retrieve"(
    parameters: Parameters<Paths.PortfolioAssetsRetrieve.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.PortfolioAssetsRetrieve.Responses.$200>;
  /**
   * portfolios_list
   */
  "portfolios_list"(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.PortfoliosList.Responses.$200>;
  /**
   * portfolios_retrieve
   */
  "portfolios_retrieve"(
    parameters: Parameters<Paths.PortfoliosRetrieve.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.PortfoliosRetrieve.Responses.$200>;
  /**
   * recent_trades_retrieve
   */
  "recent_trades_retrieve"(
    parameters: Parameters<Paths.RecentTradesRetrieve.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.RecentTradesRetrieve.Responses.$200>;
  /**
   * ticker_price_change_retrieve
   */
  "ticker_price_change_retrieve"(
    parameters: Parameters<Paths.TickerPriceChangeRetrieve.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.TickerPriceChangeRetrieve.Responses.$200>;
  /**
   * users_list
   */
  "users_list"(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.UsersList.Responses.$200>;
  /**
   * users_retrieve
   */
  "users_retrieve"(
    parameters: Parameters<Paths.UsersRetrieve.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.UsersRetrieve.Responses.$200>;
  /**
   * users_me_retrieve
   */
  "users_me_retrieve"(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.UsersMeRetrieve.Responses.$200>;
  /**
   * users_me_update
   */
  "users_me_update"(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UsersMeUpdate.RequestBody,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.UsersMeUpdate.Responses.$200>;
  /**
   * users_me_partial_update
   */
  "users_me_partial_update"(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UsersMePartialUpdate.RequestBody,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.UsersMePartialUpdate.Responses.$200>;
  /**
   * users_sign_in_create
   */
  "users_sign_in_create"(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UsersSignInCreate.RequestBody,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.UsersSignInCreate.Responses.$200>;
  /**
   * users_sign_out_retrieve
   */
  "users_sign_out_retrieve"(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.UsersSignOutRetrieve.Responses.$200>;
  /**
   * users_sign_up_create
   */
  "users_sign_up_create"(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.UsersSignUpCreate.Responses.$200>;
}

export interface PathsDictionary {
  ["/account/"]: {
    /**
     * account_retrieve
     */
    "get"(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.AccountRetrieve.Responses.$200>;
  };
  ["/all_order_list/{pair}/"]: {
    /**
     * all_order_list_retrieve
     */
    "get"(
      parameters: Parameters<Paths.AllOrderListRetrieve.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.AllOrderListRetrieve.Responses.$200>;
  };
  ["/assets/"]: {
    /**
     * assets_list
     */
    "get"(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.AssetsList.Responses.$200>;
  };
  ["/assets/{id}/"]: {
    /**
     * assets_retrieve
     */
    "get"(
      parameters: Parameters<Paths.AssetsRetrieve.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.AssetsRetrieve.Responses.$200>;
  };
  ["/current_avg_price/{pair}/"]: {
    /**
     * current_avg_price_retrieve
     */
    "get"(
      parameters: Parameters<Paths.CurrentAvgPriceRetrieve.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.CurrentAvgPriceRetrieve.Responses.$200>;
  };
  ["/exchange_info/"]: {
    /**
     * exchange_info_retrieve
     */
    "get"(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.ExchangeInfoRetrieve.Responses.$200>;
  };
  ["/exchange_info/{pair}/"]: {
    /**
     * exchange_info_retrieve_2
     */
    "get"(
      parameters: Parameters<Paths.ExchangeInfoRetrieve2.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.ExchangeInfoRetrieve2.Responses.$200>;
  };
  ["/my_trades/{pair}/"]: {
    /**
     * my_trades_retrieve
     */
    "get"(
      parameters: Parameters<Paths.MyTradesRetrieve.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.MyTradesRetrieve.Responses.$200>;
  };
  ["/news/"]: {
    /**
     * news_retrieve
     */
    "get"(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.NewsRetrieve.Responses.$200>;
  };
  ["/open_order_list/"]: {
    /**
     * open_order_list_retrieve
     */
    "get"(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.OpenOrderListRetrieve.Responses.$200>;
  };
  ["/order_book/{pair}/"]: {
    /**
     * order_book_retrieve
     */
    "get"(
      parameters: Parameters<Paths.OrderBookRetrieve.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.OrderBookRetrieve.Responses.$200>;
  };
  ["/portfolio_assets/"]: {
    /**
     * portfolio_assets_list
     */
    "get"(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.PortfolioAssetsList.Responses.$200>;
  };
  ["/portfolio_assets/{id}/"]: {
    /**
     * portfolio_assets_retrieve
     */
    "get"(
      parameters: Parameters<Paths.PortfolioAssetsRetrieve.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.PortfolioAssetsRetrieve.Responses.$200>;
  };
  ["/portfolios/"]: {
    /**
     * portfolios_list
     */
    "get"(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.PortfoliosList.Responses.$200>;
  };
  ["/portfolios/{id}/"]: {
    /**
     * portfolios_retrieve
     */
    "get"(
      parameters: Parameters<Paths.PortfoliosRetrieve.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.PortfoliosRetrieve.Responses.$200>;
  };
  ["/recent_trades/{pair}/"]: {
    /**
     * recent_trades_retrieve
     */
    "get"(
      parameters: Parameters<Paths.RecentTradesRetrieve.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.RecentTradesRetrieve.Responses.$200>;
  };
  ["/ticker_price_change/{pair}/"]: {
    /**
     * ticker_price_change_retrieve
     */
    "get"(
      parameters: Parameters<Paths.TickerPriceChangeRetrieve.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.TickerPriceChangeRetrieve.Responses.$200>;
  };
  ["/users/"]: {
    /**
     * users_list
     */
    "get"(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.UsersList.Responses.$200>;
  };
  ["/users/{id}/"]: {
    /**
     * users_retrieve
     */
    "get"(
      parameters: Parameters<Paths.UsersRetrieve.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.UsersRetrieve.Responses.$200>;
  };
  ["/users/me/"]: {
    /**
     * users_me_retrieve
     */
    "get"(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.UsersMeRetrieve.Responses.$200>;
    /**
     * users_me_update
     */
    "put"(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UsersMeUpdate.RequestBody,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.UsersMeUpdate.Responses.$200>;
    /**
     * users_me_partial_update
     */
    "patch"(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UsersMePartialUpdate.RequestBody,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.UsersMePartialUpdate.Responses.$200>;
  };
  ["/users/sign-in/"]: {
    /**
     * users_sign_in_create
     */
    "post"(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UsersSignInCreate.RequestBody,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.UsersSignInCreate.Responses.$200>;
  };
  ["/users/sign-out/"]: {
    /**
     * users_sign_out_retrieve
     */
    "get"(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.UsersSignOutRetrieve.Responses.$200>;
  };
  ["/users/sign-up/"]: {
    /**
     * users_sign_up_create
     */
    "post"(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.UsersSignUpCreate.Responses.$200>;
  };
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>;
