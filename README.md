# Óskar Magnússon

A static author website with an English-language homepage and individual pages for the books and anthologies in the supplied references.

## Build and preview

From this folder, run:

```sh
npm run build
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Visit http://127.0.0.1:4173/. The build uses Node.js and needs no package installation. To host the site later, serve the contents of `dist/` with directory index support.

## Edit the site

- Edit `src/catalog.mjs` to update a title or add a new entry. Entries appear on the homepage in file order. Set `kind: 'Anthology'` for an anthology.
- Add its cover to `src/assets/covers/` as `<slug>.webp`. Set `coverSize` to the actual pixel dimensions. An optional `cover` field can specify another filename.
- Use optional `contents` for a story list, `links` for external reading or publisher links, and `related` to link to another entry by slug.
- Edit the biography and contact details in `src/author.mjs`. Shared HTML lives in `src/templates.mjs`, and the stylesheet is `src/assets/site.css`.
- Run `npm run build` again after editing. If you remove or rename a title, clear the previous generated `dist/` first to drop the old URL.
