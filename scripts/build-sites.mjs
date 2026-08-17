import { mkdir, readdir, readFile, writeFile, copyFile } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';

const root = process.cwd();
const dist = join(root, 'dist');
const serverDir = join(dist, 'server');
const hostingDir = join(dist, '.openai');
const files = {};

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
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

await mkdir(serverDir, { recursive: true });
await mkdir(hostingDir, { recursive: true });
await collect(dist);
await copyFile(join(root, '.openai', 'hosting.json'), join(hostingDir, 'hosting.json'));

const worker = `const files = ${JSON.stringify(files)};\n\nfunction responseFor(pathname) {\n  const file = files[pathname] ?? files['/index.html'];\n  const bytes = Uint8Array.from(atob(file.body), (char) => char.charCodeAt(0));\n  return new Response(bytes, {\n    headers: {\n      'content-type': file.mime,\n      'cache-control': pathname.includes('/assets/') ? 'public, max-age=31536000, immutable' : 'public, max-age=60',\n    },\n  });\n}\n\nexport default {\n  fetch(request) {\n    const url = new URL(request.url);\n    return responseFor(url.pathname);\n  },\n};\n`;

await writeFile(join(serverDir, 'index.js'), worker);
