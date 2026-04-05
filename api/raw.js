let scripts = {};

export default function handler(req, res) {
  let { id } = req.query;

  let encoded = scripts[id];

  if (!encoded) {
    return res.send("-- script não encontrado");
  }

  let decoded = Buffer.from(encoded, "base64").toString("utf-8");

  res.setHeader("Content-Type", "text/plain");
  res.send(decoded);
}
