# Governance Parameters Webapp Example

Be sure to update `env.local.example` and rename it to `.env.local` and fill in the secret values in that file. Please note the JSON-RPC provider *must* be Alchemy because we use a specific Alchemy JSON-RPC command to get a user's transactions.

## AxiomREPL

The [AxiomREPL](https://repl.axiom.xyz/) code is located at `/webapp/src/lib/circuit/index.ts`.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
