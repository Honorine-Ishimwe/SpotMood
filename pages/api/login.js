import { ironSession } from 'iron-session/express';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';

const sessionOptions = {
    password: 'complex_password_at_least_32_characters_long', 
    cookieName: 'user_session',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  };

export default ironSession(async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password } = req.body;

  try{

    const connect = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'user_authentification',
    })

    const [rows] = await connect.query('SELECT * FROM users WHERE Email = ?', [email]);

    if (rows.length > 0) {
      const user = rows[0];

      const isMatch = await bcrypt.compare(password, user.Password);

      if (isMatch) {
        req.session.user = { email };
        await req.session.save();
        return res.status(200).json({ success: true, message: "Login successful!" });
      
    } 
    } 
    return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
  }
    catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  