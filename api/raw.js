let scripts = {};

export default function handler(req, res) {
  let { id } = req.query;

  if (!scripts[id]) {
    return res.send("-- script não encontrado");
  }

  res.setHeader("Content-Type", "text/plain");
  res.send(scripts[id]);
}
