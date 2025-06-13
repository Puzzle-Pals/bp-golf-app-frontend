export default function handler(req, res) {
  res.setHeader(
    "Set-Cookie",
    "bp_admin_token=deleted; Path=/; Max-Age=0; HttpOnly; SameSite=Strict; Secure; Domain=.vercel.app"
  );
  res.status(200).json({ ok: true });
}