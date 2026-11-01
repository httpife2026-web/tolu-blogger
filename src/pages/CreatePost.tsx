import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { createPost } from "../api";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: (post) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate({ to: "/posts/$slug", params: { slug: post.slug } });
    },
  });

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    mutation.mutate({
      title,
      content,
      excerpt: excerpt || undefined,
    });
  }

  return (
    <div>
      <h1>New Post</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        
        <input
          placeholder="Short excerpt (optional)"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
        />
        <textarea
          placeholder="Content"
          rows={8}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Publishing..." : "Publish"}
        </button>
        {mutation.isError && <p className="error">Could not create post.</p>}
      </form>
    </div>
  );
}