import fs from 'node:fs';
const root=new URL('../',import.meta.url);
const tokens=JSON.parse(fs.readFileSync(new URL('src/design-system/tokens.json',root),'utf8'));
const generated=fs.readFileSync(new URL('src/design-system/tokens.css',root),'utf8');
const system=['system.css','quality.css'].map(file=>fs.readFileSync(new URL('src/design-system/'+file,root),'utf8')).join('\n');
const problems=[];
for(const[group,values]of Object.entries(tokens)) for(const[key,value]of Object.entries(values)){
  const name=key.replace(/[A-Z]/g,c=>'-'+c.toLowerCase());
  if(!generated.includes(`--${group}-${name}: ${value};`))problems.push(`Generated token drift: ${group}.${key}`);
}
if(/#[0-9a-f]{3,8}\b|\brgba?\(/i.test(system))problems.push('Raw color in shared system CSS');
if(/(?:margin|padding|inset|border)-(?:left|right)|(?:^|[;{])\s*(?:left|right)\s*:/m.test(system))problems.push('Physical directional property in shared CSS');
if(/font-size:\s*(?!var\()[^;}]+/m.test(system))problems.push('Font size outside token scale');
if(!system.includes(`@media(max-width:${tokens.breakpoint.mobile})`)||!system.includes(`@media(max-width:${tokens.breakpoint.tablet})`))problems.push('Breakpoint values drifted');
if(problems.length){console.error(problems.join('\n'));process.exit(1)}
console.log('PASS: generated tokens, shared palette, typography scale, logical properties, breakpoint contract');
