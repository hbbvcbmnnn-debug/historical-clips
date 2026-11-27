import React from 'react';
import {palette} from './Stickman';

export type PropName = 'bag' | 'letter' | 'rifle' | 'flag' | 'sword' | 'stick' | 'none';

export const Props: React.FC<{prop: PropName}> = ({prop}) => {
  if (prop === 'none') return null;
  if (prop === 'bag') return <rect x="-88" y="35" rx="8" width="42" height="52" fill={palette.sandDark} stroke={palette.ink} strokeWidth="7"/>;
  if (prop === 'letter') return <g transform="translate(90 10)"><rect width="55" height="70" rx="4" fill="#FFF9E8" stroke={palette.ink} strokeWidth="7"/><path d="M10 20H45M10 35H45M10 50H32" stroke={palette.ink} strokeWidth="4"/></g>;
  if (prop === 'rifle') return <g transform="translate(82 48) rotate(-28)"><rect width="150" height="10" rx="5" fill={palette.ink}/><rect x="65" y="8" width="16" height="38" fill={palette.brown}/></g>;
  if (prop === 'flag') return <g><line x1="70" y1="-60" x2="70" y2="115" stroke={palette.ink} strokeWidth="8"/><path d="M70 -55H145V20H70Z" fill={palette.red} stroke={palette.ink} strokeWidth="6"/></g>;
  if (prop === 'stick') return <line x1="75" y1="-40" x2="75" y2="128" stroke={palette.brown} strokeWidth="9"/>;
  return <g transform="rotate(-32 70 50)"><rect x="68" y="-30" width="8" height="120" rx="4" fill="#C8CDD3" stroke={palette.ink} strokeWidth="5"/><rect x="48" y="82" width="48" height="8" fill={palette.gold}/></g>;
};
