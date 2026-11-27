import React from 'react';

export type CharacterAction = 'idle' | 'walk' | 'run' | 'celebrate' | 'present' | 'point';
export type Outfit = 'formal' | 'brown-coat' | 'soldier' | 'traveler' | 'messenger' | 'gold';
export type PropKind = 'bag' | 'letter' | 'rifle' | 'flag' | 'sword' | 'stick' | 'none';
export type HatKind = 'fedora' | 'turban' | 'army' | 'none';

export type CharacterProps = {
  x: number;
  y: number;
  scale?: number;
  rotate?: number;
  flipX?: boolean;
  outfit?: Outfit;
  hat?: HatKind;
  action?: CharacterAction;
  prop?: PropKind;
  frame?: number;
};

const ink = '#171513';
const outfitColors: Record<Outfit, string> = {formal: '#26364f', 'brown-coat': '#49372b', soldier: '#59614b', traveler: '#6b5940', messenger: '#3e4650', gold: '#e69b24'};

const Fedora: React.FC = () => <g stroke={ink} strokeWidth="7" strokeLinejoin="round"><path d="M-61 -169 Q-57 -223 0 -231 Q58 -223 62 -169 L77 -156 Q0 -143 -78 -156 Z" fill="#493324"/><path d="M-79 -158 Q0 -180 80 -158 Q83 -145 0 -143 Q-84 -145 -79 -158Z" fill="#241d19"/><path d="M-48 -190 Q0 -210 46 -190" fill="none" stroke="#bd8751" strokeWidth="5"/></g>;
const Turban: React.FC = () => <g stroke={ink} strokeWidth="7" fill="#e9dfc9"><path d="M-63 -168 Q-73 -218 -28 -229 Q31 -245 62 -196 L68 -165 Q3 -143 -63 -168Z"/><path d="M-58 -190 Q0 -214 62 -186 M-62 -174 Q0 -195 67 -171" fill="none"/></g>;

export const Stickman: React.FC<CharacterProps> = ({x, y, scale = 1, rotate = 0, flipX = false, outfit = 'formal', hat = 'fedora', action = 'idle', prop = 'none', frame = 0}) => {
  const phase = (frame / 8) % (Math.PI * 2);
  const walk = action === 'walk' || action === 'run';
  const stride = walk ? Math.sin(phase) * (action === 'run' ? 24 : 15) : 0;
  const lift = action === 'celebrate' ? -22 : action === 'run' ? -8 : 0;
  const jacket = outfitColors[outfit];
  const armRaise = action === 'celebrate' ? -70 : action === 'point' || action === 'present' ? -40 : Math.sin(phase) * (walk ? 16 : 2);
  const legA = stride, legB = -stride;
  const transform = `translate(${x} ${y}) rotate(${rotate}) scale(${flipX ? -scale : scale} ${scale})`;
  return <g transform={transform} stroke={ink} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="0" cy="4" rx="95" ry="17" fill="#241710" fillOpacity=".25" stroke="none" />
    <g transform={`translate(0 ${lift})`}>
      <path d={`M-25 -36 L-35 22 L-45 92 L${-43 + legA} 167`} fill="none" stroke={jacket} strokeWidth="22" />
      <path d={`M24 -36 L35 22 L45 92 L${44 + legB} 167`} fill="none" stroke={jacket} strokeWidth="22" />
      <path d={`M${-43 + legA} 167 l-30 7 q-12 8 0 15 h43 q10 -3 8 -13`} fill="#2a211d" />
      <path d={`M${44 + legB} 167 l30 7 q12 8 0 15 h-43 q-10 -3 -8 -13`} fill="#2a211d" />
      <path d="M-43 -112 Q-63 -98 -54 -40 L-44 20 Q0 37 44 20 L54 -40 Q63 -98 43 -112 Q0 -128 -43 -112Z" fill={jacket} />
      <path d="M-22 -107 L0 -77 L22 -107 L12 -47 L0 -33 L-12 -47Z" fill="#fff8e9" strokeWidth="5" />
      <path d="M0 -79 L-10 -59 L0 -35 L10 -59Z" fill="#a43d3c" strokeWidth="4" />
      <path d={`M-45 -99 Q-77 -88 -80 -48 L-75 ${-15 + armRaise} Q-73 ${5 + armRaise} -60 ${5 + armRaise}`} fill="none" stroke={jacket} strokeWidth="19" />
      <path d={`M45 -99 Q77 -88 80 -48 L75 ${-15 - armRaise / 3} Q73 ${5 - armRaise / 3} 60 ${5 - armRaise / 3}`} fill="none" stroke={jacket} strokeWidth="19" />
      <circle cx="-60" cy={8 + armRaise} r="15" fill="#fffdf5" strokeWidth="6" />
      <circle cx="60" cy={8 - armRaise / 3} r="15" fill="#fffdf5" strokeWidth="6" />
      {prop === 'bag' && <g transform="translate(73 -46) rotate(12)"><rect x="0" y="0" width="36" height="64" rx="10" fill="#765033"/><path d="M4 13 Q18 -5 32 13" fill="none"/></g>}
      {prop === 'letter' && <g transform="translate(54 -13)"><rect width="38" height="28" fill="#fff0cf"/><path d="M0 0 L19 15 L38 0" fill="none" strokeWidth="4"/></g>}
      {prop === 'rifle' && <path d="M-95 7 L-95 -130 L-88 -151 L-81 -130 L-81 8" fill="#392a20" strokeWidth="6"/>}
      {prop === 'flag' && <g transform="translate(88 -205)"><path d="M0 0 V185"/><path d="M0 8 Q45 -6 77 13 V60 Q40 43 0 58Z" fill="#a34336" strokeWidth="5"/></g>}
      {prop === 'sword' && <path d="M-94 15 L-133 -80 L-120 -88 L-75 7 M-103 -10 L-67 -24" fill="#d5d0c4" strokeWidth="6"/>}
      {prop === 'stick' && <path d="M-82 5 L-107 -80" fill="none" stroke="#67462d" strokeWidth="9"/>}
      <g transform="translate(0 -151)"><ellipse cx="0" cy="0" rx="58" ry="69" fill="#fffdf7" strokeWidth="9"/><ellipse cx="-19" cy="-2" rx="6" ry="18" fill={ink} stroke="none"/><ellipse cx="19" cy="-2" rx="6" ry="18" fill={ink} stroke="none"/>{hat === 'fedora' && <Fedora/>}{hat === 'turban' && <Turban/>}{hat === 'army' && <g strokeWidth="7"><path d="M-61 -163 Q-44 -217 0 -219 Q44 -217 61 -163Z" fill="#536047"/><path d="M-71 -162 Q0 -179 71 -162" fill="#3e4737"/></g>}</g>
    </g>
  </g>;
};
