import type {CharacterAction, Outfit, PropKind} from './characters/Stickman';

export type HealthBarSide = {label: string; value: number; color?: string};
export type CharacterSpec = {
  x: number;
  y: number;
  scale?: number;
  rotate?: number;
  flipX?: boolean;
  outfit?: Outfit;
  hat?: 'fedora' | 'turban' | 'army' | 'none';
  action?: CharacterAction;
  prop?: PropKind;
};
export type Scene = {
  title?: string;
  kind?: 'march' | 'battle' | 'celebration' | 'location';
  narration?: string;
  durationInSeconds?: number;
  pan?: {x?: number; y?: number};
  characters?: CharacterSpec[];
  speechBubble?: {text: string; speaker?: string; position?: 'left' | 'right'};
  healthBars?: {left: HealthBarSide; right: HealthBarSide};
  dateCard?: {date: string; location: string; displayDurationInSeconds?: number};
};
export type ScenesFile = {title?: string; fps?: number; width?: number; height?: number; defaultSceneDurationInSeconds?: number; scenes: Scene[]};
