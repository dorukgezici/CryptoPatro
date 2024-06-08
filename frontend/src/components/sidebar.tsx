import { useState } from "react";
import {
  CoinsIcon,
  LineChartIcon,
  PlusIcon,
  SettingsIcon,
  WalletIcon,
} from "@/components/icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAssets from "@/hooks/useAssets";

export function Sidebar() {
  const { assets } = useAssets();
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAssets = assets?.filter(
    (portfolioAsset) =>
      portfolioAsset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      portfolioAsset.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const handleAddAsset = (asset: any) => {
    // setAssets([...assets, asset]);
    setShowModal(false);
  };

  return (
    <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <a className="flex items-center gap-2 font-semibold" href="#">
            <CoinsIcon className="h-6 w-6" />
            <span className="">CryptoPatro</span>
          </a>
          <Button
            variant="outline"
            size="icon"
            className="ml-auto h-8 w-8"
            onClick={() => setShowModal(true)}
          >
            <PlusIcon className="h-4 w-4" />
            <span className="sr-only">Add Asset</span>
          </Button>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            <a
              className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
              href="#"
            >
              <CoinsIcon className="h-4 w-4" />
              Portfolio
            </a>
            <a
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#"
            >
              <LineChartIcon className="h-4 w-4" />
              Analytics
            </a>
            <a
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#"
            >
              <WalletIcon className="h-4 w-4" />
              Transactions
            </a>
            <a
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#"
            >
              <SettingsIcon className="h-4 w-4" />
              Settings
            </a>
          </nav>
        </div>
      </div>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="p-6 sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Asset</DialogTitle>
            <DialogDescription>
              Search for and add new assets to your portfolio.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <Input
              type="search"
              placeholder="Search for an asset..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="grid gap-2">
              {filteredAssets?.map((asset) => (
                <div
                  key={asset.symbol}
                  className="flex items-center justify-between rounded-md bg-gray-100 p-3 dark:bg-gray-800"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-6 w-6 rounded-full bg-[#${Math.floor(Math.random() * 16777215).toString(16)}]`}
                    />
                    <div>
                      <div className="font-medium">{asset.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {asset.symbol}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => handleAddAsset(asset)}
                  >
                    Add
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
