import { Body, Paths, Response } from "@zodios/core/lib/zodios.types";
import { ResponseResolver, rest, RestContext, RestRequest } from "msw";
import { API_ENDPOINT } from "../../constant";
import { getApiClient } from "../client";

type Api = ReturnType<typeof getApiClient>["api"];

export function restGet<Path extends Paths<Api, "get">>(
  path: Path,
  resolver: ResponseResolver<
    RestRequest,
    RestContext,
    Awaited<Response<Api, "get", Path>>
  >
) {
  return rest.get(`${API_ENDPOINT}${path}`, resolver);
}

export function restPost<Path extends Paths<Api, "post">>(
  path: Path,
  resolver: ResponseResolver<
    RestRequest<Body<Api, "post", Path>>,
    RestContext,
    Awaited<Response<Api, "post", Path>>
  >
) {
  return rest.post(`${API_ENDPOINT}${path}`, resolver);
}
