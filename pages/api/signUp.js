import mysql from 'mysql2/promise';

export default async function signUpHandler(req, res){
    if (req.method !== 'POST') {
        return res.status(405).json({message:"Method Nor Allowed"});
    }
    const [email,password] = req.body;
    try {
        const connect = await mysql.createConnection({
            host: 'localhost',
      user: 'root',
      password: '',
      database: 'user_authentification',
        })
     
    const [exists] = await connect.query('SELECT * FROM users WHERE email =?',[email]);
    if (exists.length > 0) {
        return res.status(409).json({message: 'Email is already used'});
    }
    await connect.execute('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
    return res.status(201).json({message: 'User created successfully'});
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({message: 'Internal server error'});
    }
}
