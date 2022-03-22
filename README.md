# Differenzo

Inspect, visualize, and save differences between texts.

Differenzo is a [Progressive Web App(PWA)](https://web.dev/what-are-pwas/). How to install it? [Follow this instructions](https://web.dev/learn/pwa/installation).

This project is deployed with [netlify](https://www.netlify.com). The deployment process of a monorepo that uses [pnpm](https://pnpm.io) needs some configurations. Check the `netlify.toml` file for more information.

## Prerequisites

- Install [`pnpm`](https://pnpm.io)

## Project setup

The repository uses a modification of the [myers-diff](https://github.com/wickedest/myers-diff) project. The modified package is in `packages/myers-diff` directory. The project was modified to do the development mode easier and to export some classes.

### 1- Install dependencies

This step will configure the local `myers-diff` package using [pnpm-workspaces](https://pnpm.io/workspaces).

```bash
pnpm install
```

### 2- Config Git hooks (required)

```bash
pnpm run prepare
```

### Development

This step will execute the `dev` script in the root of the project and in each package of the `packages/` directory at the same time.

If the `myers-diff` package is modified, then the command will do the build process of the package and the modification will be available to use in the UI project.

If the `myers-diff` will not be modified, then remove the `--parallel` parameter.

```bash
pnpm run dev --parallel
```

### Build

Do the buid process using [pnpm-workspaces](https://pnpm.io/workspaces).

```bash
pnpm run build
```

### Lints and fixes files

```bash
pnpm run lint
```
