import React from 'react';
import {palette} from './Stickman';

export type HatProps = {type: 'fedora' | 'turban' | 'army' | 'none'; flipX?: boolean};

export const Hat: React.FC<HatProps> = ({type, flipX = false}) => (
  <g transform={flipX ? 'translate(0 0) scale(-1 1)' : undefined}>
    {type === 'turban' && <><ellipse cx="0" cy="-40" rx="34" ry="12" fill="#EAD7A2" stroke={palette.ink} strokeWidth="7"/><path d="M-31 -40 Q0 -70 31 -40" fill="#F6EAC7" stroke={palette.ink} strokeWidth="7"/></>}
    {type === 'fedora' && <><ellipse cx="0" cy="-38" rx="48" ry="8" fill={palette.ink}/><path d="M-24 -38 Q-22 -74 0 -78 Q22 -74 24 -38Z" fill={palette.ink}/></>}
    {type === 'army' && <><ellipse cx="0" cy="-42" rx="48" ry="10" fill={palette.olive} stroke={palette.ink} strokeWidth="6"/><path d="M-25 -42 L-20 -72 L20 -72 L25 -42Z" fill={palette.olive} stroke={palette.ink} strokeWidth="6"/></>}
  </g>
);
