import { lazy, Suspense } from "react";
import {
  createRootRoute,
  createRoute,
  createRouter,
  Link,
  Outlet,
} from "@tanstack/react-router";

const Home = lazy(() => import("./pages/Home"));
const PostDetail = lazy(() => import("./pages/PostDetail"));
const CreatePost = lazy(() => import("./pages/CreatePost"));

const rootRoute = createRootRoute({
  component: () => (
    <>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/new">New Post</Link>
      </nav>
      <main>
        <Suspense fallback={<p>Loading...</p>}>
          <Outlet />
        </Suspense>
      </main>
    </>
  ),
  notFoundComponent: () => (
    <div>
      <h1>404 - Page not found</h1>
      <Link to="/">Go back home</Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div>
      <h1>Something went wrong</h1>
      <p>
        {(error as Error).message === "NOT_FOUND"
          ? "That post does not exist."
        : (error as Error).message}
      </p>
      <button onClick={reset}>Try again</button>
      <Link to="/">Go home</Link>
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const postRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/posts/$slug",
  component: PostDetail,
});

const newRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/new",
  component: CreatePost,
});

const routeTree = rootRoute.addChildren([indexRoute, postRoute, newRoute]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}