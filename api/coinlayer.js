export default async function handler(req, res) {
  const { from, to, amount } = req.query;

  const url = `https://api.coinlayer.com/api/live?access_key=${key}&symbols=${from?.toUpperCase()},${to?.toUpperCase()}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}

