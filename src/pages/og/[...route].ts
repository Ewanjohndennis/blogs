import { OGImageRoute } from 'astro-og-canvas';
import { getCollection } from 'astro:content';

const posts = await getCollection('posts');

const pages = {
  index: {
    title: 'Writing — Ewan John Dennis',
    description: 'Engineering notes, case studies, and technical breakdowns.\n\nEwan John Dennis · blogs-ewanjohndennis.vercel.app',
  },
  ...Object.fromEntries(
    posts.map((post) => [
      post.slug,
      {
        title: post.data.title,
        description: `${post.data.summary}\n\nEwan John Dennis · blogs-ewanjohndennis.vercel.app`,
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
  bgGradient: [[13, 17, 23]],
  border: { color: [30, 37, 48], width: 8, side: 'block-start' },
  font: {
    title: {
      color: [226, 232, 240],
      size: 60,
      weight: 'Bold',
      lineHeight: 1.2,
    },
    description: {
      color: [100, 116, 139],
      size: 26,
      lineHeight: 1.5,
    },
  },
  padding: 80,
}),
});