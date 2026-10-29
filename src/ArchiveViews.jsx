import React,{useState} from 'react';
import {lang,t,localHref} from './i18n';
import {BrandButton,Icon} from './design-system/components';
import EngineeringBackdrop from './design-system/EngineeringBackdrop';

export const copy=(ar,en)=>lang==='en'?en:ar;
const number=n=>new Intl.NumberFormat(lang==='ar'?'ar-SA':'en').format(n);
const flatten=s=>s.replace(/\u00a0/g,' ').replace(/\s+/g,' ').trim();
const short=(s,n=130)=>s.length>n?s.slice(0,n).replace(/\s+\S*$/,'')+'…':s;

export function ArchiveSurface({children}){return <div className="archive-surface"><EngineeringBackdrop/><div className="archive-surface-content">{children}</div></div>}

export function ProjectArchive({selected,cat,filter,onFilter,source}){
 const initial=Number(new URLSearchParams(location.search).get('count'));
 const [count,setCount]=useState(Number.isFinite(initial)&&initial>=12?Math.min(initial,500):12);
 const labels={building:t('مقاولات وإنشاءات'),cleaning:t('نظافة وصيانة'),maintenance:t('تشغيل وصيانة')};
 const change=v=>{setCount(12);onFilter(v)};
 return <><div className="filters" aria-label={t('تصفية المشاريع')}>{[['all',t('كل الأعمال')],['cleaning',t('النظافة')],['maintenance',t('التشغيل والصيانة')],['building',t('المقاولات')]].map(([v,label])=><BrandButton key={v} variant="secondary" aria-pressed={filter===v} onClick={()=>change(v)}>{label}</BrandButton>)}</div>
 <p role="status" className="result">{copy('عرض','Showing')} {number(Math.min(count,selected.length))} {copy('من','of')} {number(selected.length)} {copy('سجلًا تاريخيًا','historical records')}</p>
 <div className="project-list" id="project-results">{selected.slice(0,count).map((text,i)=><article className="project-record" key={text}><div className="project-record-top"><span className="category">{labels[cat(text)]}</span><span className="project-number">{number(i+1)}</span></div><h2>{short(flatten(text),100)}</h2><details><summary>{copy('تفاصيل السجل','Record details')}</summary><p className="record-full-text">{flatten(text)}</p><a href={source} className="source-link" target="_blank" rel="noreferrer">{t('سجل الإنجازات في المصدر ')}<Icon name="external"/></a></details></article>)}</div>
 {count<selected.length&&<div className="load-more"><BrandButton aria-controls="project-results" onClick={()=>{const next=count+12;setCount(next);const url=new URL(location.href);url.searchParams.set('count',String(next));history.replaceState({},'',url.pathname+url.search)}}>{copy('عرض المزيد من الأعمال','Show more work')}<Icon name="arrow"/></BrandButton></div>}</>
}

export function NewsGrid({items,pageLink,body,headingLevel=2}){
 const initial=Number(new URLSearchParams(location.search).get('newsCount'));
 const [count,setCount]=useState(headingLevel===2?Math.max(6,Math.min(initial||6,100)):items.length);
 const Heading='h'+headingLevel;
 return <><div className="news-grid news-grid--refined" id={headingLevel===2?'news-results':undefined}>{items.slice(0,count).map(p=>{
 const date=p.text.match(/\d{2}-\d{2}-\d{4}/)?.[0];
 const excerpt=flatten(body(p).replace(/^.*(?:كتب فى|Published:).*$/gm,'').replace(/https?:\/\/\S+/g,''));
 return <a className="news-card" key={p.url} href={pageLink(p)}>{p.images[0]?<div className="news-card-media"><img src={p.images[0]} alt={p.title} width="700" height="450" loading="lazy"/></div>:<div className="news-card-heading"><img src="/assets/_images_logo.png" alt="" width="350" height="100" loading="lazy"/><span>{copy('من أرشيف الشركة','Company archive')}</span></div>}
 {date&&<time className="news-date" dateTime={date.split('-').reverse().join('-')}><bdi dir="ltr">{date}</bdi></time>}<Heading>{p.title}</Heading>{excerpt&&<p>{short(excerpt,145)}</p>}<span className="news-read">{t('قراءة الخبر ')}<Icon name="external"/></span></a>
 })}</div>{count<items.length&&<div className="load-more"><BrandButton aria-controls="news-results" onClick={()=>{const next=count+6;setCount(next);const url=new URL(location.href);url.searchParams.set('newsCount',String(next));history.replaceState({},'',url.pathname+url.search)}}>{copy('عرض أخبار أكثر','Show more news')}<Icon name="arrow"/></BrandButton></div>}</>
}

export function GalleryArchive({images,pages,homepageGallery,filterable=true}){
 const query=new URLSearchParams(location.search);const [filter,setFilter]=useState(filterable&&['all','community','news','documents'].includes(query.get('type'))?query.get('type'):'all');const [count,setCount]=useState(12);
 const category=u=>pages.some(p=>p.url.includes('/contents/show/')&&p.images.includes(u))?'news':homepageGallery.includes(u)?'community':'documents';
 const labels={community:copy('تكريمات ومشاركات','Recognition & participation'),news:copy('صور الأخبار','News images'),documents:copy('مواد الشركة','Company materials')};
 const filtered=images.filter(u=>filter==='all'||category(u)===filter);
 return <>{filterable&&<div className="filters gallery-filters" aria-label={copy('تصنيف الصور','Image categories')}>{[['all',copy('جميع الصور','All images')],...Object.entries(labels)].map(([v,label])=><BrandButton key={v} variant="secondary" aria-pressed={filter===v} onClick={()=>{setFilter(v);setCount(12);const url=new URL(location.href);url.searchParams.set('type',v);history.replaceState({},'',url.pathname+url.search)}}>{label}</BrandButton>)}</div>}<p role="status" className="result">{number(Math.min(count,filtered.length))} / {number(filtered.length)}</p><div className="gallery" id="gallery-results">{filtered.slice(0,count).map((u,i)=><a href={u} key={u} target="_blank" rel="noreferrer"><img src={u} width="900" height="650" loading={i<3?'eager':'lazy'} alt={labels[category(u)]+' '+number(i+1)}/><span>{labels[category(u)]}<Icon name="external"/></span></a>)}</div>{count<filtered.length&&<div className="load-more"><BrandButton aria-controls="gallery-results" onClick={()=>setCount(count+12)}>{copy('عرض صور أكثر','Show more images')}<Icon name="arrow"/></BrandButton></div>}</>
}

export function SourceDocument({page,body,hideTitle=false}){
 const raw=body(page).replace(/\u00a0/g,' ');
 const text=page.url.includes('/pages/show/')&&!page.url.includes('/pages/show/5/')&&!page.url.includes('/pages/show/8/')?raw.split(/\n\s*·\s*\n/).map(flatten).join('\n\n• '):raw;
 const profile=page.url.includes('/pages/show/5/');
 const separator=lang==='en'?'Company name:':'اسم الشركة';
 const split=text.indexOf(separator);let intro=text,fields=[];
 if(profile&&split>=0){intro=text.slice(0,split);const lines=text.slice(split).split('\n').map(s=>s.trim()).filter(Boolean);let current;
  for(const line of lines){if(/[:：]$/.test(line)||/^(التلفونات|الفاكسات|البريد الإليكتروني)$/.test(line)){current={label:line.replace(/[:：]$/,''),value:[]};fields.push(current)}else if(current)current.value.push(line)}
 }
 return <article className="document source-document">{!hideTitle&&<h2>{page.title}</h2>}<div className="original-text">{intro.replace(/\n(?=[^\n])/g,profile?' ':'\n')}</div>{fields.length>0&&<dl className="profile-fields">{fields.map((f,i)=><div key={i}><dt>{f.label}</dt><dd>{f.value.join(' ')}</dd></div>)}</dl>}{page.images.length>0&&<div className="photos">{page.images.map(u=><a key={u} href={u} target="_blank" rel="noreferrer"><img src={u} width="900" height="600" loading="lazy" alt={t('صورة منشورة ضمن ')+page.title}/></a>)}</div>}<a className="source-link" href={page.url} target="_blank" rel="noreferrer">{t('المصدر في الموقع الأصلي ')}<Icon name="external"/></a></article>
}

export function SiteContact({pages,pageLink,origin}){
 return <><section id="contact" className="contact"><div className="wrap"><div className="contact-inner"><div><img className="footer-logo" src="/assets/_images_wlogo.png" width="350" height="100" alt={t('العباقرة للتجارة والمقاولات')}/><h2>{t('اتصل بنا')}</h2><p>{t('القصيم — بريدة — طريق المعارض')}<br/>{t('حي الرحاب بالراشديات')}</p></div><div><a href="tel:920009995"><bdi dir="ltr">920009995</bdi></a><a href="tel:0163836446"><bdi dir="ltr">016 383 6446</bdi></a><a href="tel:0163812722"><bdi dir="ltr">016 381 2722</bdi></a><a href="mailto:alabaqra@alabaqra.sa"><bdi dir="ltr">alabaqra@alabaqra.sa</bdi></a><a href="mailto:alabaqra@hotmail.com"><bdi dir="ltr">alabaqra@hotmail.com</bdi></a><small>{t('الفاكس: ')}<bdi dir="ltr">0163834507 / 0163855351</bdi></small></div></div><div className="footer-primary-links">{[['/company',t('عن العباقرة')],['/projects',t('المشاريع')],['/gallery',t('معرض الصور')],['/news',t('الأخبار')],['/awards',t('التكريمات')],['/careers',t('التوظيف')],['/contact',t('اتصل بنا')]].map(([url,label])=><a key={url} href={localHref(url)}>{label}</a>)}</div><details className="footer-archive"><summary>{copy('جميع صفحات الشركة','All company pages')}</summary><div className="footer-links">{pages.filter(p=>p.url.includes('/pages/show/')).map(p=><a key={p.url} href={pageLink(p)}>{p.title}</a>)}<a href={localHref('/careers')}>{t('التوظيف')}<Icon name="arrow"/></a></div></details></div></section><footer className="wrap"><span>{t('شركة العباقرة للتجارة والمقاولات المحدودة')}</span><a href={origin} target="_blank" rel="noreferrer">{t('الموقع الأصلي ')}<Icon name="external"/></a><p>{t('نموذج مستقل غير رسمي. الشعار والمعلومات من موقع الشركة، وصور الخدمات التوضيحية من Pexels وUnsplash؛ محفوظة لأغراض معاينة إعادة التصميم.')}</p></footer></>
}
