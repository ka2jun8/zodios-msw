import * as zodios from "@zodios/core";
import { z } from "zod";

const userResponse = z.object({
  id: z.number().int(),
  name: z.string().min(1).max(1024),
  email: z.string().email(),
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
        name: "body",
        description: "User Info",
        type: "Body",
        schema: z.object({
          name: z.string().min(1).max(1024),
          email: z.string().email(),
        }),
      },
    ],
    description: "Create a user",
    response: userResponse,
  })
  .build();
