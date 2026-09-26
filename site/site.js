// All funktionalitet är lokal. Inga analysanrop eller lagring av besökarval.
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
if (toggle && nav) {
  toggle.hidden = false;
  document.documentElement.classList.add('js');
  const close = () => { toggle.setAttribute('aria-expanded','false'); nav.classList.remove('is-open'); };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded',String(open)); nav.classList.toggle('is-open',open);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {close();toggle.focus();}
  });
  document.addEventListener('click', event => {if (!event.target.closest('.site-header')) close();});
  nav.addEventListener('click', event => {if (event.target.closest('a')) close();});
  matchMedia('(min-width: 761px)').addEventListener('change', close);
}
// Städa bort åtkomliga kakor från webbplatsens tidigare Google Analytics.
const oldAnalytics = document.cookie.split(';').map(part=>part.trim().split('=')[0]).filter(name=>/^(_ga(?:_|$)|_gid$|_gat(?:_|$))/.test(name));
const domains = [null, location.hostname, '.'+location.hostname, '.hovgardensbygg.se'];
const paths = ['/', '/Tjanster', '/Tjanster/'];
for (const name of oldAnalytics) for (const domain of domains) for (const path of paths) {
  document.cookie = `${name}=; Max-Age=0; Path=${path}; SameSite=Lax${domain?`; Domain=${domain}`:''}${location.protocol==='https:'?'; Secure':''}`;
}
