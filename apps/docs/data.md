---
title: Data
layout: default
nav_order: 2
has_children: true
---

# Realms.World Data

## Add a Game

To add a game to the frontend - make a fork of (Realms.World Github)[https://github.com/BibliothecaDAO/realmsworld] and then:

1. In `packages/constants/src/Games.ts` add a new object to the end of the `const games: Game[]`. You can find values for the Collection, Chain and Token typescript enums in the relevant files in the same directory.

2. Create folder `apps/nextjs/public/games/{game.id}` (using the id entered in the previous step) with the following structure:

.
└── apps/nextjs/public/games/{game.id}/
    ├── screenshots/
    │   ├── 1.png
    │   ├── 2.jpg
    │   ├── 3.png
    │   └── ...
    ├── background.webp
    ├── cover.webp
    └── icon.svg

3. Submit a PR to the main branch of the repo