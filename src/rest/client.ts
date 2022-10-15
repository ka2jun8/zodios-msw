import { Zodios, ZodiosEndpointDefinitions } from "@zodios/core";
import { userApi } from "./schema/user";
import { pluginFetch } from "@zodios/plugins";
import { API_ENDPOINT } from "../constant";
import { mswPlugin } from "./msw/zodiosPlugin";
import { todoApi } from "./schema/todo";

export const getApiClient = () => {
  const apiClient = new Zodios(API_ENDPOINT, [...userApi, ...todoApi]);

  apiClient.use(pluginFetch());
  apiClient.use(mswPlugin());

  return apiClient;
};
