import {
  ZodiosBodyByPath,
  ZodiosPathsByMethod,
  ZodiosResponseByPath,
} from "@zodios/core/lib/zodios.types";
import { ResponseResolver, rest, RestContext, RestRequest } from "msw";
import { API_ENDPOINT } from "../../constant";
import { getApiClient } from "../client";

type Api = ReturnType<typeof getApiClient>["api"];

export function restGet<Path extends ZodiosPathsByMethod<Api, "get">>(
  path: Path,
  resolver: ResponseResolver<
    RestRequest,
    RestContext,
    Awaited<ZodiosResponseByPath<Api, "get", Path>>
  >
) {
  return rest.get(`${API_ENDPOINT}${path}`, resolver);
}

export function restPost<Path extends ZodiosPathsByMethod<Api, "post">>(
  path: Path,
  resolver: ResponseResolver<
    RestRequest<ZodiosBodyByPath<Api, "post", Path>>,
    RestContext,
    Awaited<ZodiosResponseByPath<Api, "post", Path>>
  >
) {
  return rest.post(`${API_ENDPOINT}${path}`, resolver);
}
