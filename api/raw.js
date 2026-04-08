import { MongoClient, ObjectId } from "mongodb";

const uri = "SUA_URL_DO_MONGO";

// 🔑 SUA KEY
const KEY = "guiontop_2026_thebestscript_amo_naoacha_";

export default async function handler(req, res) {
  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db("scripts");
  const collection = db.collection("lua");

  let { id } = req.query;

  let script = await collection.findOne({
    _id: new ObjectId(id)
  });

  if (!script) {
    return res.send("Guiznx Protector - Script not found 🚫");
  }

  // 🔐 bloqueio navegador
  let ua = req.headers["user-agent"] || "";
  if (ua.includes("Mozilla")) {
    return res.send(`
      <html>
        <body style="background:black;color:red;text-align:center;margin-top:50px;">
          <h1>🚫 Guiznx Protector</h1>
          <p>Access Denied</p>
        </body>
      </html>
    `);
  }

  // 🔑 ENVOLVE O SCRIPT COM KEY SYSTEM
  let protectedScript = `
local key = "${KEY}"

local userKey = tostring(
  game:GetService("StarterGui"):PromptTextInput("Guiznx Protector", "Enter Key:")
)

if userKey ~= key then
  game:GetService("StarterGui"):SetCore("SendNotification", {
    Title = "Guiznx Protector",
    Text = "Invalid Key 🚫",
    Duration = 5
  })
  return
end

-- ✅ SCRIPT ORIGINAL
${script.code}
`;

  res.setHeader("Content-Type", "text/plain");
  res.send(protectedScript);

  await client.close();
}
