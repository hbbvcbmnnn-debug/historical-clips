import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import type {ScenesFile} from './types';
import {sceneDuration} from './types';
import Scene from './Scene';

export const getTotalDurationInFrames = (data: ScenesFile) => {
  const fps = data.fps ?? 30;
  return data.scenes.reduce((sum, scene) => sum + Math.ceil(sceneDuration(scene, data.defaultSceneDurationInSeconds ?? 8) * fps), 0);
};

export const Video: React.FC<{data: ScenesFile}> = ({data}) => {
  const fps = data.fps ?? 30;
  let from = 0;
  return (
    <AbsoluteFill style={{backgroundColor: '#111'}}>
      {data.scenes.map((scene, index) => {
        const durationInFrames = Math.ceil(sceneDuration(scene, data.defaultSceneDurationInSeconds ?? 8) * fps);
        const start = from;
        from += durationInFrames;
        return <Sequence key={`${index}-${scene.image}`} from={start} durationInFrames={durationInFrames} name={scene.title || `Scene ${index + 1}`}><Scene scene={scene} sceneIndex={index} projectTitle={data.title} /></Sequence>;
      })}
    </AbsoluteFill>
  );
};
