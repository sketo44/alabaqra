import React,{useEffect,useRef,useState} from 'react';
import {ImageServiceCard} from './design-system/components';
import {lang,t} from './i18n';
import photos from './service-photos.json';

const labels=['صيانة المباني والطرق','المياه والصرف الصحي','الكهرباء والميكانيكا','نظافة المدن','الحدائق والمنتزهات','المقاولات العامة'];
const englishAlt=['Road maintenance','Water maintenance','Electrical maintenance','City cleaning','Garden maintenance','Construction in Riyadh'];
const ease=x=>x*x*(3-2*x);
const lerp=(a,b,p)=>({x:a.x+(b.x-a.x)*p,y:a.y+(b.y-a.y)*p});
const curve=(a,b,p,control)=>({x:(1-p)**2*a.x+2*(1-p)*p*((a.x+b.x)/2)+p*p*b.x,y:(1-p)**2*a.y+2*(1-p)*p*control+p*p*b.y});

export default function MechanicalServices(){
 const stage=useRef(null),runtime=useRef({}),slots=useRef([0,1,2,3,4,5]);
 const [reduced,setReduced]=useState(false);
 useEffect(()=>{
  const media=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setReduced(media.matches);update();media.addEventListener('change',update);return()=>media.removeEventListener('change',update);
 },[]);
 useEffect(()=>{
  if(!stage.current)return;
  const el=stage.current;let raf,disposed=false,inView=false,cycle=null,last=0,idle=0;const ring=[0,1,2,5,4,3];
  const cards=[...el.querySelectorAll('[data-service-card]')];  const reset=()=>{cards.forEach(c=>{c.style.transform='';c.style.zIndex='';c.classList.remove('is-carried')});cycle=null;idle=0};
  const begin=()=>{const bounds=el.getBoundingClientRect();const positions=[];cards.forEach((card,id)=>{const r=card.getBoundingClientRect();positions[slots.current[id]]={x:r.x-bounds.x,y:r.y-bounds.y,width:r.width}});cycle={time:0,positions,w:bounds.width,h:bounds.height};el.dataset.motion='running'};
  const tick=now=>{if(disposed)return;const dt=last?Math.min(now-last,60):0;last=now;const state=runtime.current;
   if(state.reduced||!inView||document.hidden){raf=requestAnimationFrame(tick);return}
   if(!cycle){idle+=dt;if(idle>=2400)begin();raf=requestAnimationFrame(tick);return}
   cycle.time+=dt;const progress=Math.min(cycle.time/3400,1),p=ease(progress);
   cards.forEach((card,id)=>{const oldSlot=slots.current[id],next=ring[(ring.indexOf(oldSlot)+1)%ring.length],a=cycle.positions[oldSlot],b=cycle.positions[next];const point=lerp(a,b,p);if(oldSlot===2)point.x-=Math.sin(p*Math.PI)*Math.min(18,cycle.w*.025);if(oldSlot===3)point.x+=Math.sin(p*Math.PI)*Math.min(18,cycle.w*.025);card.style.transform=`translate(${point.x-a.x}px,${point.y-a.y}px)`;card.style.zIndex='2';card.classList.add('is-carried');
   });
   if(progress>=1){slots.current=slots.current.map(slot=>ring[(ring.indexOf(slot)+1)%ring.length]);cards.forEach((card,i)=>card.style.order=String(slots.current[i]));reset();el.dataset.motion='idle'}
   raf=requestAnimationFrame(tick);
  };
  const observer=new IntersectionObserver(([entry])=>{inView=entry.isIntersecting},{threshold:.25});observer.observe(el);const resize=new ResizeObserver(()=>{reset();el.dataset.motion='idle'});resize.observe(el);raf=requestAnimationFrame(tick);
  runtime.current.reset=()=>{reset();el.dataset.motion='idle'};
  return()=>{disposed=true;cancelAnimationFrame(raf);observer.disconnect();resize.disconnect();reset()};
 },[]);
 useEffect(()=>{runtime.current.reduced=reduced;if(reduced)runtime.current.reset?.()},[reduced]);
 return <div className="mechanical-services"><div className="mechanical-stage" ref={stage} data-motion="idle"><div className="service-grid">{labels.map((label,i)=><div className="service-motion-card" data-service-card={i} key={photos[i].key} style={{order:i}}><ImageServiceCard image={photos[i].image} imageAlt={(lang==='en'?englishAlt[i]:photos[i].alt)+t(' — صورة توضيحية للخدمة')} title={t(label)}/></div>)}</div></div></div>
}
