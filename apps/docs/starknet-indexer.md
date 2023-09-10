---
title: Starknet Indexer
layout: default
---

# Starknet Bridge Indexer with Apibara

This repository uses [Apibara](https://github.com/apibara/apibara){:target="\_blank" rel="noopener"} to index the Starknet Lords Bridge L2 Withdrawal Initiated data. You only need to run this indexer locally if you want to make changes to the schema - otherwise point your client to our deployed instance at:

| Network | Subgraph URL                                                                                                                       |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Mainnet | [https://resonant-badge-production.up.railway.app/graphql](https://resonant-badge-production.up.railway.app/graphql)               |
| Goerli  | [https://resonant-badge-production.up.railway.app/goerli-graphql](https://resonant-badge-production.up.railway.app/goerli-graphql) |

## Getting Started

Create a new virtual environment for this project. While this step is not required, it is _highly recommended_ to avoid conflicts between different installed packages.

    python3 -m venv venv

Then activate the virtual environment.

    source venv/bin/activate

Then install `poetry` and use it to install the package dependencies.

    python3 -m pip install poetry
    poetry install

Start MongoDB using the provided `docker-compose` file:

    docker-compose up

Notice that you can use any managed MongoDB like MongoDB Atlas.

Then start the indexer by running the `indexer start` command. The `indexer` command runs the cli application defined in `src/indexer/main.py`. This is a standard Click application.

    indexer start --network goerli --start_block 819244 --bridge 0x042331a29c53f6084f08964cbd83b94c1a141e6d14009052d55b03793b21d5b3

Notice that by default the indexer will start indexing from where it left off in the previous run. If you want restart, use the `--restart` flag.

    indexer start --restart

Notice that will also delete the database with the indexer's data.

## Customizing the template

You can change the id of the indexer by changing the value of the `indexer_id` variable in `src/indexer/indexer.py`. This id is also used as the name of the Mongo database where the indexer data is stored.

## Running in production

This template includes a `Dockerfile` that you can use to package the indexer for production usage.

## Running GraphQL Server

To start the graphql server, enter the venv and run:

    indexer graphql

The goerli graphiql will be available at `http://localhost:8080/goerli-graphql` and mainnet at `http://localhost:8080/graphql`
