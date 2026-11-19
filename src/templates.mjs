import { author } from './author.mjs';

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

const title = (entry) => entry.titleLanguage
  ? `<span lang="${escapeHtml(entry.titleLanguage)}">${escapeHtml(entry.title)}</span>`
  : escapeHtml(entry.title);

export const group = (entry) => entry.kind === 'Anthology' ? 'anthologies' : 'books';
export const coverFile = (entry) => entry.cover ?? `${entry.slug}.webp`;
export const entryPath = (entry) => `${group(entry)}/${entry.slug}/`;

function cover(entry, root, loading) {
  const [width, height] = entry.coverSize;
  return `<img src="${root}assets/covers/${escapeHtml(coverFile(entry))}" width="${width}" height="${height}" alt="${escapeHtml(entry.title)} cover" loading="${loading}" decoding="async">`;
}

function page({ pageTitle, description, root, body, active }) {
  const home = root === './' ? '' : root;
  const menu = [['books', 'Books'], ['anthologies', 'Anthologies'], ['about', 'About'], ['contact', 'Contact']];
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="theme-color" content="#f8f6ef">
  <meta name="description" content="${escapeHtml(description)}">
  <title>${escapeHtml(pageTitle)}</title>
  <link rel="icon" href="${root}assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="${root}assets/site.css">
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="wrap header-inner">
      <a class="wordmark" href="${root}" lang="is">${escapeHtml(author.name)}</a>
      <nav class="site-nav" aria-label="Main navigation">
        ${menu.map(([id, label]) => `<a href="${home}#${id}"${active === id ? ' class="current"' : ''}>${label}</a>`).join('\n        ')}
      </nav>
    </div>
  </header>
  <main id="main">
${body}
  </main>
  <footer class="site-footer" id="contact">
    <div class="wrap footer-inner">
      <a class="wordmark" href="${root}" lang="is">${escapeHtml(author.name)}</a>
      <div class="footer-contact">
        <span class="eyebrow">Contact</span>
        <a href="mailto:${escapeHtml(author.email)}">${escapeHtml(author.email)}</a>
      </div>
    </div>
  </footer>
</body>
</html>
`;
}

function card(entry) {
  return `<article class="catalog-card">
    <a class="card-link" href="./${entryPath(entry)}">
      <div class="cover-stage ${escapeHtml(entry.palette)}">${cover(entry, './', 'lazy')}</div>
      <p class="eyebrow card-meta">${escapeHtml(entry.story ?? entry.kind)} <span aria-hidden="true">·</span> ${escapeHtml(entry.edition)}</p>
      <h3>${title(entry)}</h3>
    </a>
    ${entry.subtitle ? `<p class="subtitle">${escapeHtml(entry.subtitle)}</p>` : ''}
    <p class="card-summary">${escapeHtml(entry.summary)}</p>
  </article>`;
}

export function homePage(catalog) {
  const books = catalog.filter((entry) => group(entry) === 'books');
  const anthologies = catalog.filter((entry) => group(entry) === 'anthologies');
  return page({
    pageTitle: `${author.name} — Novels & Short Stories`,
    description: author.introduction,
    root: './',
    body: `    <section class="wrap hero" aria-labelledby="author-name">
      <div class="hero-copy">
        <p class="eyebrow hero-kicker">Icelandic author</p>
        <h1 id="author-name" lang="is">Óskar<br>Magnússon</h1>
        <p class="intro">${escapeHtml(author.introduction)}</p>
        <a class="button" href="#books">Explore the books</a>
      </div>
      <figure class="hero-portrait">
        <img src="./assets/${escapeHtml(author.portrait)}" alt="Óskar Magnússon in a plaid shirt" width="995" height="820" fetchpriority="high">
      </figure>
    </section>
    <section class="wrap catalog-section" id="books" aria-labelledby="books-heading">
      <div class="section-heading">
        <h2 id="books-heading">Books</h2>
        <p>Novels and short story collections</p>
      </div>
      <div class="catalog-grid">${books.map(card).join('\n')}</div>
    </section>
    <div class="anthology-band">
      <section class="wrap catalog-section" id="anthologies" aria-labelledby="anthologies-heading">
        <div class="section-heading">
          <h2 id="anthologies-heading">Anthologies</h2>
          <p>Short fiction in English translation</p>
        </div>
        <div class="catalog-grid anthology-grid">${anthologies.map(card).join('\n')}</div>
      </section>
    </div>
    <section class="wrap about" id="about" aria-labelledby="about-heading">
      <h2 id="about-heading">About Óskar</h2>
      <div class="prose">
        ${author.biography.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('\n        ')}
        <a class="text-link" href="${escapeHtml(author.publisherProfile)}">Author profile at Forlagið</a>
      </div>
    </section>`
  });
}

export function detailPage(entry, catalog) {
  const root = '../../';
  const section = group(entry);
  const anthology = section === 'anthologies';
  const indexLabel = anthology ? 'All anthologies' : 'All books';
  const relatedLinks = (entry.related ?? []).map(({ slug, label }) => {
    const related = catalog.find((item) => item.slug === slug);
    return { label, url: root + entryPath(related) };
  });
  const links = [...(entry.links ?? []), ...relatedLinks];
  const review = entry.review;

  return page({
    pageTitle: `${entry.title} — ${author.name}`,
    description: entry.summary,
    root,
    active: section,
    body: `    <div class="wrap detail">
      <a class="back text-link" href="${root}#${section}">${indexLabel}</a>
      <article class="detail-grid">
        <div class="detail-copy">
          <p class="eyebrow detail-meta">${escapeHtml(entry.kind)} <span aria-hidden="true">·</span> ${escapeHtml(entry.edition)}</p>
          <h1>${title(entry)}</h1>
          ${entry.subtitle ? `<p class="detail-subtitle">${escapeHtml(entry.subtitle)}</p>` : ''}
          <p class="publisher">${escapeHtml(entry.publisher)}</p>
          <div class="prose synopsis">
            <h2>${anthology ? 'About the anthology' : 'About the book'}</h2>
            ${entry.description.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('\n            ')}
            ${links.length ? `<ul class="detail-links">${links.map(({ label, url }) => `<li><a class="text-link" href="${escapeHtml(url)}">${escapeHtml(label)}</a></li>`).join('')}</ul>` : ''}
          </div>
        </div>
        <div class="cover-stage detail-cover ${escapeHtml(entry.palette)}">${cover(entry, root, 'eager')}</div>
        ${entry.contents ? `<section class="contents" aria-labelledby="contents-heading">
          <h2 id="contents-heading">Contents</h2>
          <ol>${entry.contents.map((name) => `<li>${escapeHtml(name)}</li>`).join('')}</ol>
        </section>` : ''}
        ${review ? `<section class="review" aria-labelledby="review-heading">
          <h2 id="review-heading">${escapeHtml(review.heading)}</h2>
          <figure>
            <blockquote><p>“${escapeHtml(review.text)}”</p></blockquote>
            <figcaption>${escapeHtml(review.reviewer)}, <cite lang="is">${escapeHtml(review.publication)}</cite></figcaption>
          </figure>
        </section>` : ''}
      </article>
    </div>`
  });
}
