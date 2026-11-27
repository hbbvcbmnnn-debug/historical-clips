import React from 'react';
import {Composition, registerRoot} from 'remotion';
import scenes from '../scenes.json';
import {Video, getTotalDurationInFrames} from './Video';
import type {ScenesFile} from './types';

const data = scenes as ScenesFile;
const fps = data.fps ?? 30;
const width = data.width ?? 1920;
const height = data.height ?? 1080;

const RemotionRoot: React.FC = () => (
  <Composition
    id="HistoricalClips"
    component={Video}
    durationInFrames={Math.max(1, getTotalDurationInFrames(data))}
    fps={fps}
    width={width}
    height={height}
    defaultProps={{data}}
  />
);

registerRoot(RemotionRoot);
