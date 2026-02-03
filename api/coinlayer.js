export default async function handler(req, res) {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({ error: "Missing currency symbols" });
    }

    const key = process.env.COINLAYER_API_KEY;

    if (!key) {
      return res.status(500).json({ error: "API key missing" });
    }

    const cleanFrom = from.trim().toUpperCase();
    const cleanTo = to.trim().toUpperCase();

    const url = `https://api.coinlayer.com/api/live?access_key=${key}&symbols=${cleanFrom},${cleanTo}`;

    const response = await fetch(url);
    const data = await response.json();

    return res.status(200).json(data);

  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
