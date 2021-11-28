## Description

A GraphQL server to get cryptocurrency information using the free [Messari](https://messari.io/api) API.
Based on [Nest](https://github.com/nestjs/nest) framework and their [GraphQL plugin](https://docs.nestjs.com/graphql/quick-start).
This is a pet project to try out:
- NestJS
- A more functional approach using [fp-ts](https://github.com/gcanti/fp-ts)
- [Union types](https://blog.logrocket.com/handling-graphql-errors-like-a-champ-with-unions-and-interfaces/) for GraphQL operations' output
- DataLoaders
## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Useful links
- proper use of DataLoader in NestJS:
  - [Using GraphQL DataLoaders with NestJS](https://dev.to/filipegeric/using-graphql-dataloaders-with-nestjs-2jo1) by [Filip Egeric](https://dev.to/filipegeric)
  - [NestJS Discord post about DataLoader](https://discord.com/channels/520622812742811698/601536926268260392/902969403132493874)