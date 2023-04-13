import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@tama/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const newContact = await prisma.contact.create({
      data: {
        username: req.body.username,
        email: req.body.email,
        message: req.body.message,
        age: req.body.age,
        line: req.body.line,
        kakao: req.body.kakao,
      },
    });
    res.status(201).json({ result: 'created new contact successful.' });
  }
};

export default handler;
