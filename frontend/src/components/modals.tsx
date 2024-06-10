import { useState } from "react";
import { useStore } from "@nanostores/react";
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
import { PlusIcon } from "@/components/icons";
import { $assets, $createPortfolioAsset } from "@/store/portfolio";

export function PortfolioAssetModal() {
  const { data: assets } = useStore($assets);
  const { mutate } = useStore($createPortfolioAsset);

  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAssets = assets?.filter(
    (asset) =>
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="ml-auto h-8 w-8"
        onClick={() => setShowModal(true)}
      >
        <PlusIcon className="h-4 w-4" />
        <span className="sr-only">Add Asset</span>
      </Button>
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
                    onClick={async () => {
                      await mutate({ portfolioId: 1, assetId: asset.id! });
                      setShowModal(false);
                    }}
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
    </>
  );
}
