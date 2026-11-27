import React from 'react';
import {Audio, Img, Sequence, staticFile, useCurrentFrame, useVideoConfig, interpolate, Easing} from 'remotion';
import type {Scene as SceneData} from './types';
import {assetSrc} from './types';

const NaskhText: React.FC<React.PropsWithChildren<{style?: React.CSSProperties}>> = ({children, style}) => (
  <div dir="rtl" style={{fontFamily: 'Noto Naskh Arabic, NaskhLocal, serif', ...style}}>{children}</div>
);

const AnimatedImage: React.FC<{src: string; panX?: number; panY?: number; salt?: number}> = ({src, panX = 0, panY = 0, salt = 0}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const progress = interpolate(frame, [0, Math.max(1, durationInFrames - 1)], [0, 1], {extrapolateRight: 'clamp', easing: Easing.inOut(Easing.quad)});
  const scale = 1.04 + progress * 0.1;
  const direction = salt % 2 === 0 ? 1 : -1;
  return <Img src={staticFile(assetSrc(src))} style={{position: 'absolute', inset: '-6%', width: '112%', height: '112%', objectFit: 'cover', transform: `scale(${scale}) translate(${direction * (panX + progress * 1.8)}%, ${panY + progress * 1.4}%)`, filter: 'brightness(.78)'}} />;
};

const HealthBar: React.FC<{label: string; value: number; color: string; align: 'left' | 'right'}> = ({label, value, color, align}) => {
  const safeValue = Math.min(100, Math.max(0, value));
  return (
    <div style={{width: 390, direction: 'rtl', textAlign: align === 'left' ? 'right' : 'left'}}>
      <NaskhText style={{fontSize: 26, color: 'white', fontWeight: 700, textShadow: '0 2px 6px #000'}}>{label}</NaskhText>
      <div style={{height: 25, border: '3px solid #f4e7c2', background: '#20202a', borderRadius: 5, padding: 3, boxShadow: '0 3px 12px #0008'}}>
        <div style={{height: '100%', width: `${safeValue}%`, background: `linear-gradient(180deg, ${color}, ${color}99)`, transition: 'width .2s', borderRadius: 2}} />
      </div>
    </div>
  );
};

const Scene: React.FC<{scene: SceneData; sceneIndex: number; projectTitle?: string}> = ({scene, sceneIndex, projectTitle}) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const fadeFrames = Math.min(18, Math.floor(durationInFrames / 3));
  const sceneFade = interpolate(frame, [0, Math.max(1, fadeFrames), Math.max(fadeFrames + 1, durationInFrames - fadeFrames), durationInFrames], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const locationStart = scene.dateCard ? Math.min(durationInFrames, Math.round((scene.dateCard.displayDurationInSeconds ?? 2.5) * fps)) : durationInFrames;
  const locationOpacity = scene.dateCard ? interpolate(frame, [Math.max(0, locationStart - 12), locationStart + 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) : 0;
  const cardOpacity = scene.dateCard ? interpolate(frame, [0, 10, Math.max(11, locationStart - 10), locationStart], [0, 1, 1, 0], {extrapolateRight: 'clamp'}) : 0;
  const bubblePosition = scene.speechBubble?.position === 'left' ? {left: 80} : {right: 80};

  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden', backgroundColor: '#111', opacity: sceneFade}}>
      <AnimatedImage src={scene.image} panX={scene.pan?.x} panY={scene.pan?.y} salt={sceneIndex} />
      {scene.dateCard && (
        <div style={{position: 'absolute', inset: 0, opacity: locationOpacity}}>
          <AnimatedImage src={scene.dateCard.locationImage} panX={scene.pan?.x} panY={scene.pan?.y} salt={sceneIndex + 1} />
          <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(0deg, #0009, transparent 70%)'}} />
          <NaskhText style={{position: 'absolute', bottom: 115, right: 100, color: 'white', fontSize: 54, fontWeight: 700, textShadow: '0 3px 12px #000'}}>{scene.dateCard.location}</NaskhText>
        </div>
      )}
      {scene.dateCard && (
        <div style={{position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: cardOpacity}}>
          <div style={{minWidth: 620, padding: '42px 72px', border: '2px solid #e8c879', background: 'linear-gradient(135deg, #111e, #332719eF)', borderRadius: 16, textAlign: 'center', boxShadow: '0 16px 55px #0009'}}>
            <NaskhText style={{fontSize: 58, color: '#f5d992', fontWeight: 700}}>{scene.dateCard.date}</NaskhText>
            <NaskhText style={{fontSize: 38, color: 'white', marginTop: 8}}>{scene.dateCard.location}</NaskhText>
          </div>
        </div>
      )}
      <div style={{position: 'absolute', inset: '0 0 auto', height: 100, display: 'flex', alignItems: 'center', padding: '0 70px', background: 'linear-gradient(90deg, #151722f2, #212333ec)', borderBottom: '3px solid #c9a85d', boxSizing: 'border-box'}}>
        <NaskhText style={{fontSize: 39, color: '#fff3d4', fontWeight: 700, letterSpacing: '.2px'}}>{scene.title || projectTitle || 'حكايات من التاريخ'}</NaskhText>
      </div>
      {scene.speechBubble && (
        <div style={{position: 'absolute', top: 150, ...bubblePosition, maxWidth: 620, padding: '24px 34px', borderRadius: 28, border: '3px solid #fff', background: '#fffffff0', boxShadow: '0 8px 26px #0007'}}>
          {scene.speechBubble.speaker && <NaskhText style={{fontSize: 22, color: '#8b6422', fontWeight: 700, marginBottom: 4}}>{scene.speechBubble.speaker}</NaskhText>}
          <NaskhText style={{fontSize: 31, lineHeight: 1.5, color: '#171717'}}>{scene.speechBubble.text}</NaskhText>
        </div>
      )}
      {scene.healthBars && (
        <div style={{position: 'absolute', left: 75, right: 75, bottom: 62, display: 'flex', justifyContent: 'space-between', alignItems: 'end'}}>
          <HealthBar {...scene.healthBars.left} color={scene.healthBars.left.color || '#dc4242'} align="left" />
          <HealthBar {...scene.healthBars.right} color={scene.healthBars.right.color || '#3f95e8'} align="right" />
        </div>
      )}
      <Sequence durationInFrames={durationInFrames}>
        <Audio src={staticFile(assetSrc(scene.narration))} />
      </Sequence>
    </div>
  );
};

export default Scene;
