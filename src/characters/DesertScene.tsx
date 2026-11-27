import React from 'react';
import {palette} from './Stickman';

export const DesertScene: React.FC<{frame?: number}> = ({frame = 0}) => {
  const dust = (frame * 0.7) % 240;
  return (
    <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <defs><linearGradient id="desertSky" x1="0" y1="0" x2="0" y2="1"><stop stopColor={palette.sky}/><stop offset="1" stopColor={palette.sandLight}/></linearGradient><linearGradient id="desertGround"><stop stopColor={palette.sandLight}/><stop offset="1" stopColor={palette.sandDark}/></linearGradient></defs>
      <rect width="1920" height="1080" fill="url(#desertSky)"/><circle cx="1510" cy="220" r="95" fill="#FFE5A3" opacity="0.9"/>
      <path d="M0 690 Q280 520 620 700 T1240 650 T1920 690V1080H0Z" fill="#B69A72"/><path d="M0 760 Q400 610 780 760 T1920 730V1080H0Z" fill="url(#desertGround)"/>
      <g fill={palette.sandDark} opacity="0.75"><path d="M280 730l35-120 38 120Z"/><path d="M1420 710l55-150 62 150Z"/></g>
      <g fill="#EBC99A" opacity="0.35"><circle cx={(110+dust)%1960} cy="820" r="28"/><circle cx={(520+dust*1.3)%1960} cy="900" r="18"/><circle cx={(930+dust*0.8)%1960} cy="840" r="22"/></g>
    </svg>
  );
};
