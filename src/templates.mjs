import { author } from './author.mjs';

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function passageParagraph(text) {
  return `<p>${escapeHtml(text).replace(/\*([^*]+)\*/g, '<em>$1</em>')}</p>`;
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

function portrait(root) {
  return `<img src="${root}assets/${escapeHtml(author.portrait)}" alt="${escapeHtml(author.name)} in a plaid shirt" width="995" height="820" fetchpriority="high">`;
}

function page({ pageTitle, description, root, body, active }) {
  const home = root === './' ? '' : root;
  const menu = [
    ['books', 'Books', `${home}#books`],
    ['anthologies', 'Anthologies', `${home}#anthologies`],
    ['about', 'About', `${root}about/`],
    ['contact', 'Contact', `${home}#contact`]
  ];
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
        ${menu.map(([id, label, href]) => `<a href="${href}"${active === id ? ' class="current"' : ''}${active === 'about' && id === 'about' ? ' aria-current="page"' : ''}>${label}</a>`).join('\n        ')}
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
        ${portrait('./')}
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
        ${author.shortBiography.map(passageParagraph).join('\n        ')}
        <a class="text-link" href="./about/">Read the full bio</a>
      </div>
    </section>`
  });
}

export function bioPage() {
  const root = '../';
  return page({
    pageTitle: `Full bio — ${author.name}`,
    description: 'The biography of Icelandic author Óskar Magnússon, from the fishing trawlers of his youth to his work in journalism, law and fiction.',
    root,
    active: 'about',
    body: `    <article class="wrap biography">
      <header class="biography-heading">
        <p class="eyebrow">Full bio</p>
        <h1 lang="is">${escapeHtml(author.name)}</h1>
      </header>
      <figure class="biography-portrait">
        ${portrait(root)}
      </figure>
      <div class="prose biography-copy">
        ${author.biography.map(passageParagraph).join('\n        ')}
        <a class="text-link" href="${escapeHtml(author.publisherProfile)}">Author profile at Forlagið</a>
      </div>
    </article>`
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
  const reading = entry.reading;
  const contents = (entry.contents ?? []).map((item) => {
    if (typeof item === 'string') return `<li>${escapeHtml(item)}</li>`;
    const story = catalog.find(({ slug }) => slug === item.slug);
    return `<li>${escapeHtml(item.title)} (<a class="text-link" href="${root}${entryPath(story)}#reading">${escapeHtml(item.label)}</a>)</li>`;
  });

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
            <h2>${escapeHtml(entry.descriptionHeading ?? (anthology ? 'About the anthology' : 'About the book'))}</h2>
            ${entry.description.map(passageParagraph).join('\n            ')}
            ${entry.icelandicPassage ? `<h3 class="original-heading">Icelandic</h3>
            <div lang="is">${entry.icelandicPassage.map(passageParagraph).join('\n            ')}</div>` : ''}
            ${reading ? `<a class="button" href="#reading">${escapeHtml(reading.linkLabel ?? `Read ${reading.title}`)}</a>` : ''}
            ${links.length ? `<ul class="detail-links">${links.map(({ label, url }) => `<li><a class="text-link" href="${escapeHtml(url)}">${escapeHtml(label)}</a></li>`).join('')}</ul>` : ''}
          </div>
        </div>
        <div class="cover-stage detail-cover ${escapeHtml(entry.palette)}">${cover(entry, root, 'eager')}</div>
        ${contents.length ? `<section class="contents" aria-labelledby="contents-heading">
          <h2 id="contents-heading">Contents</h2>
          <ol>${contents.join('')}</ol>
        </section>` : ''}
        ${entry.plot ? `<section class="plot-section" aria-labelledby="plot-heading">
          <h2 id="plot-heading">Plot outline</h2>
          <details class="plot-details">
            <summary>Spoiler alert · Show plot outline</summary>
            <div class="prose">
              ${entry.plot.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('\n              ')}
            </div>
          </details>
        </section>` : ''}
        ${reading ? `<section class="reading-section" id="reading" aria-labelledby="reading-heading">
          <div class="reading-text">
            <h2 id="reading-heading">${escapeHtml(reading.title)}</h2>
            ${reading.context ? `<p class="reading-context">${escapeHtml(reading.context)}</p>` : ''}
            ${reading.translator ? `<p class="reading-credit">By <span lang="is">${escapeHtml(author.name)}</span> · Translated by ${escapeHtml(reading.translator)}</p>` : ''}
            ${reading.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('\n            ')}
          </div>
        </section>` : ''}
        ${review ? `<section class="review" aria-labelledby="review-heading">
          <h2 id="review-heading">${escapeHtml(review.heading)}</h2>
          ${review.quotes.map((quote) => `<figure>
            <blockquote lang="${escapeHtml(quote.language)}"><p><q>${escapeHtml(quote.text)}</q></p></blockquote>
            <figcaption>${escapeHtml(quote.reviewer)}${quote.publication ? `, <cite lang="is">${escapeHtml(quote.publication)}</cite>` : ''}</figcaption>
          </figure>`).join('\n          ')}
        </section>` : ''}
      </article>
    </div>`
  });
}
