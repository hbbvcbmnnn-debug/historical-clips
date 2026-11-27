import React from 'react';
import {AbsoluteFill, Series, useVideoConfig} from 'remotion';
import scenesJson from '../scenes.json';
import {HistoricalScene} from './Scene';
import type {ScenesFile} from './types';

const data = scenesJson as ScenesFile;

export const Root: React.FC = () => {
  const {fps} = useVideoConfig();
  const fallbackDuration = data.defaultSceneDurationInSeconds ?? 8;
  return (
    <AbsoluteFill style={{backgroundColor: '#171311'}}>
      <Series>
        {data.scenes.map((scene, index) => (
          <Series.Sequence key={`${index}-${scene.title}`} durationInFrames={Math.max(1, Math.ceil((scene.durationInSeconds ?? fallbackDuration) * fps))} name={scene.title ?? `Scene ${index + 1}`}>
            <HistoricalScene scene={scene} sceneIndex={index} projectTitle={data.title} />
          </Series.Sequence>
        ))}
      </Series>
    </AbsoluteFill>
  );
};
