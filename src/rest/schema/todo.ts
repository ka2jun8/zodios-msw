import { makeApi } from "@zodios/core";
import { z } from "zod";

const todo = z.object({
  id: z.number().int(),
  title: z.string().min(1).max(1024),
  description: z.string().optional(),
});
const todoResponse = z.array(todo);

export type TodoList = z.infer<typeof todoResponse>;

export const todoApi = makeApi([
  {
    method: "get",
    path: "/todo",
    alias: "getTodo",
    description: "Get Todo list",
    response: todoResponse,
  },
  {
    method: "post",
    path: "/todo",
    alias: "postTodo",
    parameters: [
      {
        name: "body",
        description: "Todo Info",
        type: "Body",
        schema: z.object({
          title: z.string().min(1).max(1024),
          description: z.string().optional(),
        }),
      },
    ],
    description: "Create a todo",
    response: todo,
  },
]);
