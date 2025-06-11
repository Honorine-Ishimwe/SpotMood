import { getIronSession } from 'iron-session';
import bcrypt from 'bcrypt'
import connect from '@/lib/connectDB';           
import User from '@/models/usersData';              

const sessionOptions = {
  password: 'complex_password_at_least_32_characters_long',
  cookieName: 'user_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

export default async function handler(req, res) {
  const session = await getIronSession(req, res, sessionOptions);
  req.session = session;

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password } = req.body;

  try {
    await connect(); 

    const user = await User.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {
      req.session.user = { email };
      await req.session.save();
      return res.status(200).json({ success: true, message: "Login successful!" });
    }

    return res.status(401).json({ success: false, message: "Invalid email or password" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}