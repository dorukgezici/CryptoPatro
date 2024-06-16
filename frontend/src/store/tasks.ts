import { atom } from "nanostores";
import type { TaskStatus } from "@/types";
import { createFetcherStore } from "@/store/fetcher";
import { $axios } from "@/store/axios";

export const $taskId = atom<string>("");
export const $taskStatus = createFetcherStore<TaskStatus | undefined>(
  [$taskId],
  {
    fetcher: async (taskId) => {
      if (!taskId) return undefined;

      const client = await $axios.get();
      const res = await client.cryptopatro_api_tasks(taskId.toString());
      return res.data;
    },
  },
);
