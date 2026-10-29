import fs from 'node:fs';
const root=new URL('../',import.meta.url);
const input=new URL('src/design-system/tokens.json',root);
const tokens=JSON.parse(fs.readFileSync(input,'utf8').replace(/^\uFEFF/,''));
const kebab=s=>s.replace(/[A-Z]/g,c=>'-'+c.toLowerCase());
const css='/* Generated from tokens.json. Run npm run tokens after editing. */\n:root {\n'+Object.entries(tokens).flatMap(([group,values])=>Object.entries(values).map(([key,value])=>`  --${group}-${kebab(key)}: ${value};`)).join('\n')+'\n}\n';
fs.writeFileSync(new URL('src/design-system/tokens.css',root),css);
fs.writeFileSync(new URL('design-tokens.json',root),JSON.stringify(tokens,null,2));
console.log('Generated tokens.css and design-tokens.json');

fs.mkdirSync(new URL('public/docs/',root),{recursive:true});
for(const [src,dst]of [['DESIGN.md','DESIGN.md'],['docs/ARABIC-FONTS.md','ARABIC-FONTS.md']])fs.copyFileSync(new URL(src,root),new URL('public/docs/'+dst,root));
