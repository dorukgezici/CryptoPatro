import { $queryClient } from "@/lib/store";
import { useStore } from "@nanostores/react";
import { QueryClientProvider } from "@tanstack/react-query";

export function App({ children }: { children: React.ReactNode }) {
  const queryClient = useStore($queryClient);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
