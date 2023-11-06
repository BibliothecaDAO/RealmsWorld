---
title: Frontend
layout: default
nav_order: 2
has_children: true
---

# Realms.World Frontend

## Development Guidelines

### Overview

[Realms.World](https://realms.world){:target="\_blank" rel="noopener"} is built using Next.js 14, which allows for a seamless integration of server and client components. The application aims to maximize performance and scalability by leveraging Vercel's cache and local cache and is built on top of the [T3 Stack](https://github.com/t3-oss/create-t3-turbo)

### Server Components

Any component/data that can be rendered/fetched on the server should be rendered on the server to optimize the user experience. Page layouts are the most obvious examples of server-rendered components. Within these layouts, server components can be used to add interactivity. This abstraction ensures that page loads are as fast as possible for the end user.

## Getting Started

To start developing on Realms.World run the following commands from the project root:

```bash
bun i
```

```bash
bun run dev
```

## Enviroment Variables

Depending on which environemnt you want to run, either copy the values from `.env.goerli` or `.env.mainnet` into your `.env` file.

## Indexers

You only need to run the subgraph and/or Apibara indexers locally if you want to preview changes, otherwise just use the deployed instances/database URL (as set in the `.env` file)

## Add a Game/Collection/Token

See [`Data`](/data)
