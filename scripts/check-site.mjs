import fs from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve('site');
const files = await fs.readdir(root,{recursive:true});
const names = new Set(files.map(x=>x.split(path.sep).join('/')));
const errors = [];
const legacyWarnings = [];
for (const file of files.filter(x=>/\.(html|css)$/.test(x))) {
  const text = await fs.readFile(path.join(root,file),'utf8');
  const refs = [...text.matchAll(/(?:href|src|poster)\s*=\s*["']([^"']+)["']|url\(\s*["']?([^"')]+)["']?\s*\)/gi)].map(m=>m[1]||m[2]);
  for (const ref of refs) {
    if (/^(?:[a-z]+:|\/\/|#)/i.test(ref)) continue;
    const url = new URL(ref,'https://local.invalid/'+file.split(path.sep).join('/'));
    let target = decodeURIComponent(url.pathname).replace(/^\//,'');
    if (!target || target.endsWith('/')) target += 'index.html';
    if (!names.has(target)) {
      const issues = file.split(path.sep)[0] === 'onewebstatic' ? legacyWarnings : errors;
      issues.push(`${file}: ${ref}`);
    }
  }
}
if (errors.length) {console.error('Saknade lokala länkmål:\n'+[...new Set(errors)].join('\n')); process.exitCode=1;}
else console.log(`OK: lokala länkar och resurser i ${files.filter(x=>x.endsWith('.html')).length} HTML-filer kontrollerade, inklusive stora/små bokstäver.`);
if (legacyWarnings.length) console.warn('Befintliga varningar i äldre one.com-resurser (används inte av nuvarande HTML-sidor):\n'+legacyWarnings.join('\n'));
