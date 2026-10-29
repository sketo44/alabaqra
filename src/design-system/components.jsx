import React, {useId, useState} from 'react';
import {t,lang,localHref,languageHref,appPath} from '../i18n';

export function Icon({name='arrow', className='', geometry='angular', ...props}) {
  const paths={
    arrow:<><path d="M19 12H5m6-6-6 6 6 6"/></>,
    external:<><path d="M8 5H5v3m0-3 12 12M19 10v9H5v-6"/></>,
    building:<><path d="M4 21V5h11v16M15 11h5v10M8 9h3M8 13h3M8 17h3M2 21h20"/></>,
    water:<><path d="M12 3S5 11 5 15a7 7 0 0 0 14 0c0-4-7-12-7-12Z"/><path d="M9 15a3 3 0 0 0 3 3"/></>,
    maintenance:<><path d="m14 6 4-4a6 6 0 0 1-7 8L3 18a2 2 0 0 0 3 3l8-8a6 6 0 0 0 8-7l-4 4-4-4Z"/></>,
    clean:<><path d="m14 3-4 10M8 12l8 3-3 7-9-3 4-7ZM18 4v5m-2-2h4"/></>,
    leaf:<><path d="M20 4C8 2 2 8 5 15s14 6 15-11Z"/><path d="M4 21 16 9"/></>,
    electric:<><path d="m13 2-9 12h7l-1 8 10-13h-7l0-7Z"/></>,
    check:<path d="m5 12 4 4L19 6"/>,
    close:<path d="m6 6 12 12M6 18 18 6"/>,
    menu:<path d="M4 6h16M4 12h16M4 18h16"/>,
    blueprint:<><path d="M4 3h16v18H4zM4 10h9V3M10 10v11M10 16h10M16 16v-6h4"/></>,
    search:<><circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/></>,
    mail:<><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/></>,
  };
  const angular={building:<><path d="M3 21V7l4-4h9v18M16 10h5v11M7 8h5M7 12h5M7 16h5M1 21h22"/></>,water:<><path d="m12 2-8 12v5l4 3h8l4-3v-5L12 2Z"/><path d="m8 15 1 3h4"/></>,maintenance:<><path d="m14 7 4-5h4v6l-5 5h-5L5 21H2v-4l8-8V4l4-2v5Z"/></>,clean:<><path d="m15 2-5 11M7 12l9 3-3 7-10-3 4-7ZM18 3v6m-3-3h6"/></>,leaf:<><path d="m21 3-2 12-6 6H5l-3-4 2-8 7-5 10-1ZM3 21 16 8"/></>,electric:<path d="m14 2-11 12h8l-1 8L21 8h-8l1-6Z"/>};
  return <svg className={`ds-icon ${name==='arrow'?'ds-directional ':''}${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...props}>{geometry==='angular'?(angular[name]||paths[name]||paths.building):(paths[name]||paths.building)}</svg>;
}

export function BrandGeometry(){return <svg width="0" height="0" aria-hidden="true" focusable="false" style={{position:'absolute'}}><defs><clipPath id="ds-soft-button" clipPathUnits="objectBoundingBox"><path d="M .12 0 H .965 Q 1 0 1 .14 V .86 Q 1 1 .965 1 H .035 Q 0 1 0 .86 V .30 Q 0 .25 .02 .20 L .09 .03 Q .105 0 .12 0 Z"/></clipPath></defs></svg>}

export function BrandButton({className='',...props}){return <span className="ds-cut-frame"><Button className={`ds-button--cut ${className}`} {...props}/></span>}

export function Button({children, href, variant='primary', busy=false, disabled=false, className='', ...props}) {
  const cls=`ds-button ds-button--${variant} ${className}`;
  if(href) return <a href={href} className={cls} {...props}>{children}</a>;
  return <button type="button" className={cls} aria-busy={busy||undefined} disabled={busy||disabled} {...props}>{busy&&<span className="ds-spinner" aria-hidden="true"/>}{children}</button>;
}

export function Card({title, description, category, icon='building', image, imageAlt, children, footer}) {
  return <article className="ds-card">
    {image?<img className="ds-card-image" src={image} alt={imageAlt} width="960" height="640" loading="lazy"/>:<div className="ds-card-top"><span className="ds-icon-tile"><Icon name={icon}/></span>{category&&<span className="ds-badge">{category}</span>}</div>}
    <div className="ds-card-body">{image&&category&&<span className="ds-badge">{category}</span>}<h3>{title}</h3>{description&&<p>{description}</p>}{children}</div>
    {footer&&<div className="ds-card-footer">{footer}</div>}
  </article>;
}

export function ImageServiceCard({title,image,imageAlt}) {
  return <article className="ds-image-service"><img src={image} alt={imageAlt} width="960" height="720" loading="lazy"/><div className="ds-image-service-title"><h3>{title}</h3></div></article>;
}

export function Field({label, hint, error, id: suppliedId, multiline=false, children, ...props}) {
  const generatedId=useId();const id=suppliedId||generatedId;
  const Control=multiline?'textarea':'input';
  return <div className="ds-field" data-invalid={!!error}><label htmlFor={id}>{label}{props.required&&<span>{lang==='en'?' (Required)':' (مطلوب)'}</span>}</label>
    {children||<Control id={id} className="ds-input" aria-invalid={!!error} aria-describedby={[hint?`${id}-hint`:null,error?`${id}-error`:null].filter(Boolean).join(' ')||undefined} {...props}/>}
    {hint&&<small id={`${id}-hint`}>{hint}</small>}{error&&<p className="ds-field-error" id={`${id}-error`}>{error}</p>}
  </div>;
}

export function Navigation({items, current=appPath, demo=false}) {
  const [open,setOpen]=useState(false);const id=useId();
  const link=({href,label})=><a key={href} href={demo?href:localHref(href)} aria-current={href===current?'page':undefined}>{demo?label:t(label)}</a>;
  return <div className={`ds-navigation ${demo?'ds-navigation--demo':''}`}>
    <a href={localHref('/')} className="ds-logo"><img src="/assets/_images_logo.png" width="350" height="100" alt={t('العباقرة للتجارة والمقاولات')}/></a>
    <button type="button" className="ds-menu-toggle" aria-label={t(open?'إغلاق القائمة':'القائمة')} aria-controls={id} aria-expanded={open} onClick={()=>setOpen(!open)}><Icon name={open?'close':'menu'}/><span>{t(open?'إغلاق القائمة':'القائمة')}</span></button>
    <nav id={id} className={open?'is-open':''} aria-label={t(demo?'مثال قائمة تنقل':'التنقل الرئيسي')} onKeyDown={e=>{if(e.key==='Escape'){setOpen(false);e.currentTarget.parentElement.querySelector('button').focus()}}}>
      {demo?items.map(link):<><div className="ds-nav-group">{items.slice(0,4).map(link)}</div><div className="ds-nav-group">{items.slice(4).map(link)}<a className="ds-language" href={languageHref()} lang={lang==='ar'?'en':'ar'} dir={lang==='ar'?'ltr':'rtl'} hrefLang={lang==='ar'?'en':'ar'} aria-label={lang==='ar'?'Switch to English':'التبديل إلى العربية'}>{lang==='ar'?'English':'العربية'}</a></div></>}
    </nav>
  </div>;
}

export function ImageFrame({src, alt, caption, cutout=false}) {
  return <figure className={`ds-image-frame ${cutout?'ds-image-frame--cutout':''}`}><img src={src} alt={alt} width="960" height="640" loading="lazy"/>{caption&&<figcaption>{caption}</figcaption>}</figure>;
}

export const navigationItems=[{href:'/',label:'الرئيسية'},{href:'/company',label:'عن العباقرة'},{href:'/projects',label:'المشاريع'},{href:'/awards',label:'التكريمات'},{href:'/gallery',label:'معرض الصور'},{href:'/news',label:'جديدنا'},{href:'/careers',label:'التوظيف'},{href:'/contact',label:'اتصل بنا'}];
