# Alumni Front

Static front-end site (HTML + Tailwind CSS).

## Setup

```bash
npm install
npm run build   # compiles style.css -> dist/output.css
```

## Development

```bash
npm run watch   # rebuilds dist/output.css on file changes
```

Then serve the project root with any static file server (the page references
`/node_modules/lucide/...` and `/dist/output.css` directly), e.g.:

```bash
npx serve .
```

## License

All rights reserved. See [LICENSE](./LICENSE).
