import React from 'react';

// Original illustrations, sharing the site's blue palette and rounded linework.
export default function PrincipleArt({kind}){
 return <div className="principle-art" aria-hidden="true"><svg viewBox="0 0 360 190" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" focusable="false">
 <ellipse cx="180" cy="165" rx="136" ry="12" fill="currentColor" opacity=".07" stroke="none"/>
 {kind==='vision'?<>
  <circle cx="273" cy="49" r="23" fill="currentColor" opacity=".08" stroke="none"/>
  <path d="M45 163H318M71 162V82l35-20 35 20v80M141 162V45h55v117M196 162V93h58v69M254 162V72h37v90" fill="var(--color-surface)"/>
  <path d="M155 45V29h27v16M89 94h10m16 0h10M89 113h10m16 0h10M89 132h10m16 0h10M154 63h10m15 0h6M154 82h10m15 0h6M154 101h10m15 0h6M154 120h10m15 0h6M210 108h10m16 0h6M210 127h10m16 0h6M267 87h10M267 106h10M267 125h10M165 162v-23h17v23M216 162v-17h18v17"/>
  <path d="M49 159v-35m0 13c-23 0-27-29-15-41 5 20 23 17 15 41Zm0 0c23 0 27-29 15-41-5 20-23 17-15 41Z" fill="var(--color-subtle)"/>
  <path d="M76 49 124 26M278 28v-9m15 14 7-6M93 174h104" opacity=".35"/>
 </>:kind==='mission'?<>
  <path d="M109 44h137v87H109z" fill="var(--color-surface)"/><path d="M126 62h58m-58 15h83m-83 15h38m17 0h28" opacity=".45"/>
  <path d="m211 75 10 10 22-24"/>
  <path d="M94 145h173v18H94z" fill="var(--color-subtle)"/>
  <path d="m52 117 32-25 43 37-24 27-51-39Zm256 0-32-25-43 37 24 27 51-39Z" fill="var(--color-subtle)"/>
  <path d="m111 113 23-17h31l17 11 23-10 28 14 14 20-25 24-18 4-20-8-21 3-45-28M151 111l22-15 17 2 20 16-10 12-21-10-17 12-11-4v-13Z" fill="var(--color-surface)"/>
  <path d="m174 137 27 16m-16-25 27 18m-10-26 21 17M70 111l12 10m206-10-12 10M70 53h18m-9-9v18M277 54h17m-8-8v16"/>
 </>:<>
  <path d="M54 77V60a8 8 0 0 1 8-8h52l15 18h92a8 8 0 0 1 8 8v78H54" fill="var(--color-subtle)"/>
  <path d="M75 80V36h103l27 27v83H75Z" fill="var(--color-surface)"/><path d="M178 36v27h27M92 83h56M92 99h41M92 115h51M92 131h29" opacity=".45"/>
  <path d="M54 157 69 91h165l-16 66H54Z" fill="var(--color-subtle)"/>
  <circle cx="250" cy="103" r="55" fill="var(--color-surface)"/><circle cx="250" cy="103" r="37"/><circle cx="250" cy="103" r="18" fill="var(--color-subtle)"/>
  <path d="m250 103 52-53m-5 5 1-20 14-14v19l-14 15 20 1 14-14h-20M242 163h27M266 174h33"/>
 </>}
 </svg></div>
}
