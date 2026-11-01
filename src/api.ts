const BASE = "https://api.oluwasetemi.dev";

export type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  author: string | null;
  createdAt: string;
};

export async function getPosts(): Promise<Post[]> {
  const res = await fetch(`${BASE}/posts`);
  if (!res.ok) throw new Error("Failed to load posts");
  const json = await res.json();
  return json.data ?? json;
}

export async function getPost(slug: string): Promise<Post> {
  const res = await fetch(`${BASE}/posts/slug/${slug}`);
  if (res.status === 404) throw new Error("NOT_FOUND");
  if (!res.ok) throw new Error("Failed to load post");
  const json = await res.json();
  return json.data ?? json;
}

export async function createPost(input: {
  title: string;
  content: string;
  excerpt?: string;
  author?: string;
}): Promise<Post> {
  const res = await fetch(`${BASE}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...input, status: "PUBLISHED" }),
  });
  if (!res.ok) throw new Error("Failed to create post");
  const json = await res.json();
  return json.data ?? json;
}
