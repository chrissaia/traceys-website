import { mkdir, readdir, readFile, writeFile, copyFile } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';

const root = process.cwd();
const dist = join(root, 'dist');
const serverDir = join(dist, 'server');
const hostingDir = join(dist, '.openai');
const files = {};
const seoData = JSON.parse(await readFile(join(root, 'src', 'seo-data.json'), 'utf8'));

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
};

async function collect(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const absolute = join(dir, entry.name);
    if (absolute.startsWith(serverDir) || absolute.startsWith(hostingDir)) continue;
    if (entry.isDirectory()) {
      await collect(absolute);
      continue;
    }

    const urlPath = `/${relative(dist, absolute).split('/').join('/')}`;
    const content = await readFile(absolute);
    files[urlPath] = {
      mime: mimeTypes[extname(entry.name).toLowerCase()] ?? 'application/octet-stream',
      body: content.toString('base64'),
    };
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function canonicalFor(pathname) {
  return `${seoData.baseUrl}${pathname === '/' ? '' : pathname}`;
}

function breadcrumbFor(pathname) {
  const crumbs = [{ name: 'Home', item: seoData.baseUrl }];

  if (pathname === '/') return crumbs;

  if (pathname === '/services/corporate-workshops') {
    return [
      ...crumbs,
      { name: 'Services', item: canonicalFor('/services') },
      { name: 'Corporate Workshops', item: canonicalFor('/services/corporate-workshops') },
    ];
  }

  const names = {
    '/services': 'Services',
    '/expect': 'What to Expect',
    '/art-therapy': 'What Is Art Therapy?',
    '/about': 'About Tracey',
    '/rewired': 'Rewired',
    '/contact': 'Contact',
    '/testimonials': 'Testimonials',
  };

  return [...crumbs, { name: names[pathname] ?? seoData.siteName, item: canonicalFor(pathname) }];
}

function pageHeading(pathname) {
  const headings = {
    '/': 'Art therapy and psychotherapy in Morristown, NJ',
    '/services': 'Therapy services for adults, children, teens, couples, parents, and families',
    '/expect': 'What to expect when you work with Tracey',
    '/art-therapy': 'What is art therapy?',
    '/about': 'About Tracey E. Saia',
    '/rewired': 'Rewired: a 10-week journey for emotional regulation and lasting change',
    '/services/corporate-workshops': 'Corporate art therapy workshops for teams and leaders',
    '/contact': 'Contact Tracey E. Saia Art Therapy',
    '/testimonials': 'Testimonials',
  };

  return headings[pathname] ?? seoData.siteName;
}

function pageTopics(pathname) {
  const shared = ['Art therapy in Morristown, NJ', 'Psychotherapy', 'Creative reflection', 'Tracey E. Saia LPAT MS ATR-BC ATCS'];
  const topics = {
    '/': ['Adults', 'Children', 'Teens', 'Families', 'Couples', 'Groups', 'Anxiety support'],
    '/services': ['Adult therapy', 'Teen therapy', 'Child therapy', 'Family therapy', 'Couples therapy', 'Anxiety therapy'],
    '/expect': ['First therapy session', 'Art materials are optional', 'Therapy office in Morristown', 'Getting started'],
    '/art-therapy': ['Creative arts therapy', 'Art psychotherapy', 'Visual thinking', 'Body-based emotion', 'Expression beyond words'],
    '/about': ['Art psychotherapist', 'Clinical supervisor', 'Educator', 'Facilitator', 'Corporate workshops', 'Coloring book', 'Podcasts'],
    '/rewired': ['Emotional regulation', 'Mindset support', 'Values clarification', 'Coping skills', 'Mindfulness'],
    '/services/corporate-workshops': ['Corporate wellness', 'Leadership development', 'Emotional intelligence', 'Team workshops', 'Creative problem solving'],
    '/contact': ['Morristown therapy office', 'Schedule therapy', 'Ask about Rewired', 'Corporate workshop inquiries', 'Supervision inquiries'],
    '/testimonials': ['Therapy testimonials', 'Workshop reflections', 'Art therapy experience'],
  };

  return [...(topics[pathname] ?? []), ...shared];
}

function staticSeoContent(pathname, page) {
  const crumbs = breadcrumbFor(pathname)
    .map((crumb) => `<a href="${escapeHtml(new URL(crumb.item).pathname || '/')}">${escapeHtml(crumb.name)}</a>`)
    .join(' / ');
  const topics = pageTopics(pathname).map((topic) => `<li>${escapeHtml(topic)}</li>`).join('');
  const primaryLinks = [
    ['Therapy Services', '/services'],
    ['What Is Art Therapy?', '/art-therapy'],
    ['What to Expect', '/expect'],
    ['About Tracey', '/about'],
    ['Rewired Course', '/rewired'],
    ['Corporate Workshops', '/services/corporate-workshops'],
    ['Contact', '/contact'],
  ]
    .map(([label, href]) => `<a href="${href}">${label}</a>`)
    .join(' ');

  return `
      <article class="seo-fallback" aria-label="${escapeHtml(pageHeading(pathname))}">
        <nav aria-label="Breadcrumb">${crumbs}</nav>
        <h1>${escapeHtml(pageHeading(pathname))}</h1>
        <p>${escapeHtml(page.description)}</p>
        <p>Tracey E. Saia is an art psychotherapist, educator, supervisor, and facilitator serving Morristown, New Jersey and surrounding communities.</p>
        <ul>${topics}</ul>
        <p><strong>Address:</strong> 84 Maple Avenue, Morristown, NJ 07960</p>
        <p><strong>Email:</strong> <a href="mailto:tracey@traceyesaia.com">tracey@traceyesaia.com</a> <strong>Phone:</strong> <a href="tel:+19735322125">973-532-2125</a></p>
        <nav aria-label="Related pages">${primaryLinks}</nav>
      </article>
    `;
}

function jsonLdFor(pathname, page) {
  const graph = [
    {
      '@type': 'WebSite',
      '@id': `${seoData.baseUrl}/#website`,
      url: seoData.baseUrl,
      name: seoData.siteName,
      publisher: { '@id': `${seoData.baseUrl}/#business` },
      inLanguage: 'en-US',
    },
    {
      '@type': ['LocalBusiness', 'ProfessionalService'],
      '@id': `${seoData.baseUrl}/#business`,
      name: seoData.businessName,
      legalName: seoData.legalName,
      url: seoData.baseUrl,
      image: seoData.defaultImage,
      logo: seoData.logo,
      telephone: seoData.phone,
      email: seoData.email,
      priceRange: '$$',
      currenciesAccepted: 'USD',
      paymentAccepted: 'Cash, Check, Credit Card',
      address: {
        '@type': 'PostalAddress',
        ...seoData.address,
      },
      areaServed: [
        { '@type': 'City', name: 'Morristown' },
        { '@type': 'AdministrativeArea', name: 'New Jersey' },
      ],
      sameAs: seoData.sameAs,
      knowsAbout: [
        'Art therapy',
        'Art psychotherapy',
        'Anxiety',
        'Emotional regulation',
        'Trauma-informed therapy',
        'Creative arts therapy',
        'Clinical supervision',
        'Corporate wellness workshops',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: seoData.phone,
        email: seoData.email,
        contactType: 'appointments and inquiries',
        areaServed: 'US-NJ',
        availableLanguage: 'English',
      },
      founder: { '@id': `${seoData.baseUrl}/about#tracey-saia` },
      makesOffer: [
        { '@type': 'Offer', itemOffered: { '@id': `${seoData.baseUrl}/services#therapy-services` } },
        { '@type': 'Offer', itemOffered: { '@id': `${seoData.baseUrl}/art-therapy#art-therapy` } },
        { '@type': 'Offer', itemOffered: { '@id': `${seoData.baseUrl}/services/corporate-workshops#corporate-workshops` } },
        { '@type': 'Offer', itemOffered: { '@id': `${seoData.baseUrl}/rewired#rewired` } },
      ],
    },
    {
      '@type': 'Person',
      '@id': `${seoData.baseUrl}/about#tracey-saia`,
      name: 'Tracey E. Saia',
      jobTitle: 'Art Psychotherapist',
      image: `${seoData.baseUrl}/assets/tracey-headshot.webp`,
      worksFor: { '@id': `${seoData.baseUrl}/#business` },
      affiliation: [
        { '@type': 'Organization', name: 'American Art Therapy Association' },
        { '@type': 'Organization', name: 'New Jersey Art Therapy Association' },
        { '@type': 'Organization', name: 'Anxiety Institute' },
      ],
      knowsAbout: [
        'Art therapy',
        'Psychotherapy',
        'Creative reflection',
        'Body-based emotion',
        'Clinical supervision',
        'Corporate facilitation',
      ],
      sameAs: seoData.sameAs,
    },
    {
      '@type': 'WebPage',
      '@id': `${canonicalFor(pathname)}#webpage`,
      url: canonicalFor(pathname),
      name: page.title,
      description: page.description,
      isPartOf: { '@id': `${seoData.baseUrl}/#website` },
      about: { '@id': `${seoData.baseUrl}/#business` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${canonicalFor(pathname)}#breadcrumb`,
      itemListElement: breadcrumbFor(pathname).map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.item,
      })),
    },
  ];

  const services = [
    {
      '@type': 'Service',
      '@id': `${seoData.baseUrl}/services#therapy-services`,
      name: 'Therapy and Psychotherapy Services',
      provider: { '@id': `${seoData.baseUrl}/#business` },
      areaServed: 'Morristown, NJ',
      serviceType: 'Art therapy, psychotherapy, family therapy, teen therapy, child therapy, and couples therapy',
    },
    {
      '@type': 'Service',
      '@id': `${seoData.baseUrl}/art-therapy#art-therapy`,
      name: 'Art Therapy',
      provider: { '@id': `${seoData.baseUrl}/#business` },
      areaServed: 'Morristown, NJ',
      serviceType: 'Art therapy and art psychotherapy',
    },
    {
      '@type': 'Service',
      '@id': `${seoData.baseUrl}/services/corporate-workshops#corporate-workshops`,
      name: 'Corporate Art Therapy Workshops',
      provider: { '@id': `${seoData.baseUrl}/#business` },
      areaServed: 'New Jersey and virtual programs',
      serviceType: 'Corporate wellness, leadership, emotional intelligence, and creative team workshops',
    },
  ];

  if (pathname === '/services' || pathname === '/art-therapy' || pathname === '/services/corporate-workshops') {
    graph.push(...services.filter((service) => service['@id'].startsWith(canonicalFor(pathname))));
  }

  if (pathname === '/rewired') {
    graph.push({
      '@type': 'Course',
      '@id': `${seoData.baseUrl}/rewired#course`,
      name: 'Rewired: A 10-Week Journey to Transform Your Mindset and Create Lasting Change',
      description: page.description,
      provider: { '@id': `${seoData.baseUrl}/#business` },
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'online',
        instructor: { '@id': `${seoData.baseUrl}/about#tracey-saia` },
      },
    });
  }

  if (pathname === '/art-therapy') {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${seoData.baseUrl}/art-therapy#faq`,
      mainEntity: [
        ['Do I have to make art?', 'No. Art materials may help, but not every session needs to involve art.'],
        ['What if I am not creative?', 'You do not need artistic skill. The process is about expression, noticing, and meaning.'],
        ['Is art therapy just for children?', 'No. Adults, teens, children, families, and groups can all benefit from visual thinking.'],
      ].map(([name, text]) => ({
        '@type': 'Question',
        name,
        acceptedAnswer: { '@type': 'Answer', text },
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

function replaceOrInsert(html, pattern, replacement) {
  return pattern.test(html) ? html.replace(pattern, replacement) : html.replace('</head>', `    ${replacement}\n  </head>`);
}

function injectSeo(html, pathname, page) {
  const canonical = canonicalFor(pathname);
  const tags = [
    ['meta[name="description"]', /<meta\s+name="description"[\s\S]*?\/>/, `<meta name="description" content="${escapeHtml(page.description)}" />`],
    ['meta[name="keywords"]', /<meta\s+name="keywords"[\s\S]*?\/>/, `<meta name="keywords" content="${escapeHtml(page.keywords)}" />`],
    ['meta[name="author"]', /<meta\s+name="author"[\s\S]*?\/>/, '<meta name="author" content="Tracey E. Saia" />'],
    ['meta[name="robots"]', /<meta\s+name="robots"[\s\S]*?\/>/, '<meta name="robots" content="index, follow, max-image-preview:large" />'],
    ['meta[name="googlebot"]', /<meta\s+name="googlebot"[\s\S]*?\/>/, '<meta name="googlebot" content="index, follow, max-image-preview:large" />'],
    ['link[rel="canonical"]', /<link\s+rel="canonical"[\s\S]*?\/>/, `<link rel="canonical" href="${escapeHtml(canonical)}" />`],
    ['meta[property="og:title"]', /<meta\s+property="og:title"[\s\S]*?\/>/, `<meta property="og:title" content="${escapeHtml(page.title)}" />`],
    ['meta[property="og:description"]', /<meta\s+property="og:description"[\s\S]*?\/>/, `<meta property="og:description" content="${escapeHtml(page.description)}" />`],
    ['meta[property="og:url"]', /<meta\s+property="og:url"[\s\S]*?\/>/, `<meta property="og:url" content="${escapeHtml(canonical)}" />`],
    ['meta[property="og:image"]', /<meta\s+property="og:image"[\s\S]*?\/>/, `<meta property="og:image" content="${escapeHtml(seoData.defaultImage)}" />`],
    ['meta[property="og:image:width"]', /<meta\s+property="og:image:width"[\s\S]*?\/>/, '<meta property="og:image:width" content="1200" />'],
    ['meta[property="og:image:height"]', /<meta\s+property="og:image:height"[\s\S]*?\/>/, '<meta property="og:image:height" content="630" />'],
    ['meta[name="twitter:title"]', /<meta\s+name="twitter:title"[\s\S]*?\/>/, `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`],
    ['meta[name="twitter:description"]', /<meta\s+name="twitter:description"[\s\S]*?\/>/, `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`],
    ['meta[name="twitter:image"]', /<meta\s+name="twitter:image"[\s\S]*?\/>/, `<meta name="twitter:image" content="${escapeHtml(seoData.defaultImage)}" />`],
  ];

  let output = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`);
  tags.forEach(([, pattern, replacement]) => {
    output = replaceOrInsert(output, pattern, replacement);
  });

  const json = JSON.stringify(jsonLdFor(pathname, page)).replaceAll('</script', '<\\/script');
  output = output.replace('<div id="root"></div>', `<div id="root">${staticSeoContent(pathname, page)}</div>`);
  output = output.replace(
    '</head>',
    `    <script type="application/ld+json" id="structured-data">${json}</script>\n  </head>`,
  );

  return output;
}

await mkdir(serverDir, { recursive: true });
await mkdir(hostingDir, { recursive: true });
await collect(dist);
await copyFile(join(root, '.openai', 'hosting.json'), join(hostingDir, 'hosting.json'));

const indexHtml = await readFile(join(dist, 'index.html'), 'utf8');
Object.entries(seoData.pages).forEach(([pathname, page]) => {
  const seoHtml = injectSeo(indexHtml, pathname, page);
  files[pathname === '/' ? '/index.html' : pathname] = {
    mime: 'text/html; charset=utf-8',
    body: Buffer.from(seoHtml).toString('base64'),
  };
});

Object.entries(seoData.aliases).forEach(([alias, target]) => {
  const page = seoData.pages[target] ?? seoData.pages['/'];
  const seoHtml = injectSeo(indexHtml, target, page);
  files[alias] = {
    mime: 'text/html; charset=utf-8',
    body: Buffer.from(seoHtml).toString('base64'),
  };
});

const worker = `const files = ${JSON.stringify(files)};\n\nfunction responseFor(pathname) {\n  const file = files[pathname] ?? files['/index.html'];\n  const bytes = Uint8Array.from(atob(file.body), (char) => char.charCodeAt(0));\n  return new Response(bytes, {\n    headers: {\n      'content-type': file.mime,\n      'cache-control': pathname.includes('/assets/') ? 'public, max-age=31536000, immutable' : 'public, max-age=60',\n    },\n  });\n}\n\nexport default {\n  fetch(request) {\n    const url = new URL(request.url);\n    return responseFor(url.pathname);\n  },\n};\n`;

await writeFile(join(serverDir, 'index.js'), worker);
