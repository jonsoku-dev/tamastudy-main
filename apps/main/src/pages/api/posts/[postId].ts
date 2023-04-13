import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { prisma } from '@tama/db';

export default withApiAuthRequired(async function handler(req, res) {
  if (req.method === 'GET') {
    const postId = req.query.postId as string;
    const post = await prisma.post.findFirst({
      where: { id: postId },
      orderBy: { createdAt: 'desc' },
    });
    res.status(200).json({ result: post });
  }
});
