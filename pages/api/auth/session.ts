import type { NextApiRequest, NextApiResponse } from 'next';
const jwt = require('jsonwebtoken');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Invalid authorization header' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return res.status(200).json({ user: decoded });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
