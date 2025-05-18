## Getting Started

> 🚨 First, make sure that you have obtained the necessary API keys and loaded them into an ``.env`` file.
> Refer to ``.env.example`` for all required variables
```bash
cp .env.example .env
# Then fill in .env with the proper keys
```
> 🚨 If the express server does not run at port ``3001`` on your machine, please make the appropriate change to ``VITE_SERVER_PORT``.

Next, install all the dependencies:

```bash
pnpm install
```

Next, run the development server:

```bash
pnpm run dev
```

Or, build and run the production server:

```bash
pnpm build && pnpm start
```

## For dev build
Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

## For production preview build
Open [http://localhost:4173](http://localhost:4173) with your browser to see the result.

> This web app is powered by React, TypeScript, TailwindCSS, Vite and Express.