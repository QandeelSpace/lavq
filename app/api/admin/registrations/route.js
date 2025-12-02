// app/api/admin/registrations/route.js
import fs from "fs";
import path from "path";

export async function GET(req) {
  const adminPass = req.headers.get("x-admin-pass") || "";
  if (!process.env.ADMIN_PASS || adminPass !== process.env.ADMIN_PASS) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  try {
    const filePath = path.join(process.cwd(), "data", "registrations.json");
    if (!fs.existsSync(filePath)) return new Response(JSON.stringify([]), { status: 200 });
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
