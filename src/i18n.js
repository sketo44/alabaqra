import translations from './translations.json';
export const basePath=import.meta.env.BASE_URL.replace(/\/$/,'');
export const appPath=location.pathname.startsWith(basePath+'/')?location.pathname.slice(basePath.length):location.pathname;

const requested=new URLSearchParams(location.search).get('lang');
let saved;
try{saved=localStorage.getItem('alabaqra-language')}catch{}
export const lang=['ar','en'].includes(requested)?requested:(saved==='en'?'en':'ar');
try{localStorage.setItem('alabaqra-language',lang)}catch{}
// The font laboratory demonstrates Arabic specimens in its original direction.
const laboratory=appPath==='/design-system';
document.documentElement.lang=laboratory?'ar':lang;
// User-approved layout stays in the same positions in both languages.
// Language changes the copy and pronunciation, not the page's layout direction.
document.documentElement.dir='rtl';
if(!laboratory&&lang==='en')document.querySelector('meta[name="description"]')?.setAttribute('content','An unofficial Alabaqra website concept: contracting, operations, maintenance and cleaning.');
export const t=text=>lang==='en'?(translations[text]??text):text;
export function localHref(path,target=lang){
  const url=new URL(path,location.origin);
  url.searchParams.set('lang',target);
  return (basePath&&!url.pathname.startsWith(basePath+'/')?basePath:'')+url.pathname+url.search+url.hash;
}
export const languageHref=()=>localHref(location.pathname+location.search+location.hash,lang==='ar'?'en':'ar');
