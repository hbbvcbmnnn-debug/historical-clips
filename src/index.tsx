import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {Root} from './Root';
import scenes from '../scenes.json';
import type {ScenesFile} from './types';

const data = scenes as ScenesFile;
const fps = data.fps ?? 30;
const durationInFrames = data.scenes.reduce((total, scene) => total + Math.ceil((scene.durationInSeconds ?? data.defaultSceneDurationInSeconds ?? 8) * fps), 0);

const RemotionRoot: React.FC = () => (
  <Composition id="HistoricalClips" component={Root} durationInFrames={Math.max(1, durationInFrames)} fps={fps} width={data.width ?? 1920} height={data.height ?? 1080} />
);

registerRoot(RemotionRoot);
