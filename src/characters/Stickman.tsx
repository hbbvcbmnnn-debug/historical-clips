import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate, spring} from 'remotion';

export type CharacterProps = {
  x: number;
  y: number;
  scale?: number;
  flipX?: boolean;
  outfit?: 'formal' | 'brown-coat' | 'soldier' | 'traveler' | 'messenger';
  hat?: 'fedora' | 'turban' | 'army' | 'none';
  action?: 'idle' | 'walk' | 'run' | 'celebrate' | 'present' | 'point';
  frame?: number;
  prop?: 'bag' | 'letter' | 'rifle' | 'flag' | 'sword' | 'stick' | 'none';
};

export const palette = {
  ink: '#16191E', face: '#FFFDF4', sand: '#CBA57A', sandLight: '#F2DAB4',
  sandDark: '#8B684A', olive: '#59614B', navy: '#26364F', brown: '#4D3527',
  gold: '#C9A85D', red: '#9E3F3F', sky: '#9BA9BD',
};

export const Stickman: React.FC<CharacterProps> = ({x, y, scale = 1, flipX = false, outfit = 'formal', hat = 'none', action = 'idle', frame: suppliedFrame, prop = 'none'}) => {
  const currentFrame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const frame = suppliedFrame ?? currentFrame;
  const phase = frame % 30;
  const breath = action === 'idle' ? Math.sin((phase / 30) * Math.PI * 2) * 3 : 0;
  const walk = action === 'walk' ? Math.sin((phase / 30) * Math.PI * 2) * 18 : 0;
  const runLift = action === 'run' ? Math.abs(Math.sin((phase / 30) * Math.PI * 2)) * 12 : 0;
  const celebrate = action === 'celebrate' ? interpolate(phase, [0, 15, 30], [0, -30, 0], {extrapolateRight: 'clamp'}) : 0;
  const outfitColor = outfit === 'soldier' ? palette.olive : outfit === 'traveler' ? palette.brown : outfit === 'messenger' ? palette.gold : palette.navy;
  const legA = walk;
  const legB = -walk;
  const pointArm = action === 'point' || action === 'present';

  return (
    <g transform={`translate(${x} ${y}) scale(${flipX ? -scale : scale} ${scale})`}>
      <ellipse cx="0" cy="128" rx="58" ry="12" fill="#000" opacity="0.18" />
      <g transform={`translate(0 ${-runLift + breath})`}>
        <g transform="translate(0 0)">
          {hat === 'turban' && <><ellipse cx="0" cy="-40" rx="34" ry="12" fill="#EAD7A2" stroke={palette.ink} strokeWidth="7"/><path d="M-31 -40 Q0 -70 31 -40" fill="#F6EAC7" stroke={palette.ink} strokeWidth="7"/></>}
          {hat === 'fedora' && <><ellipse cx="0" cy="-38" rx="48" ry="8" fill={palette.ink}/><path d="M-24 -38 Q-22 -74 0 -78 Q22 -74 24 -38Z" fill={palette.ink}/></>}
          {hat === 'army' && <><ellipse cx="0" cy="-42" rx="48" ry="10" fill={palette.olive} stroke={palette.ink} strokeWidth="6"/><path d="M-25 -42 L-20 -72 L20 -72 L25 -42Z" fill={palette.olive} stroke={palette.ink} strokeWidth="6"/></>}
        </g>
        <ellipse cx="0" cy="-20" rx="38" ry="48" fill={palette.face} stroke={palette.ink} strokeWidth="8" />
        <ellipse cx="-13" cy="-24" rx="5" ry="7" fill={palette.ink}/><ellipse cx="13" cy="-24" rx="5" ry="7" fill={palette.ink}/>
        <path d="M-12 1 Q0 10 12 1" fill="none" stroke={palette.ink} strokeWidth="5" strokeLinecap="round" />
        <path d="M-44 25 Q0 10 44 25 L38 96 Q0 112 -38 96Z" fill={outfitColor} stroke={palette.ink} strokeWidth="8" />
        {outfit === 'formal' && <path d="M-5 26 L0 44 L7 26Z" fill={palette.red}/>} 
        <path d="M-38 38 L-65 88 M38 38 L65 88" fill="none" stroke={palette.ink} strokeWidth="8" strokeLinecap="round" />
        {pointArm && <path d="M38 38 L90 14" fill="none" stroke={palette.face} strokeWidth="18" strokeLinecap="round"/>}
        {action === 'celebrate' && <><path d="M-38 38 L-58 0" fill="none" stroke={palette.face} strokeWidth="18" strokeLinecap="round"/><path d="M38 38 L58 0" fill="none" stroke={palette.face} strokeWidth="18" strokeLinecap="round"/></>}
        <path d={`M-25 100 L${-25 + legA} 128 M25 100 L${25 + legB} 128`} fill="none" stroke={palette.ink} strokeWidth="9" strokeLinecap="round" />
      </g>
      {prop === 'bag' && <rect x="-88" y="35" rx="8" width="42" height="52" fill={palette.sandDark} stroke={palette.ink} strokeWidth="7"/>}
      {prop === 'letter' && <g transform="translate(90 10)"><rect width="55" height="70" rx="4" fill="#FFF9E8" stroke={palette.ink} strokeWidth="7"/><path d="M10 20H45M10 35H45M10 50H32" stroke={palette.ink} strokeWidth="4"/></g>}
      {prop === 'rifle' && <g transform="translate(82 48) rotate(-28)"><rect x="0" y="0" width="150" height="10" rx="5" fill={palette.ink}/><rect x="65" y="8" width="16" height="38" fill={palette.brown}/></g>}
      {prop === 'flag' && <g><line x1="70" y1="-60" x2="70" y2="115" stroke={palette.ink} strokeWidth="8"/><path d="M70 -55 H145 V20 H70Z" fill={palette.red} stroke={palette.ink} strokeWidth="6"/></g>}
      {prop === 'stick' && <line x1="75" y1="-40" x2="75" y2="128" stroke={palette.brown} strokeWidth="9"/>}
      {prop === 'sword' && <g transform="rotate(-32 70 50)"><rect x="68" y="-30" width="8" height="120" rx="4" fill="#C8CDD3" stroke={palette.ink} strokeWidth="5"/><rect x="48" y="82" width="48" height="8" fill={palette.gold}/></g>}
    </g>
  );
};
