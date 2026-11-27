import React from 'react';

const Palm: React.FC<{x: number; y: number; scale?: number}> = ({x, y, scale = 1}) => <g transform={`translate(${x} ${y}) scale(${scale})`} fill="#645038" stroke="#645038" strokeWidth="8" strokeLinecap="round"><path d="M0 0 Q8 -70 0 -145" fill="none"/><path d="M0 -140 Q-60 -185 -95 -165 Q-40 -155 0 -135 M0 -140 Q-20 -205 -2 -222 Q17 -185 7 -137 M0 -140 Q56 -197 83 -180 Q40 -157 4 -135 M0 -140 Q90 -160 103 -130 Q53 -136 4 -130 M0 -140 Q-90 -130 -105 -103 Q-50 -117 2 -129"/></g>;
const Cloud: React.FC<{x: number; y: number; scale: number}> = ({x, y, scale}) => <g transform={`translate(${x} ${y}) scale(${scale})`} fill="#817165" opacity=".55"><ellipse cx="0" cy="30" rx="120" ry="42"/><circle cx="-60" cy="5" r="48"/><circle cx="0" cy="-20" r="65"/><circle cx="70" cy="4" r="48"/></g>;

export const DesertBackdrop: React.FC<{variant?: string; progress?: number}> = ({variant = 'march', progress = 0}) => (
  <g>
    <rect width="1920" height="1080" fill="url(#sky-0)" />
    <circle cx="1510" cy="230" r="100" fill="#fff0c8" opacity=".62" />
    <path d="M0 525 Q220 395 440 500 T875 470 T1320 490 T1920 430 V1080 H0Z" fill="#d1a878" />
    <path d="M0 624 Q260 495 550 596 T1060 560 T1570 600 T1920 530 V1080 H0Z" fill="#b78656" />
    <Cloud x={340} y={410} scale={1.2}/><Cloud x={1560} y={390} scale={.85}/>
    <g opacity=".74" fill="#9d7047" stroke="#7c573c" strokeWidth="9">
      <path d="M650 620 V397 L710 340 H1220 L1280 398 V620Z"/><path d="M600 397 L645 350 H1290 L1330 397Z"/><path d="M865 620 V472 Q960 390 1055 472 V620Z" fill="#59402f"/>
      <path d="M690 425 H755 V480 H690Z M1170 425 H1235 V480 H1170Z" fill="#6b4c35"/>
    </g>
    <Palm x={270} y={675} scale={1.05}/><Palm x={1680} y={665} scale={.92}/><Palm x={520} y={630} scale={.62}/>
    <rect y="625" width="1920" height="455" fill="url(#ground-0)" />
    <path d="M0 730 Q400 680 780 748 T1500 730 T1920 710" fill="none" stroke="#e0b77e" strokeWidth="8" opacity=".5"/>
    {Array.from({length: 24}, (_, i) => <ellipse key={i} cx={(i * 193 + 70) % 1920} cy={650 + (i * 67) % 390} rx={8 + (i % 5) * 4} ry={4 + (i % 3) * 3} fill={i % 2 ? '#6d4b32' : '#e1b77f'} opacity=".7"/>)}
    {(variant === 'celebration' || variant === 'battle') && <g opacity=".4">{Array.from({length: 16}, (_, i) => <g key={i} transform={`translate(${i * 126} ${690 + (i % 4) * 24}) scale(.48)`}><path d="M0 0 V-80" stroke="#352820" strokeWidth="8"/><path d="M0 -80 Q55 -94 90 -70 V-35 Q45 -53 0 -32Z" fill={i % 2 ? '#4b3529' : '#8b4937'}/></g>)}</g>}
    {variant === 'location' && <g><rect x="0" y="112" width="1920" height="968" fill="#39291d" fillOpacity=".25"/><path d="M0 650 H1920 V1080 H0Z" fill="#493525" fillOpacity=".3"/></g>}
    <g opacity=".13" transform={`translate(${progress * -24} 0)`}>{Array.from({length: 12}, (_, i) => <ellipse key={i} cx={i * 180} cy={880 + Math.sin(i) * 25} rx="110" ry="24" fill="#fff0d6"/>)}</g>
  </g>
);
