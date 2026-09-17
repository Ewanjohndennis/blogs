import { OGImageRoute } from 'astro-og-canvas';
import { getCollection } from 'astro:content';

const posts = await getCollection('posts');

const pages = {
  index: {
    title: 'Ewan John Dennis · Blogs',
    description: 'A collection of technical articles, architectural breakdowns, and software engineering notes on web development, system design, and active projects.',
  },
  ...Object.fromEntries(
    posts.map((post) => [
      post.slug,
      {
        title: post.data.title,
        description: post.data.summary 
          ? `${post.data.summary} — A deep dive into implementation details, core concepts, and key takeaways.`
          : 'Read the full post for technical breakdowns, code examples, and practical insights.',
      },
    ])
  ),
};

export const { getStaticPaths, GET } = OGImageRoute({
  param: 'route',
  pages,
  getImageOptions: (_, page) => ({
  title: page.title,
  description: `${page.description}\n\nEwan John Dennis · blogs-ewanjohndennis.vercel.app`,
  bgGradient: [
    [0, 0, 0],
    [0, 0, 0],
  ],
  border: { color: [255, 255, 255], width: 8, side: 'block-start' },
  font: {
    title: {
      color: [255, 255, 255],
      size: 60,
      weight: 'Bold',
      lineHeight: 1.2,
    },
    description: {
      color: [180, 180, 180],
      size: 26,
      lineHeight: 1.5,
    },
  },
  padding: 80,
}),
});