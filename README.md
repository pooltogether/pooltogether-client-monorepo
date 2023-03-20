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
- `ecosystem`: App to direct users to other feature-specific apps/solutions.
- `landing-page`: App to explain the protocol and direct users to our other apps.
- `tools`: App for extra PoolTogether tooling.

All apps above are [Next.js](https://nextjs.org/) apps with [Tailwind CSS](https://tailwindcss.com/) support, written in [TypeScript](https://www.typescriptlang.org/).

**Repo Links:** [App](https://github.com/pooltogether/pooltogether-client-monorepo/tree/main/apps/app) | [Ecosystem](https://github.com/pooltogether/pooltogether-client-monorepo/tree/main/apps/ecosystem) | [Landing Page](https://github.com/pooltogether/pooltogether-client-monorepo/tree/main/apps/landing-page) |  [Tools](https://github.com/pooltogether/pooltogether-client-monorepo/tree/main/apps/tools)

### External Packages

- `pt-client-js`: Protocol-specific functions to easily interact with on-chain Hyperstructure data, using [Ethers](https://ethers.org/).
- `pt-hyperstructure-hooks`: Shared React hooks specific to Hyperstructure functionality, using [WAGMI](https://wagmi.sh/).

**Repo Links:** [Client JS](https://github.com/pooltogether/pooltogether-client-monorepo/tree/main/packages/pt-client-js) | [Hyperstructure Hooks](https://github.com/pooltogether/pooltogether-client-monorepo/tree/main/packages/pt-hyperstructure-hooks)

### Internal Packages

- `pt-components`: React component library utilizing some simpler components from `pt-ui`, using [WAGMI](https://wagmi.sh/).
- `pt-generic-hooks`: Shared React hooks.
- `pt-types`: Shared Typescript types.
- `pt-ui`: Stub React component library with [Tailwind CSS](https://tailwindcss.com/) used throughout many apps, using [Flowbite](https://flowbite-react.com/).
- `pt-utilities`: Shared Typescript utilities.
- `tailwind-config`: Shared `tailwind` configs.
- `tsconfig`: Shared `tsconfig.json` setups.

**Repo Links:** [Components](https://github.com/pooltogether/pooltogether-client-monorepo/tree/main/packages/pt-components) | [Generic Hooks](https://github.com/pooltogether/pooltogether-client-monorepo/tree/main/packages/pt-generic-hooks) | [Types](https://github.com/pooltogether/pooltogether-client-monorepo/tree/main/packages/pt-types) | [UI](https://github.com/pooltogether/pooltogether-client-monorepo/tree/main/packages/pt-ui) | [Utilities](https://github.com/pooltogether/pooltogether-client-monorepo/tree/main/packages/pt-utilities) | [Tailwind Config](https://github.com/pooltogether/pooltogether-client-monorepo/tree/main/packages/tailwind-config) | [TS Config](https://github.com/pooltogether/pooltogether-client-monorepo/tree/main/packages/tsconfig)

### Package Notes

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

If editing component themes in `pt-ui` or `pt-components`, having the `Tailwind CSS IntelliSense` plugin for VSCode is recommended. In order to enable it for custom Flowbite themes and string class names, add `theme` and `.*ClassName*` to the `Class Attributes` setting.
