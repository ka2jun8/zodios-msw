import { TodoList } from "../../schema/todo";
import { restGet, restPost } from "../wrapper";

const todos: TodoList = [
  { id: 1, title: "Todo No.1", description: "must do it" },
];

export const todoApis = [
  restGet("/todo", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(todos));
  }),
  restPost("/todo", async (req, res, ctx) => {
    const body = await req.json<typeof req["body"]>();
    const latestId = todos.sort((a, b) => b.id - a.id)[0].id;
    const todo = {
      id: latestId + 1,
      title: body.title,
      description: body.description,
    };
    todos.push(todo);

    return res(ctx.status(200), ctx.json(todo));
  }),
];
