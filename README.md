# PoolTogether Client Monorepo

This monorepo includes many of PoolTogether's apps and packages in order to facilitate code sharing and maintainabiliy.

### Installation

Make sure you have [pnpm](https://pnpm.io/) installed, as it is the package manager used throughout this monorepo.

`pnpm install`

### Development

`pnpm dev`

Each app is already setup with its own port through its `package.json` dev script.

---

### Apps

- `app`: App w/ core PoolTogether Hyperstructure functionality.
- `ecosystem`: App to highlight parts of the PoolTogether ecosystem.
- `landing-page`: PoolTogether's landing page.
- `tools`: App for extra PoolTogether tooling.

All apps above are [Next.js](https://nextjs.org/) apps with [Tailwind CSS](https://tailwindcss.com/) support, written in [TypeScript](https://www.typescriptlang.org/).

### Packages

- `pt-client-js`: Protocol-specific functions to easily interact with on-chain data.
- `pt-components`: More complex React component library utilizing some components from `pt-ui`.
- `pt-generic-hooks`: Shared React hooks.
- `pt-hyperstructure-hooks`: Shared React hooks specific to Hyperstructure functionality.
- `pt-types`: Shared Typescript types.
- `pt-ui`: Stub React component library with [Tailwind CSS](https://tailwindcss.com/) used throughout many apps, using [Flowbite](https://flowbite-react.com/).
- `pt-utilities`: Shared Typescript utilities.
- `tailwind-config`: Shared `tailwind` configs.
- `tsconfig`: Shared `tsconfig.json` setups.

All packages above are written in [TypeScript](https://www.typescriptlang.org/).

When making changes to packages, running `pnpm i` will run the `prepare` scripts on each one, properly building them for use in the apps.

### Utilities

This Turborepo has some additional tools already setup:

- [Tailwind CSS](https://tailwindcss.com/) for styles
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [Prettier](https://prettier.io) for code formatting

### Known Issues / Fixes

When adding/updating apps and/or packages, duplicate dependencies may be created, creating versioning issues. This can be resolved through running `pnpm up -r` as described [here](https://github.com/pnpm/pnpm/issues/2443), or just looking through `pnpm-lock.yaml` to identify version discrepancies.

The biggest culprit of the above is `@tanstack/react-query`, which sometimes is installed as two different versions and apps can no longer utilize hooks from the hooks package. This has been solved through the method described [here](https://github.com/TanStack/query/issues/3595#issuecomment-1248074333).

If editing component themes in `pt-ui` or `pt-components`, having the `Tailwind CSS IntelliSense` plugin for VSCode is recommended. In order to enable it for custom Flowbite themes or string class names, add `theme` and `.*ClassName*` to the `Class Attributes` setting.
