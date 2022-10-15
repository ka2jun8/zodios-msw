import { NextApiRequest, NextApiResponse } from "next";
import { API_ENDPOINT } from "../../../constant";

export default async function msw(req: NextApiRequest, res: NextApiResponse) {
  const msw = await import("../../../rest/msw/index");
  await msw.startMsw();
  try {
    const { path } = req.query;
    const apiPath = `${API_ENDPOINT}/${(path as string[]).join("/")}`;
    const result = await fetch(apiPath, {
      method: req.method,
      body: req.body ? JSON.stringify(req.body) : undefined,
    });
    const data = await result.json();
    return res.status(200).json(data);
  } finally {
    msw.stopMsw();
  }
}
