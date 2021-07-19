import { getUrl } from '../../../utils/fauna';

export default async function handler(req, res) {
  const { id } = req.query;
  const url = await getUrl(id);
  res.redirect(url.longUrl);
}
