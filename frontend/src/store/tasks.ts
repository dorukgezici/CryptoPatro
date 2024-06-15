import { atom } from "nanostores";
import type { TaskStatus } from "@/types";
import { createFetcherStore } from "@/store/fetcher";
import { $axios } from "@/store/axios";

export const $taskId = atom<string>("");
export const $taskStatus = createFetcherStore<TaskStatus | undefined>(
  ["tasks", $taskId],
  {
    fetcher: async () => {
      const taskId = $taskId.get();
      if (!taskId) return undefined;

      const client = await $axios.get();
      const res = await client.apps_api_tasks(taskId);
      return res.data;
    },
  },
);
