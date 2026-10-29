import React from 'react';
import {lang,localHref} from './i18n';
import {Icon} from './design-system/components';

const clients=[
 ['qassim-university.webp','جامعة القصيم','Qassim University'],
 ['islamic-university.svg','الجامعة الإسلامية','Islamic University'],
 ['nadec.svg','نادك','NADEC'],
 ['qassim-cement.gif','أسمنت القصيم','Qassim Cement'],
 ['gasco.svg','شركة الغاز الأهلية','National Gas Company'],
 ['spimaco.png','سبيماكو','SPIMACO'],
 ['srca.svg','الهلال الأحمر السعودي','Saudi Red Crescent'],
 ['education.svg','إدارات التعليم','Education departments'],
 ['iau.svg','جامعة الدمام سابقًا','University of Dammam (formerly)'],
 ['adf.svg','البنك الزراعي سابقًا','Agricultural Bank (formerly)'],
 ['suzuki.svg','سوزوكي','Suzuki'],
 ['retaj.png','فنادق ريتاج','Retaj Hotels'],
 ['swissotel.png','سويس أوتيل مكة','Swissôtel Makkah']
];
export default function ClientMarquee(){
 const en=lang==='en';
 return <section className="client-section" aria-labelledby="client-strip-title"><div className="wrap"><h2 id="client-strip-title">{en?'Our key clients':'أبرز عملائنا'}</h2>
 <div className="client-marquee"><div className="client-track">{[false,true].map(duplicate=><div key={String(duplicate)} className="client-group" aria-hidden={duplicate||undefined}>{clients.map(([file,ar,english])=><a className={'client-logo'+(['gasco.svg','spimaco.png'].includes(file)?' client-logo--on-dark':'')} href={localHref('/projects')} key={file} tabIndex={duplicate?-1:undefined} aria-label={en?english+' — published work record':ar+' — سجل الأعمال المنشور'}><img src={'/assets/clients/'+file} width="180" height="80" loading="eager" alt={duplicate?'':en?english:ar}/><span>{en?english:ar}</span></a>)}</div>)}</div></div>
 </div></section>
}

