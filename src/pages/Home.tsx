import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { getPosts } from "../api";

export default function Home() {
  const { data: posts } = useSuspenseQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  return (
    <div>
      <h1>Latest Posts</h1>
      <div className="grid">
        {posts.map((post) => (
          <article className="card" key={post.id}>
            <h2>{post.title}</h2>
            <p>
              {post.excerpt ?? post.content.slice(0, 120) + "..."}
            </p>
            <Link to="/posts/$slug" params={{ slug: post.slug }}>
              Read more
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}