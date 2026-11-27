export type HealthBarSide = {
  label: string;
  value: number;
  color?: string;
};

export type Scene = {
  title?: string;
  image: string;
  narration: string;
  durationInSeconds?: number;
  speechBubble?: {
    text: string;
    speaker?: string;
    position?: 'left' | 'right';
  };
  healthBars?: {
    left: HealthBarSide;
    right: HealthBarSide;
  };
  dateCard?: {
    date: string;
    location: string;
    locationImage: string;
    displayDurationInSeconds?: number;
  };
  pan?: {x?: number; y?: number};
};

export type ScenesFile = {
  title?: string;
  fps?: number;
  width?: number;
  height?: number;
  defaultSceneDurationInSeconds?: number;
  scenes: Scene[];
};

export const sceneDuration = (scene: Scene, defaultDuration: number) =>
  scene.durationInSeconds ?? defaultDuration;

export const assetSrc = (path: string) => path.replace(/^\/+/, '');
