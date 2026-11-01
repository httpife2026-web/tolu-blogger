import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useParams, useRouter } from "@tanstack/react-router";
import { getPost } from "../api";

export default function PostDetail() {
  const { slug } = useParams({ strict: false }) as { slug: string };
  const router = useRouter();

  const { data: post } = useSuspenseQuery({
    queryKey: ["post", slug],
    queryFn: () => getPost(slug),
  });

  return (
    <article className="detail">
      <button onClick={() => router.history.back()}>← Back</button>
      <Link to="/">Home</Link>
      <h1>{post.title}</h1>
      <p className="meta">
        {post.author ?? "Anonymous"} ·{" "}
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <p>{post.content}</p>
    </article>
  );
}