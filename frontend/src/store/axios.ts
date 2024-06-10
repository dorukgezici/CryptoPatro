import { atom } from "nanostores";
import { getApiClient } from "@/lib/axios";
import { $token } from "@/store/auth";

export const $axios = atom(getApiClient($token.get()));
