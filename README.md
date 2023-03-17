## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```


# Development guidelines

### Overview

This app uses Nextjs 13 to leverage server and client components. The goal is to use the Vercel cache along with local cache to maximise performance and scalability.

### API Routes
All external fetches should have an API route. This allows us to cache the routes along.

### Server components
Any component that can be rendered on the server _should be_ rendered on the server. The obvious examples are the page layouts. Nested within these layouts we use Server components to add interactivity. This abstraction will allow the page loads to be as fast as possible for the end user.

