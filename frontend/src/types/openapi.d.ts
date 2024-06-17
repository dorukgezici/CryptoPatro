import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios'; 

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
         * Input
         */
        export interface Input {
            /**
             * Limit
             */
            limit?: number;
            /**
             * Offset
             */
            offset?: number;
        }
        /**
         * PagedAssetSchema
         */
        export interface PagedAssetSchema {
            /**
             * Items
             */
            items: /* AssetSchema */ AssetSchema[];
            /**
             * Count
             */
            count: number;
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
        /**
         * UserSchema
         */
        export interface UserSchema {
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
             * Email Address
             */
            email?: /* Email Address */ string | null;
            /**
             * Username
             * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
             */
            username: string;
        }
    }
}
declare namespace Paths {
    namespace CryptopatroApiHealth {
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace CryptopatroApiTasks {
        namespace Parameters {
            /**
             * Task Id
             */
            export type TaskId = string;
        }
        export interface PathParameters {
            task_id: /* Task Id */ Parameters.TaskId;
        }
        namespace Responses {
            /**
             * Response
             */
            export type $200 = string;
        }
    }
    namespace CryptopatroExchangeApiAccount {
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace CryptopatroExchangeApiAllOrders {
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
            export interface $200 {
            }
        }
    }
    namespace CryptopatroExchangeApiAssets {
        namespace Parameters {
            /**
             * Limit
             */
            export type Limit = number;
            /**
             * Offset
             */
            export type Offset = number;
        }
        export interface QueryParameters {
            limit?: /* Limit */ Parameters.Limit;
            offset?: /* Offset */ Parameters.Offset;
        }
        namespace Responses {
            export type $200 = /* PagedAssetSchema */ Components.Schemas.PagedAssetSchema;
        }
    }
    namespace CryptopatroExchangeApiCreatePortfolioAsset {
        /**
         * BodyParams
         */
        export interface RequestBody {
            /**
             * Portfolio Id
             */
            portfolio_id: number;
            /**
             * Asset Id
             */
            asset_id: number;
        }
        namespace Responses {
            export type $200 = /* PortfolioAssetSchema */ Components.Schemas.PortfolioAssetSchema;
        }
    }
    namespace CryptopatroExchangeApiCurrentAvgPrice {
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
            export interface $200 {
            }
        }
    }
    namespace CryptopatroExchangeApiDeletePortfolioAsset {
        namespace Parameters {
            /**
             * Id
             */
            export type Id = number;
        }
        export interface PathParameters {
            id: /* Id */ Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace CryptopatroExchangeApiInfo {
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
            export interface $200 {
            }
        }
    }
    namespace CryptopatroExchangeApiMyTrades {
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
            export interface $200 {
            }
        }
    }
    namespace CryptopatroExchangeApiNews {
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace CryptopatroExchangeApiOpenOrders {
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace CryptopatroExchangeApiOrderBook {
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
            export interface $200 {
            }
        }
    }
    namespace CryptopatroExchangeApiPortfolioAssets {
        namespace Responses {
            /**
             * Response
             */
            export type $200 = /* PortfolioAssetSchema */ Components.Schemas.PortfolioAssetSchema[];
        }
    }
    namespace CryptopatroExchangeApiPortfolios {
        namespace Responses {
            /**
             * Response
             */
            export type $200 = /* PortfolioSchema */ Components.Schemas.PortfolioSchema[];
        }
    }
    namespace CryptopatroExchangeApiRecentTrades {
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
            export interface $200 {
            }
        }
    }
    namespace CryptopatroExchangeApiRefresh {
        namespace Responses {
            /**
             * Response
             */
            export type $200 = string;
        }
    }
    namespace CryptopatroExchangeApiTickerPriceChange {
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
            export interface $200 {
            }
        }
    }
    namespace CryptopatroUsersApiUser {
        namespace Responses {
            export type $200 = /* UserSchema */ Components.Schemas.UserSchema;
        }
    }
}

export interface OperationMethods {
  /**
   * cryptopatro_api_health - Health
   */
  'cryptopatro_api_health'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CryptopatroApiHealth.Responses.$200>
  /**
   * cryptopatro_api_tasks - Tasks
   */
  'cryptopatro_api_tasks'(
    parameters: Parameters<Paths.CryptopatroApiTasks.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CryptopatroApiTasks.Responses.$200>
  /**
   * cryptopatro_exchange_api_portfolios - Portfolios
   */
  'cryptopatro_exchange_api_portfolios'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CryptopatroExchangeApiPortfolios.Responses.$200>
  /**
   * cryptopatro_exchange_api_assets - Assets
   */
  'cryptopatro_exchange_api_assets'(
    parameters?: Parameters<Paths.CryptopatroExchangeApiAssets.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CryptopatroExchangeApiAssets.Responses.$200>
  /**
   * cryptopatro_exchange_api_portfolio_assets - Portfolio Assets
   */
  'cryptopatro_exchange_api_portfolio_assets'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CryptopatroExchangeApiPortfolioAssets.Responses.$200>
  /**
   * cryptopatro_exchange_api_create_portfolio_asset - Create Portfolio Asset
   */
  'cryptopatro_exchange_api_create_portfolio_asset'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CryptopatroExchangeApiCreatePortfolioAsset.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CryptopatroExchangeApiCreatePortfolioAsset.Responses.$200>
  /**
   * cryptopatro_exchange_api_delete_portfolio_asset - Delete Portfolio Asset
   */
  'cryptopatro_exchange_api_delete_portfolio_asset'(
    parameters: Parameters<Paths.CryptopatroExchangeApiDeletePortfolioAsset.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CryptopatroExchangeApiDeletePortfolioAsset.Responses.$200>
  /**
   * cryptopatro_exchange_api_refresh - Refresh
   */
  'cryptopatro_exchange_api_refresh'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CryptopatroExchangeApiRefresh.Responses.$200>
  /**
   * cryptopatro_exchange_api_info - Info
   */
  'cryptopatro_exchange_api_info'(
    parameters: Parameters<Paths.CryptopatroExchangeApiInfo.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CryptopatroExchangeApiInfo.Responses.$200>
  /**
   * cryptopatro_exchange_api_order_book - Order Book
   */
  'cryptopatro_exchange_api_order_book'(
    parameters: Parameters<Paths.CryptopatroExchangeApiOrderBook.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CryptopatroExchangeApiOrderBook.Responses.$200>
  /**
   * cryptopatro_exchange_api_recent_trades - Recent Trades
   */
  'cryptopatro_exchange_api_recent_trades'(
    parameters: Parameters<Paths.CryptopatroExchangeApiRecentTrades.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CryptopatroExchangeApiRecentTrades.Responses.$200>
  /**
   * cryptopatro_exchange_api_current_avg_price - Current Avg Price
   */
  'cryptopatro_exchange_api_current_avg_price'(
    parameters: Parameters<Paths.CryptopatroExchangeApiCurrentAvgPrice.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CryptopatroExchangeApiCurrentAvgPrice.Responses.$200>
  /**
   * cryptopatro_exchange_api_ticker_price_change - Ticker Price Change
   */
  'cryptopatro_exchange_api_ticker_price_change'(
    parameters: Parameters<Paths.CryptopatroExchangeApiTickerPriceChange.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CryptopatroExchangeApiTickerPriceChange.Responses.$200>
  /**
   * cryptopatro_exchange_api_all_orders - All Orders
   */
  'cryptopatro_exchange_api_all_orders'(
    parameters: Parameters<Paths.CryptopatroExchangeApiAllOrders.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CryptopatroExchangeApiAllOrders.Responses.$200>
  /**
   * cryptopatro_exchange_api_open_orders - Open Orders
   */
  'cryptopatro_exchange_api_open_orders'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CryptopatroExchangeApiOpenOrders.Responses.$200>
  /**
   * cryptopatro_exchange_api_account - Account
   */
  'cryptopatro_exchange_api_account'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CryptopatroExchangeApiAccount.Responses.$200>
  /**
   * cryptopatro_exchange_api_my_trades - My Trades
   */
  'cryptopatro_exchange_api_my_trades'(
    parameters: Parameters<Paths.CryptopatroExchangeApiMyTrades.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CryptopatroExchangeApiMyTrades.Responses.$200>
  /**
   * cryptopatro_exchange_api_news - News
   */
  'cryptopatro_exchange_api_news'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CryptopatroExchangeApiNews.Responses.$200>
  /**
   * cryptopatro_users_api_user - User
   */
  'cryptopatro_users_api_user'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CryptopatroUsersApiUser.Responses.$200>
}

export interface PathsDictionary {
  ['/health']: {
    /**
     * cryptopatro_api_health - Health
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CryptopatroApiHealth.Responses.$200>
  }
  ['/tasks/{task_id}']: {
    /**
     * cryptopatro_api_tasks - Tasks
     */
    'get'(
      parameters: Parameters<Paths.CryptopatroApiTasks.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CryptopatroApiTasks.Responses.$200>
  }
  ['/exchange/portfolios']: {
    /**
     * cryptopatro_exchange_api_portfolios - Portfolios
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CryptopatroExchangeApiPortfolios.Responses.$200>
  }
  ['/exchange/assets']: {
    /**
     * cryptopatro_exchange_api_assets - Assets
     */
    'get'(
      parameters?: Parameters<Paths.CryptopatroExchangeApiAssets.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CryptopatroExchangeApiAssets.Responses.$200>
  }
  ['/exchange/portfolio-assets']: {
    /**
     * cryptopatro_exchange_api_portfolio_assets - Portfolio Assets
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CryptopatroExchangeApiPortfolioAssets.Responses.$200>
    /**
     * cryptopatro_exchange_api_create_portfolio_asset - Create Portfolio Asset
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CryptopatroExchangeApiCreatePortfolioAsset.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CryptopatroExchangeApiCreatePortfolioAsset.Responses.$200>
  }
  ['/exchange/portfolio-assets/{id}']: {
    /**
     * cryptopatro_exchange_api_delete_portfolio_asset - Delete Portfolio Asset
     */
    'delete'(
      parameters: Parameters<Paths.CryptopatroExchangeApiDeletePortfolioAsset.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CryptopatroExchangeApiDeletePortfolioAsset.Responses.$200>
  }
  ['/exchange/refresh']: {
    /**
     * cryptopatro_exchange_api_refresh - Refresh
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CryptopatroExchangeApiRefresh.Responses.$200>
  }
  ['/exchange/info/{pair}']: {
    /**
     * cryptopatro_exchange_api_info - Info
     */
    'get'(
      parameters: Parameters<Paths.CryptopatroExchangeApiInfo.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CryptopatroExchangeApiInfo.Responses.$200>
  }
  ['/exchange/order-book/{pair}']: {
    /**
     * cryptopatro_exchange_api_order_book - Order Book
     */
    'get'(
      parameters: Parameters<Paths.CryptopatroExchangeApiOrderBook.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CryptopatroExchangeApiOrderBook.Responses.$200>
  }
  ['/exchange/recent-trades/{pair}']: {
    /**
     * cryptopatro_exchange_api_recent_trades - Recent Trades
     */
    'get'(
      parameters: Parameters<Paths.CryptopatroExchangeApiRecentTrades.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CryptopatroExchangeApiRecentTrades.Responses.$200>
  }
  ['/exchange/current-avg-price/{pair}']: {
    /**
     * cryptopatro_exchange_api_current_avg_price - Current Avg Price
     */
    'get'(
      parameters: Parameters<Paths.CryptopatroExchangeApiCurrentAvgPrice.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CryptopatroExchangeApiCurrentAvgPrice.Responses.$200>
  }
  ['/exchange/ticker-price-change/{pair}']: {
    /**
     * cryptopatro_exchange_api_ticker_price_change - Ticker Price Change
     */
    'get'(
      parameters: Parameters<Paths.CryptopatroExchangeApiTickerPriceChange.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CryptopatroExchangeApiTickerPriceChange.Responses.$200>
  }
  ['/exchange/all-orders/{pair}']: {
    /**
     * cryptopatro_exchange_api_all_orders - All Orders
     */
    'get'(
      parameters: Parameters<Paths.CryptopatroExchangeApiAllOrders.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CryptopatroExchangeApiAllOrders.Responses.$200>
  }
  ['/exchange/open-orders']: {
    /**
     * cryptopatro_exchange_api_open_orders - Open Orders
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CryptopatroExchangeApiOpenOrders.Responses.$200>
  }
  ['/exchange/account']: {
    /**
     * cryptopatro_exchange_api_account - Account
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CryptopatroExchangeApiAccount.Responses.$200>
  }
  ['/exchange/my-trades/{pair}']: {
    /**
     * cryptopatro_exchange_api_my_trades - My Trades
     */
    'get'(
      parameters: Parameters<Paths.CryptopatroExchangeApiMyTrades.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CryptopatroExchangeApiMyTrades.Responses.$200>
  }
  ['/exchange/news']: {
    /**
     * cryptopatro_exchange_api_news - News
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CryptopatroExchangeApiNews.Responses.$200>
  }
  ['/users/me']: {
    /**
     * cryptopatro_users_api_user - User
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CryptopatroUsersApiUser.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
