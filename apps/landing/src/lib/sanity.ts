import { createClient } from '@sanity/client';

const client = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID || 'your-project-id',
  dataset: import.meta.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  mainImage?: {
    asset: { url: string };
    alt?: string;
  };
  publishedAt: string;
  content: any[];
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    return await client.fetch(
      `*[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        description,
        mainImage { asset->{ url }, alt },
        publishedAt
      }`
    );
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    return await client.fetch(
      `*[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        description,
        mainImage { asset->{ url }, alt },
        publishedAt,
        content
      }`,
      { slug }
    );
  } catch {
    return null;
  }
}

export default client;
