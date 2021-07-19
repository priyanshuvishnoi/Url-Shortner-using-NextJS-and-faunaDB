import { getUrl } from '../../../utils/fauna';

export default async function handler(req, res) {
  const { id } = req.query;
  const url = await getUrl(id);
  console.table({ url: url.longUrl, id });
  res.redirect(url.longUrl);
}
