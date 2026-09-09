// Reproducible display derivatives. Original evidence files are never modified.
import { readdir, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? walk(path.join(dir, entry.name)) : path.join(dir, entry.name)))).flat();
}
const manifest = {};
for (const file of (await walk('public/images')).filter(file => file.endsWith('.png'))) {
  const metadata = await sharp(file).metadata();
  const variants = [];
  for (const width of [640, 1280].filter(width => width <= metadata.width)) {
    const target = file.replace('public/images/', 'public/images/optimized/').replace('.png', `-${width}.webp`);
    await mkdir(path.dirname(target), { recursive: true });
    await sharp(file).resize({ width }).webp({ quality: 88, effort: 6 }).toFile(target);
    variants.push({ width, src: target.replace('public', '') });
  }
  manifest[file.replace('public', '')] = { width: metadata.width, height: metadata.height, variants };
}
await writeFile('src/content/image-manifest.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(`Generated display variants for ${Object.keys(manifest).length} original images.`);
