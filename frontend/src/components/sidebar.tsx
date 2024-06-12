import {
  CalendarClockIcon,
  CoinsIcon,
  LineChartIcon,
  SettingsIcon,
  WalletIcon,
} from "@/components/icons";
import { PortfolioAssetModal } from "@/components/modals";
import { cn } from "@/lib/utils";

export function Sidebar({ url }: { url: URL }) {
  return (
    <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <a className="flex items-center gap-2 font-semibold" href="/">
            <CoinsIcon className="h-6 w-6" />
            <span className="">CryptoPatro</span>
          </a>
          <PortfolioAssetModal />
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            <a
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-900 dark:hover:text-gray-50",
                url.pathname === "/"
                  ? "text-gray-900 dark:text-gray-50 bg-gray-100 dark:bg-gray-800"
                  : "text-gray-500 dark:text-gray-400",
              )}
              href="/"
            >
              <CoinsIcon className="h-4 w-4" />
              Portfolio
            </a>
            <a
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-900 dark:hover:text-gray-50",
                url.pathname.startsWith("/orders")
                  ? "text-gray-900 dark:text-gray-50 bg-gray-100 dark:bg-gray-800"
                  : "text-gray-500 dark:text-gray-400",
              )}
              href="/orders"
            >
              <WalletIcon className="h-4 w-4" />
              Orders
            </a>
            <a
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-900 dark:hover:text-gray-50",
                url.pathname.startsWith("/analytics")
                  ? "text-gray-900 dark:text-gray-50 bg-gray-100 dark:bg-gray-800"
                  : "text-gray-500 dark:text-gray-400",
              )}
              href="/analytics"
            >
              <LineChartIcon className="h-4 w-4" />
              Analytics
            </a>
            <a
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-900 dark:hover:text-gray-50",
                url.pathname.startsWith("/news")
                  ? "text-gray-900 dark:text-gray-50 bg-gray-100 dark:bg-gray-800"
                  : "text-gray-500 dark:text-gray-400",
              )}
              href="/news"
            >
              <CalendarClockIcon className="h-4 w-4" />
              News
            </a>
            <a
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-900 dark:hover:text-gray-50",
                url.pathname.startsWith("/settings")
                  ? "text-gray-900 dark:text-gray-50 bg-gray-100 dark:bg-gray-800"
                  : "text-gray-500 dark:text-gray-400",
              )}
              href="/settings"
            >
              <SettingsIcon className="h-4 w-4" />
              Settings
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
