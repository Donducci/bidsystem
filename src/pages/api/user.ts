// auth.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'token';

async function loginUser(email: string, password: string): Promise<{ message: string; token?: string }> {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  console.log(user, 'useruseruseruseursuer')

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error('Invalid email or password');
  }

  const tokenPayload = {
    id: user.id,
    email: user.email,
    name: user.name
  }

  const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '1d'})

  return { message: "Login successful", token };
}

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const loginResponse = await loginUser(email, password);
    return res.status(200).json(loginResponse);
  } catch (error) {
    if (error instanceof Error) {
      switch (error.message) {
        case 'User not found':
        case 'Invalid email or password':
          return res.status(401).json({ message: error.message });
        default:
          return res.status(500).json({ message: "Failed to login", error: error.message });
      }
    } else {
      return res.status(500).json({ message: "Failed to login", error: "An unknown error occurred" });
    }
  }
}
