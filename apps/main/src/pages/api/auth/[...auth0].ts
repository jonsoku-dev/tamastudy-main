import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { prisma } from '@tama/db';

const afterCallback = async (req: any, res: any, session: any) => {
  // do some stuff
  const user = await prisma.user.findFirst({
    where: {
      sub: session.user.sub,
    },
  });

  if (!user) {
    await prisma.user.create({
      data: {
        sub: session.user.sub,
      },
    });
    console.log('Created New User!', session.user.sub);
  } else {
    console.log('Exist User!', session.user.sub);
  }

  // modify the session
  return session;
};

export default handleAuth({
  async callback(req, res) {
    try {
      await handleCallback(req, res, { afterCallback });
    } catch (error) {
      const err = error as any;
      res.status(err.status || 500).end(err.message);
    }
  },
});
