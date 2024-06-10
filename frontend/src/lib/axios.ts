import { OpenAPIClientAxios } from "openapi-client-axios";
import type { Client } from "@/types/openapi";
import { BACKEND_URL } from "@/config";

const api = new OpenAPIClientAxios({
  definition: `${BACKEND_URL}/api/openapi.json`,
});

export const getApiClient = async (token?: string) => {
  const client = await api.init<Client>();

  client.defaults.baseURL = BACKEND_URL;
  if (token) client.defaults.headers["authorization"] = `Bearer ${token}`;

  return client;
};
