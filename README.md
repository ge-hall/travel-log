# Nuxt Travel Log

Look at the [Youtube tutorial](https://www.youtube.com/watch?v=DK93dqmJJYg&t=971s) to learn more.

## Development Server

using npm as pnpm has some known incompatabilies. nuxi add module for eslint failed to setup everything
but worked with npm. In hindsight this may have been due to adding eslint instead of @nuxt/eslint

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

```

## Production

Build the application for production:

```bash
# npm
npm build

```

Locally preview production build:

```bash
# pnpm
npm preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
