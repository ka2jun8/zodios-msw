import { User } from "../../schema/user";
import { restGet, restPost } from "../wrapper";

const users: User[] = [
  { id: 1, name: "Hello World", email: "hello@example.com" },
];

export const userApis = [
  restGet("/user/:id", (req, res, ctx) => {
    const id = req.params.id;
    const data = users.find((u) => u.id === Number(id));

    if (!data) {
      return res(ctx.status(404));
    }

    return res(ctx.status(200), ctx.json(data));
  }),
  restPost("/user/:id", async (req, res, ctx) => {
    const body = await req.json<typeof req["body"]>();
    const latestId = users.sort((a, b) => b.id - a.id)[0].id;
    const user = { id: latestId + 1, name: body.name, email: body.email };
    users.push(user);

    return res(ctx.status(200), ctx.json(user));
  }),
];
