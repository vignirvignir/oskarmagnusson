import { access, cp, mkdir, writeFile } from 'node:fs/promises';
import { catalog } from './src/catalog.mjs';
import { bioPage, coverFile, detailPage, entryPath, homePage } from './src/templates.mjs';

const source = new URL('./src/assets/', import.meta.url);
const output = new URL('./dist/', import.meta.url);
const slugs = new Set(catalog.map(({ slug }) => slug));

if (slugs.size !== catalog.length) {
  throw new Error('Every catalog entry needs a unique slug.');
}

for (const entry of catalog) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.slug)) {
    throw new Error(`Invalid catalog slug: ${entry.slug}`);
  }
  await access(new URL(`covers/${coverFile(entry)}`, source));
  for (const { slug } of entry.related ?? []) {
    if (!slugs.has(slug)) {
      throw new Error(`Unknown related title "${slug}" in "${entry.slug}".`);
    }
  }
  for (const item of entry.contents ?? []) {
    if (typeof item !== 'string' && !catalog.some(({ slug, reading }) => slug === item.slug && reading)) {
      throw new Error(`Unknown reading section "${item.slug}" in "${entry.slug}".`);
    }
  }
}

async function writePage(path, html) {
  const directory = new URL(path, output);
  await mkdir(directory, { recursive: true });
  await writeFile(new URL('index.html', directory), html, 'utf8');
}

await Promise.all([
  cp(source, new URL('assets/', output), { recursive: true }),
  writePage('./', homePage(catalog)),
  writePage('about/', bioPage()),
  ...catalog.map((entry) => writePage(entryPath(entry), detailPage(entry, catalog)))
]);

console.log(`Built the homepage, full bio, and ${catalog.length} detail pages in dist/.`);
