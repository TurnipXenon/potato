# Turnip

Turnip is the frontend for my personal page.

## Important links

- [ ] Documentation page
- [Project page](https://github.com/users/TurnipXenon/projects/8)
- [Technical specification](https://docs.google.com/document/d/1_CBxWiDgurLE31loZ0ZxrkY5D5uhCEy3JMnArNdRLOM/view#heading=h.h0j384n1lwto)

**Specific sections inside the documentation page:**

- [ ] Setup?
- [ ] Quickstart
- [ ] [Onboarding guide](./docs/docs/docs/docs/onboarding.md)
- [ ] Testing locally
- [ ] Testing via dev stack
- [ ] Deploying to production
- [ ] Runbook
- [ ] API
- [ ] Technical specification (generated)

## Contributing to README.md

**Do not edit `./README.md`!** Instead, edit `./docs/docs/index.md`. After editing that file,
run `go run dev/sync_mkdocs_readme.go` from the root folder `/`. That should automatically transform all the
relative references.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/revalidate.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
