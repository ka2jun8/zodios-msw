import { ZodiosPlugin } from "@zodios/core";

import { startMsw, stopMsw } from "..";

export const mswPlugin: () => ZodiosPlugin = () => ({
  name: "msw",
  request: async (_, config) => {
    await startMsw();
    return config;
  },
  response: async (_, __, response) => {
    await stopMsw();
    return response;
  },
  error: async (_, __, error) => {
    await stopMsw();
    throw error;
  },
});
