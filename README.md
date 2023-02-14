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

- `eslint-config-custom`: Shared `eslint` configs, including `eslint-config-next` and `eslint-config-prettier`.
- `pt-client-js`: Protocol-specific functions to easily interact with on-chain data.
- `pt-components`: More complex React component library utilizing some components from `pt-ui`.
- `pt-hooks`: Shared React hooks.
- `pt-types`: Shared Typescript types.
- `pt-ui`: Stub React component library with [Tailwind CSS](https://tailwindcss.com/) used throughout many apps, using [Flowbite](https://flowbite-react.com/).
- `pt-utilities`: Shared Typescript utilities.
- `tailwind-config`: Shared `tailwind` configs.
- `tsconfig`: Shared `tsconfig.json` setups.

All packages above are written in [TypeScript](https://www.typescriptlang.org/).

### Building packages/ui

This example is setup to build `packages/ui` and output the transpiled source and compiled styles to `dist/`. This was chosen to make sharing one `tailwind.config.js` as easy as possible, and to ensure only the CSS that is used by the current application and its dependencies is generated.

Another option is to consume `packages/ui` directly from source without building. If using this option, you will need to update your `tailwind.config.js` to be aware of your package locations, so it can find all usages of the `tailwindcss` class names.

For example, in [tailwind.config.js](packages/tailwind-config/tailwind.config.js):

```js
  content: [
    // app content
    `src/**/*.{js,ts,jsx,tsx}`,
    // include packages if not transpiling
    "../../packages/**/*.{js,ts,jsx,tsx}",
  ],
```

### Utilities

This Turborepo has some additional tools already setup:

- [Tailwind CSS](https://tailwindcss.com/) for styles
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Known Issues / Fixes

When adding/updating apps and/or packages, duplicate dependencies may be created, creating versioning issues. This can be resolved through running `pnpm up -r` as described [here](https://github.com/pnpm/pnpm/issues/2443).
