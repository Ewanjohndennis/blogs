import { OGImageRoute } from 'astro-og-canvas';
import { getCollection } from 'astro:content';

const posts = await getCollection('posts');

const pages = Object.fromEntries(
  posts.map((post) => [
    post.slug,
    {
      title: post.data.title,
      description: post.data.summary,
    },
  ])
);

export const { getStaticPaths, GET } = OGImageRoute({
  param: 'route',
  pages,
  getImageOptions: (_, page) => ({
    title: page.title,
    description: page.description,
    bgGradient: [[13, 17, 23]],
    border: { color: [30, 37, 48], width: 8, side: 'block-start' },
    font: {
      title: {
        color: [226, 232, 240],
        size: 48,
        weight: 'Bold',
      },
      description: {
        color: [100, 116, 139],
        size: 24,
      },
    },
    padding: 60,
  }),
});