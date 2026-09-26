import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';

const files = (await fs.readdir('site',{recursive:true})).filter(p=>p.endsWith('.html')&&!p.startsWith('oneweb'));
test('Alla innehållssidor laddar enbart egna resurser', async () => {
  for (const file of files) {
    const html = await fs.readFile('site/'+file,'utf8');
    for (const tag of html.matchAll(/<(?:script|img|iframe|link|source|video|audio|object|embed)\b[^>]*>/gi)) {
      if (/rel="canonical"/.test(tag[0])) continue;
      for (const attr of tag[0].matchAll(/(?:src|href|data)="([^"]+)"/g)) {
        assert.ok(attr[1].startsWith('/'),'Extern resurs i '+file+': '+attr[1]);
      }
    }
    assert.doesNotMatch(html, /<iframe\b|googletagmanager|google-analytics|fontawesome|fonts\.googleapis|swiper/);
    if (file !== 'google14b43b7a32898a5a.html') assert.match(html,/href="\/integritet.html"/);
  }
  const css=await fs.readFile('site/styles1.0.css','utf8');
  assert.doesNotMatch(css, /@import|https?:\/\//);
  const js=await fs.readFile('site/site.js','utf8');
  assert.doesNotMatch(js, /\bfetch\s*\(|XMLHttpRequest|sendBeacon|localStorage|sessionStorage/);
});
test('Tidigare analyskakor raderas, andra kakor lämnas orörda', async () => {
  const writes=[];
  const document={querySelector:()=>null};
  Object.defineProperty(document,'cookie',{get:()=> '_ga=test; _ga_6M7FV9DL6S=test; _gid=test; session=keep',set:value=>writes.push(value)});
  vm.runInNewContext(await fs.readFile('site/site.js','utf8'),{document,location:{hostname:'hovgardensbygg.se',protocol:'https:'}});
  assert.ok(writes.length>0);
  for(const value of writes) {assert.match(value,/Max-Age=0/);assert.match(value,/; Secure/);assert.doesNotMatch(value,/session=/);}
  for(const name of ['_ga','_ga_6M7FV9DL6S','_gid']) assert.ok(writes.some(x=>x.startsWith(name+'=;')&&x.includes('Path=/;')&&x.includes('Domain=.hovgardensbygg.se')));
});
test('Nya besök får inga kakor och formuläret skickas endast vid inskickning', async () => {
  const document={querySelector:()=>null};
  Object.defineProperty(document,'cookie',{get:()=>'',set:()=>assert.fail('Ingen kaka ska skapas')});
  vm.runInNewContext(await fs.readFile('site/site.js','utf8'),{document,location:{hostname:'hovgardensbygg.se',protocol:'https:'}});
  const html=await fs.readFile('site/Kontakt.html','utf8');
  assert.match(html,/<form action="https:\/\/formspree.io\/f\/myzeyage" method="POST">/);
  for (const id of ['name','email','message']) {assert.match(html,new RegExp('for="'+id+'"'));assert.match(html,new RegExp('id="'+id+'"'));}
  assert.match(html,/Läs om personuppgifter/);
});
