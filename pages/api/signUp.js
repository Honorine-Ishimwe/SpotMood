import bcrypt from 'bcrypt';
import connect from '@/lib/connectDB';     
import User from '@/models/usersData';        

export default async function handler(req, res) {
  console.log("Signup API hit", req.body); // debug log
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, password } = req.body;
  console.log("Checking values:", { name, email, password }); // debug line

  try {
    await connect(); 

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: 'Email is already used' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error("Signup API Error:", error.message);
    return res.status(500).json({ message: error.message || 'Internal server error' });
  }
}