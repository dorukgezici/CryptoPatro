import { atom } from "nanostores";
import { persistentAtom } from "@nanostores/persistent";
import { getApiClient } from "@/lib/axios";
import { QueryClient } from "@tanstack/react-query";

export const token = persistentAtom<string | undefined>("token", undefined);
export const $axios = atom(getApiClient(token.get()));

export const $queryClient = atom(new QueryClient());
