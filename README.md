# [chess](https://jonathanrtuck.github.io/chess/dist/)

An exercise using React, Redux, and Typescript.

## Todo

- [x] board
- [x] pieces
- [-] moving pieces
  - [x] desktop
  - [ ] mobile
- [x] move validation
- [x] checkmate
- [x] stalemate
- [x] en passant
- [ ] castling
- [ ] pawn promotion
- [ ] threefold repetition
- [ ] 50-move draw

## Installation

Requires [Node.js](https://nodejs.org/) v8+ and [yarn](https://yarnpkg.com/).

```sh
git clone https://github.com/jonathanrtuck/chess.git
cd chess
yarn
```

## Development

```sh
yarn develop
```

This will start a hot-reloading development environment accessible locally at [localhost:8080](http://localhost:8080/).

## Deployment

```sh
yarn build
```

This will perform an optimized production build. The contents of the _/dist_ folder can then be deployed to the production server.

**Note:** You may need to modify the `publicPath` in _webpack.config.js_ to match the server's directory structure.
