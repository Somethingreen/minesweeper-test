import React from 'react';

import { useAppSelector } from '../../app/hooks';
import { selectField, selectGameState } from './gameSlice';
import StartMenu from '../startMenu/StartMenu';
import { GameFieldGrid } from './GameFieldGrid';
import { EndDialog } from '../endDialog/endDialog';
import { GameSessionState } from './gameTypes';

export function Game() {
  const field = useAppSelector(selectField);
  const sessionState = useAppSelector(selectGameState);

  return (
    <React.Fragment>
      {
        field === null
        ? <StartMenu />
        : <GameFieldGrid field={field} />
      }
      <EndDialog open={sessionState !== GameSessionState.PENDING} />
    </React.Fragment>
    );
};
