import {readdir,readFile,writeFile,copyFile} from 'node:fs/promises';
import path from 'node:path';
// Public data and legacy media references are root-relative in the local concept.
// Scope only those known directories to the GitHub Pages project path.
const base=process.argv[2];
if(!/^\/[a-z0-9-]+\/$/.test(base||''))throw new Error('Expected /repository-name/');
async function visit(dir){for(const item of await readdir(dir,{withFileTypes:true})){const file=path.join(dir,item.name);if(item.isDirectory())await visit(file);else if(/\.(js|css|json|html)$/.test(file)){const original=await readFile(file,'utf8');const updated=original.replace(/(["'`(])\/(assets\/|fonts\/|docs\/|site-data(?:\.en)?\.json)/g,(_,quote,resource)=>quote+base+resource);if(original!==updated)await writeFile(file,updated);}}}
await visit('dist');
await copyFile('dist/index.html','dist/404.html');
await writeFile('dist/.nojekyll','');
