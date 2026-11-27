import React from 'react';
import {palette} from './Stickman';

export type SuitProps = {outfit: 'formal' | 'brown-coat' | 'soldier' | 'traveler' | 'messenger'};

export const Suit: React.FC<SuitProps> = ({outfit}) => {
  const color = outfit === 'soldier' ? palette.olive : outfit === 'traveler' ? palette.brown : outfit === 'messenger' ? palette.gold : palette.navy;
  return (
    <g>
      <path d="M-44 25 Q0 10 44 25 L38 96 Q0 112 -38 96Z" fill={color} stroke={palette.ink} strokeWidth="8" />
      {outfit === 'formal' && <path d="M-5 26 L0 44 L7 26Z" fill={palette.red}/>} 
      {outfit === 'brown-coat' && <path d="M0 28V98" stroke="#6F5137" strokeWidth="5"/>}
      {outfit === 'soldier' && <><rect x="-28" y="42" width="56" height="8" fill="#A9A58A"/><circle cx="0" cy="46" r="7" fill={palette.gold}/></>}
    </g>
  );
};
