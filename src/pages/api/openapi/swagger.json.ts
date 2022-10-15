import { toOpenApi } from "@zodios/openapi";
import { NextApiHandler } from "next";
import { todoApi } from "../../../rest/schema/todo";
import { userApi } from "../../../rest/schema/user";

const openApi: NextApiHandler = (_, res) => {
  const document = toOpenApi([...userApi, ...todoApi], {
    info: {
      title: "Zodios OpenAPI Samples",
      version: "1.0.0",
    },
  });
  return res.status(200).json(document);
};

export default openApi;
