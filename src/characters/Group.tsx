import React from 'react';
import {Stickman, CharacterProps} from './Stickman';

export const Group: React.FC<{characters: CharacterProps[]}> = ({characters}) => (
  <g>{[...characters].sort((a,b) => a.y-b.y).map((character, index) => <Stickman key={index} {...character}/>)}</g>
);
