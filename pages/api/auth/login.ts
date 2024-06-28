import type { NextApiRequest, NextApiResponse } from 'next';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const users = [
  { username: 'testuser', password: '$2a$10$Tt1iGcAptX9J0Nbc9TYpT.Tri0.cbbfRtDhtjIZUrtXsWp.e1Jf/q' } // password is "password"
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.setHeader('Authorization', `Bearer ${token}`);
    return res.status(200).json({ token });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
