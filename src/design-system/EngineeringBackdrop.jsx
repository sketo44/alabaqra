import React from 'react';

// Original decorative vector artwork; these are schematic studies, not company projects.
export default function EngineeringBackdrop(){
  return <div className="engineering-backdrop" aria-hidden="true"><svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" focusable="false">
    <defs>
      <pattern id="engineering-grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" strokeWidth=".5" opacity=".3"/></pattern>
      <pattern id="engineering-glazing" width="36" height="42" patternUnits="userSpaceOnUse"><path d="M0 0H36V42H0Z M6 7H30V35H6Z" strokeWidth=".8"/></pattern>
    </defs>
    <rect width="1920" height="1080" fill="url(#engineering-grid)" stroke="none"/>
    {/* Building elevation with structural bays, mullions and dimension chains. */}
    <g transform="translate(-80 160)" strokeWidth="1.4">
      <path d="M20 680H470M65 680V180H365V680M55 180H380V160H55ZM90 160V130H340V160M120 130V100H310V130"/>
      <path d="M80 205H350V590H80Z" fill="url(#engineering-glazing)"/>
      <path d="M65 270H365M65 354H365M65 438H365M65 522H365M65 606H365M102 180V606M174 180V606M246 180V606M318 180V606M80 680V625H135V680M150 680V625H210V680M225 680V625H285V680M300 680V625H350V680M50 700H385M40 718H400"/>
      <g strokeWidth=".7"><path d="M30 130V680M18 130H58M18 680H58M22 138L38 122M22 688L38 672M390 180H435M390 270H435M390 354H435M390 438H435M390 522H435M390 606H435M390 680H435M420 180V680M412 188L428 172M412 278L428 262M412 362L428 346M412 446L428 430M412 530L428 514M412 614L428 598M412 688L428 672M65 750H365M65 730V770M365 730V770M73 742L57 758M373 742L357 758"/></g>
      <path d="M0 802H470M0 810H470M70 770V855M360 770V855" strokeDasharray="8 8" strokeWidth=".7"/>
      <circle cx="70" cy="866" r="11"/><circle cx="360" cy="866" r="11"/>
    </g>
    {/* Axonometric technical floor study, deliberately outside the reading area. */}
    <g transform="translate(1540 30)" strokeWidth="1.3">
      <path d="M0 240 210 120 490 280 280 400ZM0 240V465L280 625 490 505V280M280 400V625M0 430 280 590 490 470M0 390 280 550 490 430"/>
      <path d="m30 240 180-102 245 142-178 102ZM85 208 330 350M145 174 390 316M90 275 270 173M185 330 365 227M30 295 250 422V557L30 430ZM310 421 460 335V470L310 556Z"/>
      <path d="M78 323V458M128 352V487M178 381V516M360 392V527M410 364V498M30 363 250 490M310 489 460 402" strokeWidth=".7"/>
      <path d="M-28 480 260 646M-42 494-14 466M246 660 274 632M295 657 513 532M285 646 305 668M503 521 523 543M-22 235V462M-34 235H-10M-34 462H-10" strokeWidth=".7"/>
      <path d="M-50 215 210 66 540 256M210 40V155M-65 505 280 704 550 548" strokeDasharray="10 7" strokeWidth=".7"/>
    </g>
    {/* Mechanical service drawing: flanged pipes, valve and pump assembly. */}
    <g transform="translate(1610 830)" strokeWidth="1.5">
      <path d="M0 85H65V35H105V85H165M0 105H85V55H85V105H165M165 70V120M173 70V120M165 80H220V110H173M220 64V127M230 64V127M230 80H365M230 110H365M365 65V125M375 65V125"/>
      <path d="m113 76 22 19-22 19ZM153 76 135 95 153 114ZM135 75V35M112 35H158M135 35V20"/>
      <circle cx="285" cy="30" r="24"/><path d="M285 54V80M271 36 285 30 296 18M265 141H320M275 141V110M310 141V110M-10 95H410"/>
      <path d="M-10 95H410M135 0V150M285-10V155" strokeDasharray="12 5 2 5" strokeWidth=".6"/>
      <path d="M-12 175H375M-12 159V191M375 159V191M-4 167-20 183M383 167 367 183" strokeWidth=".7"/>
    </g>
  </svg></div>;
}
