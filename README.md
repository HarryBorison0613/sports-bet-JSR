# bets-com

Monorepo for [bets.com.br](https://www.bets.com.br) projects.

## Folders

- **.github**: All github related contents.
- **apps**: Apps folder contains all client facing projects.
  - `apps/blogs`: Blog website [`blogs.bets.com.br`](https://blogs.bets.com.br)
  - `apps/payments`: Payments website [`payments.bets.com.br`](https://payments.bets.com.br)
  - `apps/wwww`: The main website [`www.bets.com.br`](https://www.bets.com.br)
- **packages**: Packages folder contains all utility packages and cloudflare workers
  - `packages/api-kv-worker`: Cloudflare KV worker project to cache individual API routes of SportsRadar. Available at url [`api-kv.bets.com.br`](https://api-kv.bets.com.br)

## Development

- Clone the repository
- Install packages `yarn install` or `npm install`
- `cd` into desired `apps/<project-name>` directory and run command `yarn dev`

## Contribution

- Direct commit to `main` branch is not allowed.
