export const prerender = false;
import { ImageResponse } from '@vercel/og';
import { getCollection } from 'astro:content';

export async function GET({ params, request }: { params: { slug?: string }; request: Request }) {
  const url = new URL(request.url);
  const title = url.searchParams.get('title') || 'Ewan John Dennis';
  const category = url.searchParams.get('category') || 'WRITING';
  const summary = url.searchParams.get('summary') || 'Engineering notes, case studies, and technical breakdowns.';

  const html = {
    type: 'div',
    props: {
      style: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#000000',
        color: '#f0eee8',
        padding: '60px',
        fontFamily: 'monospace',
        border: '12px solid #0c0c0c',
      },
      children: [
        // Top Header Bar
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: { display: 'flex', gap: '10px' },
                  children: [
                    { type: 'div', props: { style: { width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#2e2e2e' } } },
                    { type: 'div', props: { style: { width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#2e2e2e' } } },
                    { type: 'div', props: { style: { width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#2e2e2e' } } },
                  ],
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '20px',
                    color: '#888888',
                    border: '1px solid #222222',
                    padding: '4px 12px',
                    borderRadius: '4px',
                    backgroundColor: '#0c0c0c',
                  },
                  children: `ewan@blog ~/posts/${category.toLowerCase()}`,
                },
              },
            ],
          },
        },

        // Main Title Block
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  },
                  children: [
                    {
                      type: 'span',
                      props: {
                        style: {
                          backgroundColor: '#222222',
                          color: '#f0eee8',
                          padding: '4px 12px',
                          borderRadius: '4px',
                          fontSize: '18px',
                          textTransform: 'uppercase',
                          border: '1px solid #2e2e2e',
                        },
                        children: category,
                      },
                    },
                  ],
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '52px',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    lineHeight: 1.2,
                    letterSpacing: '-0.02em',
                  },
                  children: title,
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '24px',
                    color: '#888888',
                    lineHeight: 1.4,
                    maxWidth: '900px',
                  },
                  children: summary,
                },
              },
            ],
          },
        },

        // Footer Bar
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              borderTop: '1px solid #222222',
              paddingTop: '20px',
              color: '#555555',
              fontSize: '18px',
            },
            children: [
              { type: 'span', props: { children: 'UTF-8 · MARKDOWN' } },
              { type: 'span', props: { children: 'Ewan John Dennis' } },
            ],
          },
        },
      ],
    },
  };

  return new ImageResponse(html as any, {
    width: 1200,
    height: 630,
  });
}