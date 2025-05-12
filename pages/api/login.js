import { withSession } from "../../lib/session";

export default withSession(async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password } = req.body;
  if (email === "" && password === "") {
    req.session.user = { email }; 
    await req.session.save();

    return res.status(200).json({ success: true, message: "Login successful!" });
  }

  return res
    .status(401)
    .json({ success: false, message: "Invalid email or password" });
});