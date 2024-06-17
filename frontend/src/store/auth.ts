import { $axios } from "@/store/axios";
import { createFetcherStore } from "@/store/fetcher";
import type { User } from "@/types";
import { persistentAtom } from "@nanostores/persistent";

export const $token = persistentAtom<string | undefined>("token", undefined);

export const $user = createFetcherStore<User>([$token], {
  fetcher: async () => {
    const client = await $axios.get();
    const res = await client.cryptopatro_users_api_user();
    return res.data as User;
  },
});

export const logout = () => $token.set(undefined);
