import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { prisma } from '@tama/db';
import { Configuration, OpenAIApi } from 'openai';

export default withApiAuthRequired(async function handler(req, res) {
  if (req.method === 'GET') {
    const session = await getSession(req, res);
    const user = session?.user;
    const userProfile = await prisma.user.findFirst({
      where: { sub: user?.sub },
    });
    const posts = await prisma.post.findMany({
      where: { userId: userProfile?.id },
      orderBy: { createdAt: 'desc' },
    });
    res.status(200).json({ result: posts });
    return;
  } else if (req.method === 'POST') {
    const session = await getSession(req, res);
    const user = session?.user;
    const userProfile = await prisma.user.findFirst({
      where: { sub: user?.sub },
    });

    const config = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(config);

    const { topic, keywords } = req.body;

    if (!topic || !keywords) {
      res.status(422);
      return;
    }

    /*const response = await openai.createCompletion({
                        model: 'text-davinci-003',
                        temperature: 0,
                        max_tokens: 3600,
                        prompt: `Write a long and detailed SEO-friendly blog post about ${topic}, that targets the following comma-separated keywords: ${keywords}.
                        The content should be formatted in SEO-friendly HTML.
                        The response must also include appropriate HTML title and meta description content.
                        The return format must be stringified JSON in the following format:
                        {
                          "postContent": post content here
                          "title": title goes here
                          "metaDescription": meta description goes here
                        }`,
                      });*/

    console.log("i'm ready!", topic, keywords);

    const postContentResult = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a blog post generator.',
        },
        {
          role: 'user',
          content: `Write a long and detailed SEO-friendly blog post about ${topic}, that targets the following comma-separated keywords: ${keywords}.
      The response should be formatted in SEO-friendly HTML,
      limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, i, ul, li, ol.`,
        },
      ],
      temperature: 0,
    });

    console.log(postContentResult, 'postContentResult');

    const postContent = postContentResult.data?.choices[0]?.message?.content;

    const titleResult = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a blog post generator.',
        },
        {
          role: 'user',
          content: `Write a long and detailed SEO-friendly blog post about ${topic}, that targets the following comma-separated keywords: ${keywords}.
      The response should be formatted in SEO-friendly HTML,
      limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, i, ul, li, ol.`,
        },
        {
          role: 'assistant',
          content: postContent ?? '',
        },
        {
          role: 'user',
          content:
            'Generate appropriate title tag text for the above blog post',
        },
      ],
      temperature: 0,
    });

    const metaDescriptionResult = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a blog post generator.',
        },
        {
          role: 'user',
          content: `Write a long and detailed SEO-friendly blog post about ${topic}, that targets the following comma-separated keywords: ${keywords}.
      The response should be formatted in SEO-friendly HTML,
      limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, i, ul, li, ol.`,
        },
        {
          role: 'assistant',
          content: postContent ?? '',
        },
        {
          role: 'user',
          content:
            'Generate SEO-friendly meta description content for the above blog post',
        },
      ],
      temperature: 0,
    });

    const title = titleResult.data?.choices[0]?.message?.content;
    const metaDescription =
      metaDescriptionResult.data?.choices[0]?.message?.content;

    console.log('POST CONTENT: ', postContent);
    console.log('TITLE: ', title);
    console.log('META DESCRIPTION: ', metaDescription);

    if (topic.length > 80 || keywords.length > 80) {
      res.status(422);
      return;
    }

    const newPost = await prisma.post.create({
      data: {
        User: { connect: { id: userProfile?.id } },
        title: title || '',
        postContent: postContent || '',
        metaDescription: metaDescription || '',
        topic,
        keywords,
      },
    });
    res.status(201).json({ result: newPost });
    return;
  }
});
