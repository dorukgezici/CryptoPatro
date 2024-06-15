import { persistentAtom } from "@nanostores/persistent";

export const $theme = persistentAtom<"theme-light" | "dark" | "system">(
  "theme",
  "system",
);
