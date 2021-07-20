import type { NextApiRequest, NextApiResponse } from 'next';
import { getUrl } from '../../../utils/fauna';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const url = await getUrl(id as string);
  res.redirect(url!.longUrl);
}
