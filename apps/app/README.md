# PoolTogether App

App w/ core PoolTogether Hyperstructure functionality.

![version](https://img.shields.io/github/package-json/v/pooltogether/pooltogether-client-monorepo?filename=apps%2Fapp%2Fpackage.json&color=brightgreen)

![next](https://img.shields.io/static/v1?label&logo=nextdotjs&logoColor=white&message=Next.js&color=black)
![typescript](https://img.shields.io/static/v1?label&logo=typescript&logoColor=white&message=TypeScript&color=blue)
![viem](https://img.shields.io/static/v1?label&logo=v&logoColor=white&message=Viem&color=gray)
![tailwind](https://img.shields.io/static/v1?label&logo=tailwindcss&logoColor=white&message=TailwindCSS&color=38B2AC)

[![Netlify Status](https://api.netlify.com/api/v1/badges/cd2c8609-de0a-488d-9692-84c6392feebd/deploy-status)](https://app.netlify.com/sites/mvp-pt-app/deploys)

## Getting Started

Run the development server through `pnpm dev`.

Open [http://localhost:3000](http://localhost:3000) on your browser to see the resulting app.

## App Structure

- `pages` - All of the pages in the app!
- `components` - React components that make up the contents of the pages.
- `hooks` - App-specific hooks not included in other hook packages.
- `constants` - Constant values, references and configurations to deploy and run this app.
- `vaultLists` - Any default vault lists for the app.

## App Data Configuration

Most of the data on the app comes from the `useSelectedVaults()` hook from the `hyperstructure-react-hooks` package. That hook returns a `Vaults` object from `hyperstructure-client-js`.

Using various other hooks from `hyperstructure-react-hooks`, the app uses these `Vaults` or `Vault` objects to query all necessary data.

Viem Clients are configured through `wagmi` in the `/pages/_app.tsx` file. These can be fetched throughout the app with the `usePublicClient()` or `usePublicClients()` hooks.

## Environment Setup:

Add your RPC URLs to `.env.local` for testing. A `.env.example` file is available for reference.

If none are provided, the app will use public RPCs which could potentially get rate-limited.
