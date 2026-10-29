import React from 'react';

// Original schematic line art, decorative rather than an installation specification.
export default function ServicesBackdrop(){return <svg className="services-backdrop" viewBox="0 0 1800 1100" preserveAspectRatio="xMidYMid slice" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
  <defs><pattern id="service-drafting-grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M60 0H0V60" strokeWidth=".5" opacity=".4"/></pattern></defs>
  <rect width="1800" height="1100" fill="url(#service-drafting-grid)" stroke="none"/>
  <g transform="translate(-75 90)">
    <rect x="50" y="40" width="300" height="480" rx="12"/><rect x="65" y="55" width="270" height="450" rx="7"/>
    <path d="M80 145H320M80 235H320M80 325H320M80 415H320M200 75V490"/>
    {[100,220].map(x=><g key={x}>{[85,175,265,355].map(y=><g key={y}><rect x={x} y={y} width="70" height="42" rx="4"/><path d={`M${x+14} ${y+11}v20m20-20v20m20-20v20`}/></g>)}</g>)}
    <path d="M100 520V630H250V740M155 520V600H310V690M210 520V570H370V650M125 40V-20M200 40V-20M275 40V-20M30 20V540M15 20H45M15 540H45M50 555H350M50 542V568M350 542V568"/>
    <circle cx="250" cy="765" r="25"/><path d="m250 745-8 20h16l-8 20M295 715h30v30h-30zM370 650v85m-20 0h40m-32 9h24m-17 9h10"/>
    <path d="M0 280H410M200 0V820" strokeDasharray="12 7 2 7" strokeWidth=".7"/>
  </g>
  <g transform="translate(1470 230)">
    <path d="M0 250H85V80H220V430H350M0 278H113V108H192V458H350M72 225h54m-54 65h54M178 335h56m-56 65h56"/>
    <path d="m178 355 28 14-28 14Zm56 0-28 14 28 14ZM206 355V308M181 308H231"/>
    <circle cx="150" cy="80" r="30"/><path d="M150 110V160M135 88 150 80 162 64M113 160H150V250M85 180H113M192 185H220"/>
    <path d="M-15 264H380M206 290V490" strokeDasharray="12 6 2 6" strokeWidth=".7"/>
    <circle cx="310" cy="595" r="72"/><circle cx="310" cy="595" r="43"/><path d="M270 525V510H350V525M270 665V680H350V665M240 555H225V635H240M380 555H395V635H380M310 552V638M267 595H353"/>
    <path d="M-5 480V505H220V480M-5 492H220M-5 505V520M220 505V520M270 725H350M270 710V740M350 710V740" strokeWidth=".8"/>
  </g>
  <g transform="translate(430 930)" strokeWidth="1"><path d="M0 30H900M0 10V50M180 20V40M360 20V40M540 20V40M720 20V40M900 10V50M-8 38 8 22M892 38 908 22"/><path d="M0 85H900" strokeDasharray="8 8"/></g>
</svg>}
