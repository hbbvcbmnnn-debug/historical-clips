import React from 'react';
import {Audio, Easing, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Stickman, type CharacterAction, type Outfit, type PropKind} from './characters/Stickman';
import {DesertBackdrop} from './scenes/DesertBackdrop';
import type {Scene as SceneData} from './types';

const ARABIC_FONT = 'Scheherazade New, Amiri, Noto Naskh Arabic, serif';

const Arabic: React.FC<React.PropsWithChildren<{x: number; y: number; size: number; fill?: string; weight?: number; anchor?: 'start' | 'middle' | 'end'}>> = ({children, x, y, size, fill = '#fff8e9', weight = 600, anchor = 'end'}) => (
  <text x={x} y={y} textAnchor={anchor} direction="rtl" unicodeBidi="plaintext" fontFamily={ARABIC_FONT} fontSize={size} fontWeight={weight} fill={fill}>{children}</text>
);

const SpeechBubble: React.FC<{text: string; speaker?: string; position?: 'left' | 'right'}> = ({text, speaker, position = 'right'}) => {
  const x = position === 'left' ? 100 : 1120;
  return <g transform={`translate(${x} 160)`}>
    <path d="M0 0 Q0 -20 24 -20 H650 Q674 -20 674 4 V172 Q674 196 650 196 H88 L42 232 L51 196 H24 Q0 196 0 172 Z" fill="#fffaf0" stroke="#1c1713" strokeWidth="8" strokeLinejoin="round" />
    {speaker && <Arabic x={625} y={32} size={29} fill="#9c5e25" weight={700}>{speaker}</Arabic>}
    <foreignObject x="30" y={speaker ? 46 : 20} width="610" height="135"><div xmlns="http://www.w3.org/1999/xhtml" dir="rtl" style={{fontFamily: ARABIC_FONT, fontSize: 36, lineHeight: 1.45, color: '#211912', textAlign: 'right'}}>{text}</div></foreignObject>
  </g>;
};

const HealthBar: React.FC<{x: number; y: number; label: string; value: number; color: string; reverse?: boolean}> = ({x, y, label, value, color, reverse}) => {
  const amount = Math.max(0, Math.min(100, value));
  return <g transform={`translate(${x} ${y})`}>
    <Arabic x={reverse ? 0 : 450} y={0} size={27}>{label}</Arabic>
    <rect x="0" y="16" width="450" height="34" rx="8" fill="#211b18" stroke="#fff0cf" strokeWidth="5" />
    <rect x={reverse ? 450 - amount * 4.3 : 7} y="23" width={Math.max(0, amount * 4.36)} height="20" rx="4" fill={color} />
  </g>;
};

const DateCard: React.FC<{date: string; location: string; opacity: number}> = ({date, location, opacity}) => (
  <g opacity={opacity}>
    <rect x="570" y="330" width="780" height="340" rx="24" fill="#241b14" fillOpacity=".94" stroke="#e7bd70" strokeWidth="7" />
    <Arabic x={960} y={465} size={76} fill="#f2d394" anchor="middle" weight={700}>{date}</Arabic>
    <Arabic x={960} y={565} size={54} anchor="middle">{location}</Arabic>
  </g>
);

export const HistoricalScene: React.FC<{scene: SceneData; sceneIndex: number; projectTitle?: string}> = ({scene, sceneIndex, projectTitle}) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const progress = interpolate(frame, [0, Math.max(1, durationInFrames - 1)], [0, 1], {extrapolateRight: 'clamp', easing: Easing.inOut(Easing.quad)});
  const zoom = 1 + progress * 0.075;
  const panX = (scene.pan?.x ?? (sceneIndex % 2 ? -14 : 14)) * progress;
  const panY = (scene.pan?.y ?? 2) * progress;
  const transitionFrames = Math.round((scene.dateCard?.displayDurationInSeconds ?? 2.5) * fps);
  const dateOpacity = scene.dateCard ? interpolate(frame, [0, 10, Math.max(11, transitionFrames - 10), transitionFrames], [0, 1, 1, 0], {extrapolateRight: 'clamp'}) : 0;
  const locationOpacity = scene.dateCard ? interpolate(frame, [Math.max(0, transitionFrames - 8), transitionFrames + 14], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) : 0;
  const kind = scene.kind ?? (sceneIndex === 0 ? 'march' : 'celebration');
  const defaults = kind === 'march'
    ? [{x: 340, y: 860, scale: 1.15, outfit: 'traveler' as Outfit, hat: 'fedora' as const, action: 'walk' as CharacterAction, prop: 'bag' as PropKind}, {x: 850, y: 850, scale: 0.87, outfit: 'brown-coat' as Outfit, hat: 'fedora' as const, action: 'walk' as CharacterAction, prop: 'rifle' as PropKind}, {x: 1300, y: 860, scale: 0.78, outfit: 'soldier' as Outfit, hat: 'army' as const, action: 'walk' as CharacterAction, prop: 'flag' as PropKind}]
    : [{x: 610, y: 875, scale: 1.35, outfit: 'gold' as Outfit, hat: 'fedora' as const, action: 'celebrate' as CharacterAction, prop: 'none' as PropKind}, {x: 1470, y: 875, scale: 1.28, outfit: 'formal' as Outfit, hat: 'fedora' as const, action: 'point' as CharacterAction, prop: 'none' as PropKind}];
  const characters = scene.characters?.length ? scene.characters : defaults;
  const bgTitle = scene.title || projectTitle || 'حكايات من التاريخ';
  const audioPath = scene.narration?.replace(/^\/+/, '');
  const dateCard = scene.dateCard;

  return <>
    <svg viewBox="0 0 1920 1080" width="100%" height="100%" role="img" aria-label={bgTitle}>
      <defs>
        <linearGradient id={`sky-${sceneIndex}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f5d9ad"/><stop offset=".58" stopColor="#e9b875"/><stop offset="1" stopColor="#bd8550"/></linearGradient>
        <linearGradient id={`ground-${sceneIndex}`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#c99861"/><stop offset="1" stopColor="#795238"/></linearGradient>
      </defs>
      <g transform={`translate(${panX} ${panY}) translate(960 540) scale(${zoom}) translate(-960 -540)`}>
        <DesertBackdrop variant={kind} progress={progress} />
        {characters.map((character, i) => <Stickman key={i} x={character.x} y={character.y} scale={character.scale ?? 1} rotate={character.rotate ?? 0} outfit={character.outfit ?? 'formal'} hat={character.hat ?? 'fedora'} action={character.action ?? 'idle'} prop={character.prop ?? 'none'} flipX={character.flipX} frame={frame} />)}
      </g>
      <rect x="0" y="0" width="1920" height="112" fill="#1c1b20" fillOpacity=".94" />
      <rect x="0" y="108" width="1920" height="5" fill="#d5ad68" />
      <Arabic x={1835} y={75} size={43} fill="#fff1d2" weight={700}>{bgTitle}</Arabic>
      {scene.speechBubble && <SpeechBubble text={scene.speechBubble.text} speaker={scene.speechBubble.speaker} position={scene.speechBubble.position} />}
      {scene.healthBars && <g><HealthBar x={92} y={950} label={scene.healthBars.left.label} value={scene.healthBars.left.value} color={scene.healthBars.left.color ?? '#d84b43'} /><HealthBar x={1378} y={950} label={scene.healthBars.right.label} value={scene.healthBars.right.value} color={scene.healthBars.right.color ?? '#448fd1'} reverse /></g>}
      {dateCard && <g><g opacity={locationOpacity}><DesertBackdrop variant="location" progress={progress} /><rect x="0" y="112" width="1920" height="968" fill="#241710" fillOpacity=".25"/><Arabic x={1710} y={910} size={64} fill="#fff1d2" weight={700}>{dateCard.location}</Arabic></g><DateCard date={dateCard.date} location={dateCard.location} opacity={dateOpacity} /></g>}
    </svg>
    {audioPath ? <Audio src={staticFile(audioPath.startsWith('audio/') ? audioPath : `audio/${audioPath}`)} /> : null}
  </>;
};
