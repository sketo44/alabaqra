import React,{useRef,useState} from 'react';
import {lang,t} from './i18n';
import {BrandButton,Field,Icon} from './design-system/components';

const c=(ar,en)=>lang==='en'?en:ar;
const official='https://www.alabaqra.sa/career/show/18/التوظيف';
const choices={
 gender:[['ذكر','Male'],['أنثى','Female']],
 marital:[['غير متزوج/ة','Single'],['متزوج/ة','Married']],
 qualification:[['دبلوم','Diploma'],['بكالوريوس','Bachelor’s'],['ماجستير','Master’s'],['دكتوراه','Doctorate'],['غير ذلك','Other']],
 language:[['عربي','Arabic'],['انجليزي','English']],
 preference:[['محاسبة','Accounting'],['تقنية معلومات','Information technology'],['موارد بشرية','Human resources'],['مبيعات وتسويق','Sales & marketing']]
};
const groups=[
 {title:['البيانات الشخصية','Personal details'],fields:[
 ['email','البريد الإلكتروني','Email','email'],['fullName','الاسم كاملاً (ثلاثي)','Full name (three parts)','text'],
 ['gender','الجنس','Gender','select'],['marital','الحالة الإجتماعية','Marital status','select'],['nationality','الجنسية','Nationality','text'],['identity','رقم الهوية أو الإقامة','Identity / residency number','text'],['issuePlace','مكان الإصدار','Place of issue','text'],['issueDate','تاريخ الإصدار','Issue date','text'],['expiryDate','تاريخ الإنتهاء','Expiry date','text'],['birthDate','تاريخ الميلاد','Date of birth','text']]},
 {title:['المؤهلات العلمية','Education'],fields:[
 ['qualification','المؤهل العلمي','Qualification','select'],['university','الجامعة','University','text'],['city','المدينة','City','text'],['major','التخصص العلمي','Field of study','text'],['studyFrom','فترة الدراسة من : (السنة/الشهر)','Study period from (year/month)','text'],['studyTo','إلى : (السنة/الشهر)','To (year/month)','text']]},
 {title:['اللغات والتخصصات','Languages & preferred fields'],fields:[
 ['language','اللغات','Languages','select'],['preference','التخصصات المفضلة','Preferred fields','select'],['additional','معلومات إضافية','Additional information','textarea']]}
];
const fields=groups.flatMap(g=>g.fields);

export default function CareersForm(){
 const form=useRef(null),reviewPanel=useRef(null);
 const [errors,setErrors]=useState({}),[review,setReview]=useState(null),[message,setMessage]=useState('');
 const display=(id,value)=>{const entry=choices[id]?.find(([ar])=>ar===value);return entry?c(...entry):value};
 const validate=e=>{
  e.preventDefault();const data=new FormData(form.current);const problems={};
  for(const[id,ar,en,type]of fields){const value=String(data.get(id)||'').trim();if(!value)problems[id]=c('هذا الحقل مطلوب.','This field is required.');else if(type==='email'&&!form.current.elements.namedItem(id).validity.valid)problems[id]=c('أدخل بريدًا إلكترونيًا صحيحًا.','Enter a valid email address.')}
  setErrors(problems);if(Object.keys(problems).length){setMessage(c('راجع الحقول المطلوبة أدناه.','Review the required fields below.'));requestAnimationFrame(()=>form.current.elements.namedItem(Object.keys(problems)[0])?.focus());return}
  setReview(fields.map(([id,ar,en])=>({id,label:c(ar,en),value:display(id,String(data.get(id)).trim())})));setMessage('');requestAnimationFrame(()=>reviewPanel.current?.focus());
 };
 const save=()=>{const text=c('طلب توظيف — نسخة للمراجعة، لم يُرسل إلى الشركة','Employment application — review copy, not submitted to the company')+'\n\n'+review.map(r=>r.label+': '+r.value).join('\n\n');const url=URL.createObjectURL(new Blob(['\uFEFF'+text],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='alabaqra-application.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)};
 return <section className="wrap content-page company-section careers-form-page"><div className="page-heading"><p className="eyebrow">{t('عن العباقرة')}</p><h1>{t('التوظيف')}</h1><p>{c('نموذج طلب التوظيف لدى شركة العباقرة للتجارة والمقاولات المحدودة.','Employment application for Alabaqra Trading & Contracting Co. Ltd.')}</p></div>
 <div className="application-intro"><span className="ds-icon-tile"><Icon name="blueprint"/></span><div><h2>{c('بياناتك وخبراتك في مكان واحد','Your details and experience in one place')}</h2><p>{c('الحقول والخيارات مطابقة للنموذج المنشور في موقع الشركة. يمكنك تعبئة بياناتك ومراجعتها هنا؛ هذه المعاينة لا ترسل الطلب. الإرسال متاح عبر النموذج الرسمي.','The fields and options match the company’s published form. Complete and review your details here; this preview does not submit an application. Submission is available through the official form.')}</p></div></div>
 <p className="application-status" role="status">{message}</p>
 <form ref={form} className="employment-form" noValidate onSubmit={validate} hidden={!!review}>
 {groups.map((group,index)=><fieldset key={group.title[1]}><legend><span>{new Intl.NumberFormat(lang==='ar'?'ar-SA':'en').format(index+1)}</span>{c(...group.title)}</legend><div className="employment-fields">{group.fields.map(([id,ar,en,type])=>{
  const date=/Date$/.test(id);const hint=date?c('اكتب التاريخ والتقويم كما في الوثيقة.','Enter the date and calendar as shown on the document.'):id.startsWith('study')?c('السنة / الشهر، كما في المؤهل.','Year / month as shown on the qualification.'):undefined;
  const common={id:'application-'+id,name:id,required:true,'aria-invalid':!!errors[id],'aria-describedby':[hint?'application-'+id+'-hint':null,errors[id]?'application-'+id+'-error':null].filter(Boolean).join(' ')||undefined};
  return <div key={id} className={type==='textarea'?'employment-field-wide':''}><Field id={common.id} label={c(ar,en)} required hint={hint} error={errors[id]}>{type==='select'?<select {...common} className="ds-input" defaultValue=""><option value="" disabled>{c('اختر…','Select…')}</option>{choices[id].map(([arValue,enValue])=><option key={arValue} value={arValue}>{c(arValue,enValue)}</option>)}</select>:type==='textarea'?<textarea {...common} className="ds-input" rows="4" maxLength="6000"/>:<input {...common} className="ds-input" type={type} maxLength={id==='email'?254:200} dir={type==='email'||date||id==='identity'||id.startsWith('study')?'ltr':undefined} autoComplete={id==='email'?'email':id==='fullName'?'name':id==='nationality'?'country-name':undefined} spellCheck={type==='email'?false:undefined}/>}</Field></div>
 })}</div></fieldset>)}
 <div className="employment-actions"><BrandButton type="submit">{c('مراجعة الطلب','Review application')}<Icon name="arrow"/></BrandButton><a className="text-link" href={official} target="_blank" rel="noreferrer">{c('فتح النموذج الرسمي','Open official form')}<Icon name="external"/></a></div>
 </form>
 {review&&<section ref={reviewPanel} className="application-review" tabIndex="-1" aria-labelledby="application-review-title"><h2 id="application-review-title">{c('مراجعة طلب التوظيف','Review your application')}</h2><p className="source-note">{c('لم يُرسل هذا الطلب إلى الشركة. راجع بياناتك أو احفظ نسخة منها، ثم استخدم النموذج الرسمي للتقديم.','This application has not been submitted to the company. Review your details or save a copy, then use the official form to apply.')}</p><dl className="profile-fields">{review.map(r=><div key={r.id}><dt>{r.label}</dt><dd><bdi dir="auto">{r.value}</bdi></dd></div>)}</dl><div className="employment-actions"><BrandButton variant="secondary" onClick={()=>{setReview(null);requestAnimationFrame(()=>form.current?.elements.namedItem('email')?.focus())}}>{c('تعديل البيانات','Edit details')}</BrandButton><BrandButton variant="secondary" onClick={save}>{c('حفظ نسخة الطلب','Save a copy')}</BrandButton><BrandButton href={official} target="_blank" rel="noreferrer">{c('التقديم الرسمي','Official application')}<Icon name="external"/></BrandButton></div></section>}
 </section>
}
