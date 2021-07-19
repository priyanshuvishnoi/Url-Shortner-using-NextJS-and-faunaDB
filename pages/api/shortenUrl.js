import { saveUrl } from '../../utils/fauna';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { url } = req.body;
    const code = 'xxxxxxx'.replace(/x/g, () =>
      Math.floor(Math.random() * 16).toString(16)
    );
    res.status(200).json({ url: `${req.headers.host}/api/url/${code}` });
    saveUrl(code, url);
  } else res.status(500).send({ message: 'Only POST method is allowed' });
}
