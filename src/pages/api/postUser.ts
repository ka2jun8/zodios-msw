import { NextApiRequest, NextApiResponse } from "next";
import { getApiClient } from "../../rest/client";

export default async function postUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;
  const data = await getApiClient().postUser(body);
  return res.status(200).json(data);
}
