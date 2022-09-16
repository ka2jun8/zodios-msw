import {
  FilterArrayByValue,
  MapSchemaParameters,
} from "@zodios/core/lib/utils.types";
import {
  Body,
  EndpointApiDescription,
  Paths,
  Response,
  QueryParams,
  ZodiosEndpointParameter,
} from "@zodios/core/lib/zodios.types";
import {
  PathParams,
  ResponseResolver,
  rest,
  RestContext,
  RestRequest,
} from "msw";
import { API_ENDPOINT } from "../../constant";
import { getApiClient } from "../client";

type ReadonlyValues<T> = {
  [K in keyof T]: T[K] extends Array<infer R> ? Readonly<Array<R>> : T[K];
};

type Api = ReturnType<typeof getApiClient>["api"];

type P = Paths<Api, "get">;
type ApiDescriptionsOfOptionalParameters<T extends P> = EndpointApiDescription<
  Api,
  "get",
  T
>[number];
type ObtainZodiosEndpointParameter<T> = T extends {
  parameters: Array<ZodiosEndpointParameter>;
}
  ? T["parameters"]
  : any;
type RequestZodiosEndpointParameters<T extends P> =
  ObtainZodiosEndpointParameter<ApiDescriptionsOfOptionalParameters<T>>;

type ParamsOfQuery<T extends P> = FilterArrayByValue<
  RequestZodiosEndpointParameters<T>,
  { type: "Query" }
>;
type ZodInferredParams<T extends P> = MapSchemaParameters<ParamsOfQuery<T>>;
// TODO: 配列のときは readonly にする必要がありそう
// type Q<T extends P> = ReadonlyValues<ZodInferredParams<T>>;

export function restGet<Path extends Paths<Api, "get">>(
  path: Path,
  resolver: ResponseResolver<
    RestRequest<never, ZodInferredParams<Path>>,
    RestContext,
    Awaited<Response<Api, "get", Path>>
  >
) {
  // TODO
  // ZodInferredParams<Path> が msw の PathParams と一致してないとみなされて
  // resolver の type が合わない
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
