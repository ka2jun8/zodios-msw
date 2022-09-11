import * as zodios from "@zodios/core";
import { z } from "zod";

const userResponse = z.object({
  id: z.number(),
  name: z.string(),
});

export type User = z.infer<typeof userResponse>;

export const userApi = zodios
  .apiBuilder({
    method: "get",
    path: "/user/:id",
    alias: "getUser",
    description: "Get a user",
    response: userResponse,
  })
  .addEndpoint({
    method: "post",
    path: "/user/:id",
    alias: "postUser",
    parameters: [
      {
        name: "name",
        description: "User Name",
        type: "Body",
        schema: z.object({ name: z.string().min(1).max(1024) }),
      },
    ],
    description: "Create a user",
    response: userResponse,
  })
  .build();
