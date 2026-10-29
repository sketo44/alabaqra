import catalog from './font-catalog.json';
export {catalog};
const pending=new Map();
export function fontFile(family,weight=400){
  const row=catalog.find(x=>x.family===family);
  return row.fonts.find(f=>f.weight.includes(' ')&&weight>=Number(f.weight.split(' ')[0])&&weight<=Number(f.weight.split(' ')[1]))||row.fonts.find(f=>Number(f.weight)===weight)||[...row.fonts].sort((a,b)=>Math.abs(Number(a.weight)-weight)-Math.abs(Number(b.weight)-weight))[0];
}
export function loadFamily(family,weights=[400,600]){
  return Promise.all([...new Set(weights.map(w=>fontFile(family,w)))].map(file=>{
    const key=family+file.file;
    if(!pending.has(key)) pending.set(key,(async()=>{const face=new FontFace(family,`url("${file.file}")`,{weight:file.weight,style:'normal',display:'swap'});await face.load();document.fonts.add(face);return face})());
    return pending.get(key);
  }));
}
export const pairings=[
  {id:'corporate',label:'مؤسسي موحد — المقترح',heading:'IBM Plex Sans Arabic',body:'IBM Plex Sans Arabic',headingWeight:600,headingLeading:'1.65',bodySize:'1rem',leading:'1.85',note:'عائلة واحدة بنسقين؛ أقل تكلفة تحميل وتوازن واضح بين العناوين والنصوص.'},
  {id:'kufi',label:'مؤسسي كوفي',heading:'Noto Kufi Arabic',body:'IBM Plex Sans Arabic',headingWeight:600,headingLeading:'1.75',bodySize:'1rem',leading:'1.95',note:'عناوين كوفية منظمة مع جسم أكثر انسيابًا؛ مناسب لهوية المرافق.'},
  {id:'service',label:'خدمي خفيف',heading:'Tajawal',body:'Almarai',headingWeight:700,headingLeading:'1.7',bodySize:'1.0625rem',leading:'1.85',note:'عناوين هندسية ونصوص مبسطة؛ وزن 700 لأن Tajawal لا يتيح وزن 600 ثابتًا.'},
  {id:'editorial',label:'تحريري — للمقالات',heading:'El Messiri',body:'Amiri',headingWeight:600,headingLeading:'1.8',bodySize:'1.25rem',leading:'2.1',note:'للمقالات والاقتباسات. يحتاج جسمًا أكبر وتباعد أسطر أوسع؛ ليس بديلًا تلقائيًا لهوية الشركة.'},
];
export const sample='نُشَغِّلُ المَرَافِقَ، وَنَصُونُ المَبَانِي. جودةٌ، مسؤوليةٌ، وبيئةٌ أنظف. أ إ آ ء ؤ ئ ى ة لا لإ لآ ٠١٢٣٤٥٦٧٨٩';
export const formatNumber=new Intl.NumberFormat('ar-SA-u-nu-arab').format;

